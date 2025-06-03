import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileService {
  getFilePath(userId: string): string {
    return path.join(__dirname, "..", "..", "uploads", `${userId}.png`);
  }

  saveFile(file: Express.Multer.File, userId: string): string {
    const ext = path.extname(file.originalname);
    const fileName = `${userId}${ext}`;
    const filePath = path.join(__dirname, "..", "..", "uploads", fileName);
    fs.writeFileSync(filePath, file.buffer);
    return fileName;
  }
}
