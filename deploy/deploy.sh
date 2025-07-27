#!/bin/bash

# Shadcn Vue Admin 部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh

set -e  # 遇到错误立即退出

# 配置变量
PROJECT_NAME="shadcn-vue-admin"
PROJECT_DIR="/var/www/${PROJECT_NAME}"
NGINX_CONF="/etc/nginx/sites-available/${PROJECT_NAME}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${PROJECT_NAME}"
BACKUP_DIR="/var/backups/${PROJECT_NAME}"

echo "🚀 开始部署 ${PROJECT_NAME}..."

# 1. 检查是否以 root 权限运行
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本需要 root 权限运行" 
   echo "请使用: sudo ./deploy.sh"
   exit 1
fi

# 2. 安装必要的软件包
echo "📦 检查并安装必要软件..."
apt update
apt install -y nginx curl git

# 3. 安装 Node.js 和 npm (如果未安装)
if ! command -v node &> /dev/null; then
    echo "📦 安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# 4. 创建项目目录
echo "📁 创建项目目录..."
mkdir -p ${PROJECT_DIR}
mkdir -p ${BACKUP_DIR}

# 5. 备份现有部署（如果存在）
if [ -d "${PROJECT_DIR}/dist" ]; then
    echo "🔄 备份现有部署..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    tar -czf "${BACKUP_DIR}/backup_${TIMESTAMP}.tar.gz" -C ${PROJECT_DIR} dist
    echo "✅ 备份完成: ${BACKUP_DIR}/backup_${TIMESTAMP}.tar.gz"
fi

# 6. 构建项目
echo "🔨 构建项目..."
cd "$(dirname "$0")/.."  # 回到项目根目录

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 构建生产版本
echo "🏗️ 构建生产版本..."
npm run build

# 7. 部署文件
echo "📋 部署文件到服务器..."
if [ -d "${PROJECT_DIR}/dist" ]; then
    rm -rf ${PROJECT_DIR}/dist.old
    mv ${PROJECT_DIR}/dist ${PROJECT_DIR}/dist.old
fi

cp -r dist ${PROJECT_DIR}/
chown -R www-data:www-data ${PROJECT_DIR}
chmod -R 755 ${PROJECT_DIR}

# 8. 配置 Nginx
echo "⚙️ 配置 Nginx..."
cp deploy/nginx.conf ${NGINX_CONF}

# 创建软链接
if [ ! -L ${NGINX_ENABLED} ]; then
    ln -s ${NGINX_CONF} ${NGINX_ENABLED}
fi

# 9. 测试 Nginx 配置
echo "🧪 测试 Nginx 配置..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx 配置测试通过"
    
    # 重载 Nginx
    echo "🔄 重载 Nginx..."
    systemctl reload nginx
    systemctl enable nginx
    
    echo "✅ 部署完成！"
    echo ""
    echo "🌐 网站已部署到: ${PROJECT_DIR}/dist"
    echo "⚙️ Nginx 配置文件: ${NGINX_CONF}"
    echo ""
    echo "📝 下一步："
    echo "1. 修改 ${NGINX_CONF} 中的域名配置"
    echo "2. 如有 SSL 证书，配置 HTTPS"
    echo "3. 如有后端 API，配置代理地址"
    echo ""
    echo "🔧 常用命令："
    echo "- 查看 Nginx 状态: systemctl status nginx"
    echo "- 重载 Nginx 配置: systemctl reload nginx"
    echo "- 查看 Nginx 日志: tail -f /var/log/nginx/error.log"
else
    echo "❌ Nginx 配置测试失败"
    echo "请检查配置文件: ${NGINX_CONF}"
    exit 1
fi 