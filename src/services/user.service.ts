import { prisma } from "@/lib/prisma";
import { ApiResponse, User } from "@/types";

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<User>> {
  try {
    const user = await prisma.user.create({
      data: data as any,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUser(
  id: number,
  data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<ApiResponse<User>> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: data as any,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
