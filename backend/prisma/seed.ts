// prisma/seed.ts
import "dotenv/config";
import prisma from "../src/utils/prisma.client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables");
}

async function main() {

  const vendors = [
    {
      name: "Manish IT Solutions",
      email: "manishku073@gamil.com",
      phone: "9999999999",
      company: "Manish IT Solutions Pvt Ltd",
      address: "Bengaluru, Karnataka, India",
      categories: ["Laptop", "Monitor", "IT Hardware"],
    },
    {
      name: "Suhan Tech Distributors",
      email: "suhan0100@gmail.com",
      phone: "8888888888",
      company: "Suhan Tech Distributors",
      address: "Mumbai, Maharashtra, India",
      categories: ["Laptop", "Accessories", "Networking"],
    },
    {
      name: "KittyCam Electronics",
      email: "kittycam76@gmail.com",
      phone: "7777777777",
      company: "KittyCam Electronics",
      address: "Delhi, India",
      categories: ["Monitor", "Display", "Peripherals"],
    },
  ];

  // Use createMany for faster inserts
  await prisma.vendors.createMany({
    data: vendors,
    skipDuplicates: true, // if you re-run seed, it won't crash on unique email
  });

  console.log("Seeded vendors successfully");
}

main()
  .catch((e) => {
    console.error("Error seeding vendors:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
