import { getManager } from 'typeorm';

import { NotFoundException, UnauthorizedException, ForbiddenException } from '../exceptions';
import { Notice } from '../entity/notice';
import { Task } from '../entity/task';
import { Member } from '../entity/member';
import { Research } from '../entity/research';
import { Report } from '../entity/report';
import { User } from '../entity/user';
import { Outcome } from '../entity/outcome';
import { isAdmin } from '../utils/auth';

export default class BizController {

  // 新增通知公告
  public static async addNotice(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const noticeRepository = getManager().getRepository(Notice);
    const notice = new Notice();
    notice.title = ctx.request.body.title;
    notice.desc = ctx.request.body.desc;
    await noticeRepository.save(notice);
    ctx.status = 200;
  }
  // 删除通知公告
  public static async removeNotice(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const noticeRepository = getManager().getRepository(Notice);
    await noticeRepository.delete(ctx.params.id);
    ctx.status = 200;
  }
  // 获取通知公告列表
  public static async getNoticeList(ctx: any) {
    const noticeRepository = getManager().getRepository(Notice);
    // 按照时间由新到旧只获取15条数据
    const notices = await noticeRepository.find({ order: { createdAt: 'DESC' }, take: 15 });
    ctx.status = 200;
    ctx.body = notices
  }
  // 根据id获取notice详情
  public static async getNoticeById(ctx: any) {
    const noticeRepository = getManager().getRepository(Notice);
    const notice = await noticeRepository.findOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = notice
  }


  // 新增近期任务
  public static async addTask(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const taskRepository = getManager().getRepository(Task);
    const task = new Task();
    task.title = ctx.request.body.title;
    task.desc = ctx.request.body.desc;
    task.status = ctx.request.body.status;
    await taskRepository.save(task);
    ctx.status = 200;
  }
  // 删除近期任务
  public static async removeTask(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const taskRepository = getManager().getRepository(Task);
    await taskRepository.delete(ctx.params.id);
    ctx.status = 200;
  }
  // 获取近期任务列表
  public static async getTaskList(ctx: any) {
    const taskRepository = getManager().getRepository(Task);
    // 按照时间由新到旧只获取15条数据
    const tasks = await taskRepository.find({ order: { createdAt: 'DESC' }, take: 15 });
    ctx.status = 200;
    ctx.body = tasks
  }
  // 根据id获取task详情
  public static async getTaskById(ctx: any) {
    const taskRepository = getManager().getRepository(Task);
    const task = await taskRepository.findOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = task
  }

  // 新增成员
  public static async addMember(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const memberRepository = getManager().getRepository(Member);
    const member = new Member();
    member.title = ctx.request.body.title;
    member.name = ctx.request.body.name;
    await memberRepository.save(member);
    ctx.status = 200;
  }
  // 获取成员列表
  public static async getMemberList(ctx: any) {
    const memberRepository = getManager().getRepository(Member);
    const members = await memberRepository.find();
    ctx.status = 200;
    ctx.body = members
  }

  // 新增研究方向与仪器设备
  public static async addResearch(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const researchRepository = getManager().getRepository(Research);
    const research = new Research();
    research.name = ctx.request.body.name;
    research.component = ctx.request.body.component;
    research.purpose = ctx.request.body.purpose;
    research.location = ctx.request.body.location;
    research.keeper = ctx.request.body.keeper;
    research.img = ctx.request.body.img || '';
    await researchRepository.save(research);
    ctx.status = 200;
  }
  // 删除研究方向与仪器设备
  public static async removeResearch(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const researchRepository = getManager().getRepository(Research);
    await researchRepository.delete(ctx.params.id);
    ctx.status = 200;
  }
  // 获取研究方向与仪器设备列表
  public static async getResearchList(ctx: any) {
    const researchRepository = getManager().getRepository(Research);
    // 按照时间由新到旧只获取15条数据
    const researches = await researchRepository.find({ order: { createdAt: 'DESC' }, take: 15 });
    ctx.status = 200;
    ctx.body = researches
  }
  // 根据id获取research详情
  public static async getResearchById(ctx: any) {
    const researchRepository = getManager().getRepository(Research);
    const research = await researchRepository.findOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = research
  }

  // 获取report详情
  public static async getReportById(ctx: any) {
    const reportRepository = getManager().getRepository(Report);
    const report = await reportRepository.findOne(ctx.params.id, {
      join: {
        alias: 'report',
        leftJoinAndSelect: {
          user: 'report.user'
        }
      }
    });
    ctx.status = 200;
    ctx.body = report
  }

  // 新增每周工作情况
  public static async addReport(ctx: any) {
    const userId = +ctx.state.user.id
    if (!userId) {
      throw new ForbiddenException('没有权限');
    }
    const reportRepository = getManager().getRepository(Report);
    // 获取当前用户
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    // report 要跟当前用户绑定
    const report = new Report();
    report.user = user;
    report.title = ctx.request.body.title;
    report.thisContent = ctx.request.body.thisContent;
    report.nextContent = ctx.request.body.nextContent;
    report.tag = ctx.request.body.tag;
    await reportRepository.save(report);
    ctx.status = 200;
  }
  // 获取每周工作情况列表
  public static async getReportList(ctx: any) {
    const reportRepository = getManager().getRepository(Report);
    const reports = await reportRepository.find({
      join: {
        alias: 'report',
        leftJoinAndSelect: {
          user: 'report.user'
        }
      }
    });
    // 按照时间由新到旧
    reports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    ctx.status = 200;
    ctx.body = reports
  }
  // 编辑每周工作
  public static async editReport(ctx: any) {
    const userId = +ctx.state.user.id
    // 只有admin和本人能修改
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(userId);
    const reportRepository = getManager().getRepository(Report);
    const report = await reportRepository.findOne(ctx.params.id);
    if (!report) {
      throw new NotFoundException();
    }
    if (user?.id !== ctx.request.body.user.id) {
      throw new ForbiddenException('没有权限');
    }
    report.title = ctx.request.body.title;
    report.thisContent = ctx.request.body.thisContent;
    report.nextContent = ctx.request.body.nextContent;
    report.tag = ctx.request.body.tag;
    await reportRepository.save(report);
    ctx.status = 200;
  }
  // 删除每周工作
  public static async removeReport(ctx: any) {
    const userId = +ctx.state.user.id
    // 只有admin和本人能删除
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(userId);
    const reportRepository = getManager().getRepository(Report);
    const report = await reportRepository.findOne(ctx.params.id, {
      join: {
        alias: 'report',
        leftJoinAndSelect: {
          user: 'report.user'
        }
      }
    });
    if (!report) {
      throw new NotFoundException();
    }
    if (user?.id !== report.user.id) {
      throw new ForbiddenException('没有权限');
    }
    await reportRepository.remove(report);
    ctx.status = 200;
  }

  // 新增共同工作
  public static async addOutcome(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const outcomeRepository = getManager().getRepository(Outcome);
    const outcome = new Outcome();
    outcome.title = ctx.request.body.title;
    outcome.desc = ctx.request.body.desc;
    await outcomeRepository.save(outcome);
    ctx.status = 200;
  }
  // 获取共同工作列表
  public static async getOutcomeList(ctx: any) {
    const outcomeRepository = getManager().getRepository(Outcome);
    const outcomes = await outcomeRepository.find();
    ctx.status = 200;
    ctx.body = outcomes
  }
}
