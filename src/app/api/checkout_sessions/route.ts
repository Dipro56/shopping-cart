// app/api/checkout_sessions/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
    const { items } = await request.json();

    try {
        const transformedItems = items.map((item: any) => ({
            quantity: item.quantity,
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title, // Use item title as product name
                },
                unit_amount: Math.round(item.price * 100), // Convert price to cents
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: transformedItems,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/canceled`,
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        return NextResponse.json({ statusCode: 500, message: err.message });
    }
}
