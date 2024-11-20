const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Drop all existing users
  
  await prisma.Post.deleteMany();
  await prisma.User.deleteMany();
  
  console.log("All users deleted.");

  // Hash passwords
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Insert new users
  await prisma.User.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      },
      {
        name: "Regular User 1",
        email: "user1@example.com",
        password: hashedPassword,
        role: "REGULAR",
      },
      {
        name: "Regular User 2",
        email: "user2@example.com",
        password: hashedPassword,
        role: "REGULAR",
      },
    ],
  });

  console.log("New users inserted successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
