# 多阶段构建 - 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段 - Nginx
FROM nginx:alpine

# 删除默认的 nginx 配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义的 nginx 配置
COPY deploy/nginx.conf /etc/nginx/conf.d/

# 从构建阶段复制构建后的文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 