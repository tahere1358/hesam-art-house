import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, getOrderById, getUserOrders, createOrder, updateOrderStatus } from '@/services/order.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (orderId) {
      const order = await getOrderById(parseInt(orderId));
      return NextResponse.json({ success: true, data: order });
    }

    if (userId) {
      const orders = await getUserOrders(parseInt(userId));
      return NextResponse.json({ success: true, data: orders });
    }

    const orders = await getAllOrders();
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createOrder(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    const result = await updateOrderStatus(id, status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
