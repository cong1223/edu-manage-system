# 使用 Node.js 官方镜像作为基础镜像
FROM node:18.18.0

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN yarn install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["yarn", "start"]
