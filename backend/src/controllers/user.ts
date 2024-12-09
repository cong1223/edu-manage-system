import { getManager } from 'typeorm';

import { User } from '../entity/user';
import { NotFoundException, ForbiddenException, UnauthorizedException } from '../exceptions'

export default class UserController {
  // 获取所有的用户列表，但是要把列表里的密码过滤掉
  public static async getUserList(ctx: any) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'name', 'phone', 'studentId', 'year', 'education', 'avatar'],
    });
    users.sort((a, b) => a.year - b.year);
    ctx.status = 200;
    ctx.body = users;
  }


  public static async showUserDetail(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(userId);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserPassword(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.password = ctx.request.body.password;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserAvatar(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.avatar = ctx.request.body.avatar;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserName(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.name = ctx.request.body.name;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserEducation(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.education = ctx.request.body.education;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserYear(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.year = ctx.request.body.year;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUserStudentId(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new UnauthorizedException('没有权限');
    }

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(userId);
    if (user) {
      user.studentId = ctx.request.body.studentId;
      await userRepository.save(user);
      ctx.status = 200;
    } else {
      throw new NotFoundException();
    }
  }
}
