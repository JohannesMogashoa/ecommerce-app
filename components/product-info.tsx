"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SanityProduct } from "@/config/inventory";
import { getSizeName } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

interface Props {
	product: SanityProduct;
}

export function ProductInfo({ product }: Props) {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const { addItem, cartDetails, incrementItem } = useShoppingCart();
	const { toast } = useToast();
	const isInCart = !!cartDetails?.[product._id];

	function addToCart() {
		const item = {
			...product,
			product_data: {
				size: selectedSize,
			},
		};
		isInCart ? incrementItem(item._id) : addItem(item);
		toast({
			title: `${item.name} (${getSizeName(selectedSize)})`,
			description: "Product added to cart",
			action: (
				<Link href={"/cart"}>
					<Button
						variant={"link"}
						className="gap-x-2 whitespace-nowrap"
					>
						<span>Open cart</span>
						<ArrowRight className="w-5 h-5" />
					</Button>
				</Link>
			),
		});
	}

	return (
		<div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
			<h1 className="text-3xl font-bold tracking-tight">
				{product.name}
			</h1>

			<div className="mt-3">
				<h2 className="sr-only">Product information</h2>
				<p className="text-3xl tracking-tight">
					{formatCurrencyString({
						currency: product.currency,
						value: product.price,
					})}
				</p>
			</div>

			<div className="mt-6">
				<h3 className="sr-only">Description</h3>
				<div className="space-y-6 text-base">{product.description}</div>
			</div>

			<div className="mt-4">
				<p>
					Size: <strong>{getSizeName(selectedSize)}</strong>
				</p>
				{product.sizes.map((size) => (
					<Button
						onClick={() => setSelectedSize(size)}
						key={size}
						variant={selectedSize === size ? "default" : "outline"}
						className="mt-4 mr-2"
					>
						{getSizeName(size)}
					</Button>
				))}
			</div>

			<form className="mt-6">
				<div className="flex mt-4">
					<Button
						onClick={addToCart}
						type="button"
						className="w-full py-6 text-base font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
					>
						Add to cart
					</Button>
				</div>
			</form>
		</div>
	);
}
