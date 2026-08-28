import { PrismaClient, MemberRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const akhilesh = await prisma.user.upsert({ where: { id: "demo-akhilesh" }, update: {}, create: { id: "demo-akhilesh", name: "Akhilesh", avatarInitials: "AK" } });
  const project = await prisma.project.upsert({ where: { id: "demo-quickbite" }, update: {}, create: { id: "demo-quickbite", name: "QuickBite", description: "An India-first food ordering experience.", createdById: akhilesh.id } });
  await prisma.projectMember.upsert({ where: { projectId_userId: { projectId: project.id, userId: akhilesh.id } }, update: {}, create: { projectId: project.id, userId: akhilesh.id, role: MemberRole.OWNER } });
  console.info(`Seeded ${project.name}`);
}

main().finally(() => prisma.$disconnect());
