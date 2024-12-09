import fs from 'fs';
import * as path from 'path';

export function getUploadDirName(){
  const date = new Date();
  // @ts-ignore
  let month = Number.parseInt(date.getMonth()) + 1;
  // @ts-ignore
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}

export function mkdir(dirname: string) {
  if(fs.existsSync(dirname)){
    return true;
  } else {
    if (mkdir(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }

  }
}

export function checkDirExist(p: string) {
  if (!fs.existsSync(p)) {
    mkdir(p)
  }
}

export function getUploadFileExt(name: string) {
  let idx = name.lastIndexOf('.');
  return name.substring(idx);
}

export function getUploadFileName(name: string) {
  let idx = name.lastIndexOf('.');
  return name.substring(0, idx);
}
