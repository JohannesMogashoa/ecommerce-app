import { inventory } from "@/config/inventory";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities";

export async function POST(request: Request) {
	const cartDetails = await request.json();
	const lineItems = validateCartItems(inventory, cartDetails);
	const origin = request.headers.get("origin");

	const session = await stripe.checkout.sessions.create({
		submit_type: "pay",
		mode: "payment",
		payment_method_types: ["card"],
		line_items: lineItems,
		success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/cart`,
	});

	return NextResponse.json(session);
}
