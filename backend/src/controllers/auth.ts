import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';

import { User } from '../entity/user';
import { JWT_SECRET } from '../constants';
import { ParameterException, BizException } from '../exceptions';

export default class AuthController {
  public static async login(ctx: any) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ phone: ctx.request.body.phone })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      throw new BizException('用户名不存在, 注意: 用户名不是手机号');
    // } else if (await argon2.verify(user.password, ctx.request.body.password)) {
    } else if (user.password === ctx.request.body.password) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ name: user.name, id: user.id, phone: user.phone }, JWT_SECRET), user };
    } else {
      throw new BizException('密码错误');
    }
  }


  public static async register(ctx: any) {
    const userRepository = getManager().getRepository(User);

    // 判断用户是否存在
    const u = await userRepository.findOne({ phone: ctx.request.body.phone });
    if (u) {
      throw new ParameterException('用户已存在');
    }

    const newUser = new User();

    // 获取请求体
    newUser.name = ctx.request.body.name;
    newUser.phone = ctx.request.body.phone;
    // newUser.password = await argon2.hash(ctx.request.body.password);
    newUser.password = ctx.request.body.password;
    newUser.education = ctx.request.body.education;
    newUser.year = ctx.request.body.year;
    newUser.studentId = ctx.request.body.studentId;
    if (ctx.request.body.avatar) {
      newUser.avatar = ctx.request.body.avatar;
    }

    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 200;
    ctx.body = user;
  }
}
