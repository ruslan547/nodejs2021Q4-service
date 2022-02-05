import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class FileService {
  private files: string[] = [];

  constructor() {
    this.initFiles();
  }

  // eslint-disable-next-line class-methods-use-this
  initFiles() {
    const files = fs.readdirSync('public/img');
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      this.files.push(file);
    }
  }

  setFile(file: string) {
    if (!this.files.includes(file)) {
      this.files.push(file);
    }
  }

  getFiles() {
    return this.files;
  }
}
