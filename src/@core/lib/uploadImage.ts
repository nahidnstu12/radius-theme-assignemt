import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function uploadNewFile(file: File, userId: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = path.extname(file.name);
  const newFileName = `${userId}-${Date.now()}${fileExtension}`;
  const filePath = path.resolve(UPLOAD_DIR, newFileName);

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer as any);
  return `/uploads/${newFileName}`;
}
