import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import BizController from './controllers/biz';
import FileController from './controllers/file';

const unprotectedRouter = new Router();

// auth 相关的路由
unprotectedRouter.post('/api/auth/login', AuthController.login);
unprotectedRouter.post('/api/auth/register', AuthController.register);

unprotectedRouter.get('/api/research/list', BizController.getResearchList);
unprotectedRouter.get('/api/task/list', BizController.getTaskList);
unprotectedRouter.get('/api/notice/list', BizController.getNoticeList);
unprotectedRouter.get('/api/report/list', BizController.getReportList);
unprotectedRouter.get('/api/research/:id', BizController.getResearchById);
unprotectedRouter.get('/api/task/:id', BizController.getTaskById);
unprotectedRouter.get('/api/notice/:id', BizController.getNoticeById);
unprotectedRouter.get('/api/file/list', FileController.getFileList);
unprotectedRouter.get('/api/file/:id', FileController.download);
unprotectedRouter.get('/api/report/:id', BizController.getReportById);

const protectedRouter = new Router();

// users 相关的路由
protectedRouter.get('/api/user/info', UserController.showUserDetail);
protectedRouter.put('/api/user/password', UserController.updateUserPassword);
protectedRouter.put('/api/user/avatar', UserController.updateUserAvatar);
protectedRouter.put('/api/user/name', UserController.updateUserName);
protectedRouter.put('/api/user/student_id', UserController.updateUserStudentId);
protectedRouter.put('/api/user/education', UserController.updateUserEducation);
protectedRouter.put('/api/user/year', UserController.updateUserYear);
protectedRouter.get('/api/user/list', UserController.getUserList);

protectedRouter.post('/api/notice/add', BizController.addNotice);
protectedRouter.post('/api/task/add', BizController.addTask);
protectedRouter.post('/api/research/add', BizController.addResearch);
protectedRouter.post('/api/report/add', BizController.addReport);
protectedRouter.delete('/api/notice/:id', BizController.removeNotice);
protectedRouter.delete('/api/task/:id', BizController.removeTask);
protectedRouter.delete('/api/research/:id', BizController.removeResearch);


protectedRouter.post('/api/upload', FileController.upload);
protectedRouter.delete('/api/file/:id', FileController.removeFile);
protectedRouter.put('/api/report/:id', BizController.editReport);
protectedRouter.delete('/api/report/:id', BizController.removeReport);

export { protectedRouter, unprotectedRouter };
