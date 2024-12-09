import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { protectedRouter, unprotectedRouter } from './routes';
import { logger } from './logger';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { JWT_SECRET } from './constants';
import koaBody from 'koa-body';
import { checkDirExist } from './utils/file';

export const tempFilePath = `${process.cwd()}/src/temp`;

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors({
      origin: '*',
      credentials: true,
      allowMethods: [ 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH' ]
    }));
    app.use(koaBody({
      multipart: true,
      formidable: {
        uploadDir: tempFilePath, // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认20M
        onFileBegin: (name,file: any) => { // 文件上传前的设置
          // 检查文件夹是否存在如果不存在则新建文件夹
          checkDirExist(tempFilePath);
          // 获取文件名称
          const fileName = file.name;
          // 重新覆盖 file.path 属性
          file.path = `${tempFilePath}/${fileName}`;
        }
      }
    }));
    app.use(bodyParser());

    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }));

    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });

    // 运行服务器
    app.listen(8888);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
