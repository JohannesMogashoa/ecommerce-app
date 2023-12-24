"use client";

import { CheckCheck, XCircle } from "lucide-react";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface Props {
	customer: Stripe.Checkout.Session.CustomerDetails | null;
}

export function CheckoutSession({ customer }: Props) {
	const { clearCart } = useShoppingCart();

	useEffect(() => {
		if (customer) {
			clearCart();
		}
	}, [customer, clearCart]);

	if (!customer) {
		return (
			<>
				<XCircle className="w-10 h-10 mx-auto text-red-400" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
					No checkout session found
				</h1>
			</>
		);
	}

	return (
		<>
			<CheckCheck className="w-10 h-10 mx-auto text-lime-500 dark:text-lime-400" />
			<h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
				Order Successful!
			</h1>
			<h3 className="mt-8 text-2xl leading-7">
				Thank you,{" "}
				<span className="font-extrabold">{customer.name}</span>!
			</h3>
			<p className="mt-8">
				Check your purchase email{" "}
				<span className="mx-1 font-extrabold text-indigo-500">
					{customer.email}
				</span>{" "}
				for your invoice.
			</p>
		</>
	);
}
