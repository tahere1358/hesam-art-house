import { prisma } from "@/lib/prisma";
import { ApiResponse, Order } from "@/types";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getOrderById(id: number): Promise<Order | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export async function getUserOrders(userId: number): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export async function createOrder(
  data: Omit<Order, "id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<Order>> {
  try {
    const order = await prisma.order.create({
      data: data as any,
    });
    return { success: true, data: order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatus(
  id: number,
  status: string
): Promise<ApiResponse<Order>> {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return { success: true, data: order };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: "Failed to update order" };
  }
}
