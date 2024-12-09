import { getManager } from 'typeorm';

import { User } from '../entity/user';
import { NotFoundException, ForbiddenException } from '../exceptions'
import { isAdmin } from '../utils/auth';
import { File } from '../entity/file';
import fs from 'fs';

export default class FileController {
  public static async upload(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const category = ctx.query.category;
    const desc = ctx.query.desc || '';
    const file = ctx.request.files.file;
    if (!file) {
      ctx.status = 400;
      ctx.body = { error: 'No file uploaded' };
      return;
    }

    const fileRepository = getManager().getRepository(File);
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.state.user.id);
    if (!user) {
      throw new NotFoundException();
    }
    const f = new File();
    f.user = user;
    f.name = file.originalFilename;
    f.path = file.filepath;
    f.type = file.mimetype;
    f.size = file.size;
    f.category = category
    f.desc = desc;
    await fileRepository.save(f);
    ctx.status = 200;
  }

  public static async removeFile(ctx: any) {
    if (!isAdmin(ctx)) {
      throw new ForbiddenException('没有权限');
    }
    const fileId = ctx.params.id;
    const fileRepository = getManager().getRepository(File);
    const file = await fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException();
    }
    const filePath = file.path;
    fs.unlinkSync(filePath);
    fileRepository.remove(file);
    ctx.status = 200;
  }

  public static async download(ctx: any) {
    const fileId = ctx.params.id;
    const fileRepository = getManager().getRepository(File);
    const file = await fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException();
    }

    const filePath = file.path;
    const fileBuffer = await fs.promises.readFile(filePath);

    ctx.set('Access-Control-Expose-Headers', 'Content-Disposition');
    ctx.set('Content-Disposition', `attachment; filename="${file.name}"`);
    ctx.set('Content-Type', file.type);
    ctx.set('Content-Length', file.size);

    ctx.body = fileBuffer;
  }

  public static async getFileList(ctx: any) {
    const category = ctx.query.category;
    const fileRepository = getManager().getRepository(File);
    const files = await fileRepository.find({ where: { category } });
    ctx.status = 200;
    ctx.body = files
  }
}
