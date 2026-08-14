import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  const user1 = await prisma.user.create({
    data: { email: "john@example.com", name: "John Doe" },
  });

  const product1 = await prisma.product.create({
    data: {
      title: "Modern Art",
      description: "Beautiful modern art",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1578296566078-251c1530ce4d",
    },
  });

  const order1 = await prisma.order.create({
    data: { userId: user1.id, totalPrice: 299.99, status: "completed" },
  });

  console.log("✅ Seed completed!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
