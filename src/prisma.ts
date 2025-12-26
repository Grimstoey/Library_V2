// สร้างไฟล์นี้เพื่อใช้ Prisma instance เดียวทั้งแอป
// ป้องกัน connection ซ้ำ


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;