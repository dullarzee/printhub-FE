import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { reference, orderId } = await req.json();

    if (!reference || !orderId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Verify payment with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (!verifyRes.ok) {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }

    const data = await verifyRes.json();

    if (data.data.status === 'success') {
      // Update order status to completed
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'completed',
          paymentReference: reference,
        },
      });

      return NextResponse.json({ message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ message: 'Payment not successful' }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
