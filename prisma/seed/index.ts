import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("DATABASE_URL =", process.env.DATABASE_URL);


async function main() {
  // ลบข้อมูลเก่า (กันซ้ำเวลา seed หลายรอบ)
  await prisma.borrowItem.deleteMany();
  await prisma.borrow.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.member.deleteMany();

  // ===== Authors =====
  const author1 = await prisma.author.create({
    data: {
      firstName: "George",
      lastName: "Orwell",
      affiliation: "British Writer",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      firstName: "Haruki",
      lastName: "Murakami",
      affiliation: "Japanese Writer",
    },
  });

  // ===== Books =====
  const book1 = await prisma.book.create({
    data: {
      title: "1984",
      isbn: "9780451524935",
      category: "Dystopian",
      authorId: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Animal Farm",
      isbn: "9780451526342",
      category: "Political Satire",
      authorId: author1.id,
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "Kafka on the Shore",
      isbn: "9781400079278",
      category: "Magical Realism",
      authorId: author2.id,
    },
  });

  // ===== Members =====
  const member1 = await prisma.member.create({
    data: {
      memberCode: "M001",
      firstName: "Somchai",
      lastName: "Jaidee",
      phone: "0812345678",
    },
  });

  const member2 = await prisma.member.create({
    data: {
      memberCode: "M002",
      firstName: "Suda",
      lastName: "Dee",
      phone: "0899999999",
    },
  });

  // ===== Borrow =====
  const borrow = await prisma.borrow.create({
    data: {
      memberId: member1.id,
      items: {
        create: [
          {
            bookId: book1.id,
            dueDate: new Date("2025-01-10"),
          },
          {
            bookId: book3.id,
            dueDate: new Date("2025-01-12"),
            returnedAt: new Date("2025-01-11"),
          },
        ],
      },
    },
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
