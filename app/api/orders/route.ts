import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      products,
      services,
      totalAmount,
      shippingAddress,
      status,
    } = await req.json();

    if (!userId || !totalAmount || !shippingAddress) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        status: status || 'pending',
        products: {
          createMany: {
            data: products || [],
          },
        },
        services: {
          createMany: {
            data: services || [],
          },
        },
      },
      include: {
        products: true,
        services: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: token },
      include: {
        products: true,
        services: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
