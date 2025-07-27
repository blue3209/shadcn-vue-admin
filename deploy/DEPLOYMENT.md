# Shadcn Vue Admin - Nginx 部署指南

本指南详细介绍如何将 Shadcn Vue Admin 项目部署到生产环境的 Nginx 服务器。

## 📋 前置要求

- Linux 服务器 (Ubuntu 18.04+ / CentOS 7+ / Debian 9+)
- Node.js 16+ 和 npm
- Nginx 1.18+
- 域名（可选，也可使用 IP 地址）
- SSL 证书（推荐用于生产环境）

## 🚀 快速部署（推荐）

### 使用自动化脚本

1. **克隆项目到服务器**
```bash
git clone https://github.com/your-username/shadcn-vue-admin.git
cd shadcn-vue-admin
```

2. **运行部署脚本**
```bash
chmod +x deploy/deploy.sh
sudo ./deploy/deploy.sh
```

3. **修改域名配置**
```bash
sudo nano /etc/nginx/sites-available/shadcn-vue-admin
# 将 your-domain.com 替换为你的实际域名
```

4. **重载 Nginx**
```bash
sudo systemctl reload nginx
```

## 🔧 手动部署步骤

### 1. 项目构建

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

构建完成后，`dist` 目录包含所有静态文件。

### 2. 服务器准备

#### 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
# 或
sudo dnf install nginx
```

#### 创建项目目录
```bash
sudo mkdir -p /var/www/shadcn-vue-admin
```

### 3. 上传文件

```bash
# 上传构建后的文件到服务器
scp -r dist/* user@your-server:/var/www/shadcn-vue-admin/

# 或在服务器上直接复制
sudo cp -r dist/* /var/www/shadcn-vue-admin/
sudo chown -R www-data:www-data /var/www/shadcn-vue-admin
sudo chmod -R 755 /var/www/shadcn-vue-admin
```

### 4. 配置 Nginx

#### 创建站点配置文件
```bash
sudo nano /etc/nginx/sites-available/shadcn-vue-admin
```

复制 `deploy/nginx.conf` 内容到配置文件中，并修改以下配置：

```nginx
server_name your-domain.com;  # 改为你的域名
root /var/www/shadcn-vue-admin;  # 确认路径正确
```

#### 启用站点
```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/shadcn-vue-admin /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default
```

#### 测试配置
```bash
sudo nginx -t
```

#### 重启 Nginx
```bash
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🔒 HTTPS 配置（推荐）

### 使用 Let's Encrypt（免费 SSL）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加以下行：
0 12 * * * /usr/bin/certbot renew --quiet
```

### 使用已有证书

修改 nginx 配置文件：
```nginx
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

## 🌐 域名配置

### DNS 设置
在你的域名提供商处添加 A 记录：
```
类型: A
主机: @ (或 www)
值: 你的服务器IP地址
TTL: 300
```

### 子域名设置
如果使用子域名（如 admin.example.com）：
```
类型: A
主机: admin
值: 你的服务器IP地址
TTL: 300
```

## 🔧 后端 API 代理配置

如果你有后端 API，修改 nginx 配置：

```nginx
# API 代理配置
location /api/ {
    proxy_pass http://localhost:3000;  # 你的后端服务地址
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

## 🐛 故障排除

### 1. 404 错误（路由问题）

**问题**: 直接访问 `/dashboard` 等路由返回 404
**解决方案**: 确保 nginx 配置包含 SPA 路由支持：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 2. 静态资源加载失败

**问题**: CSS/JS 文件 404
**解决方案**: 检查文件权限和路径：
```bash
sudo chown -R www-data:www-data /var/www/shadcn-vue-admin
sudo chmod -R 755 /var/www/shadcn-vue-admin
```

### 3. API 请求失败

**问题**: API 请求被阻止或跨域错误
**解决方案**: 配置正确的代理或 CORS 头：
```nginx
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
```

### 4. 性能问题

**解决方案**: 启用 gzip 压缩和缓存：
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;

location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 📊 监控和日志

### Nginx 日志位置
- 访问日志: `/var/log/nginx/access.log`
- 错误日志: `/var/log/nginx/error.log`

### 查看实时日志
```bash
# 错误日志
sudo tail -f /var/log/nginx/error.log

# 访问日志
sudo tail -f /var/log/nginx/access.log
```

### 服务状态检查
```bash
# 检查 Nginx 状态
sudo systemctl status nginx

# 检查端口占用
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## 🔄 更新部署

### 自动更新脚本
```bash
#!/bin/bash
cd /path/to/your/project
git pull
npm install
npm run build
sudo cp -r dist/* /var/www/shadcn-vue-admin/
sudo systemctl reload nginx
```

### 零停机更新
```bash
# 构建到临时目录
npm run build
sudo mv /var/www/shadcn-vue-admin /var/www/shadcn-vue-admin.old
sudo mv dist /var/www/shadcn-vue-admin
sudo systemctl reload nginx
# 确认无误后删除备份
sudo rm -rf /var/www/shadcn-vue-admin.old
```

## 📝 常用命令

```bash
# 测试 Nginx 配置
sudo nginx -t

# 重载 Nginx 配置
sudo systemctl reload nginx

# 重启 Nginx
sudo systemctl restart nginx

# 查看 Nginx 状态
sudo systemctl status nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 检查端口占用
sudo ss -tlnp | grep :80
```

## 🔐 安全建议

1. **定期更新系统和软件包**
2. **使用 HTTPS**
3. **配置防火墙**
4. **设置适当的文件权限**
5. **定期备份网站文件**
6. **使用强密码和密钥认证**

## 📞 支持

如果遇到问题，请检查：
1. Nginx 错误日志
2. 文件权限设置
3. 防火墙配置
4. DNS 解析状态

---

**祝你部署顺利！** 🎉 