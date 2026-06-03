import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
// Pointing to your custom output folder
import { PrismaClient } from "../lib/generated/prisma/index.js";

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ ERROR: DATABASE_URL is not defined in your environment variables!",
  );
  process.exit(1);
}

// 1. Pass the connection string directly via the configuration object (Prisma 7 Style)
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

// 2. Instantiate Prisma using the driver adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  const ADMIN_PASSWORD =
    process.env.SEED_ADMIN_PASSWORD || "Adminpassword@1234";
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "System Administrator User",
      email: "admin@example.com",
      passwordHash,
      address: "Pune Maharashtra India",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin Seeded Successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seeding failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
