import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/index.js";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString }); // <-- Passing connectionString directly in object
const prisma = new PrismaClient({ adapter });

export default prisma;
