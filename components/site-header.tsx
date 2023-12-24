"use client";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

export function SiteHeader() {
	const currentpath = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const { cartCount } = useShoppingCart();

	const defaultSearchQuery = searchParams.get("search") ?? "";

	if (currentpath.startsWith("/studio")) return null;

	function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const searchQuery = formData.get("search");
		router.replace(`/?search=${searchQuery}`);
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="flex items-center justify-between h-16 max-w-6xl px-6 mx-auto space-x-4 sm:space-x-0">
				<MainNav />
				<form
					onSubmit={onSubmit}
					className="items-center hidden lg:inline-flex"
				>
					<Input
						id="search"
						name="search"
						type="search"
						autoComplete="off"
						placeholder="Search products..."
						className="h-9 lg:w-[300px]"
						defaultValue={defaultSearchQuery}
					/>
				</form>
				<div className="flex items-center space-x-1">
					<Link href="/cart">
						<Button size="sm" variant="ghost">
							<ShoppingBag className="w-5 h-5" />
							<span className="ml-2 text-sm font-bold">
								{cartCount}
							</span>
							<span className="sr-only">Cart</span>
						</Button>
					</Link>
					<ThemeToggle />
					{process.env.NODE_ENV === "development" && (
						<Link href={"/studio"}>
							<Button size={"sm"} variant="ghost">
								<Edit className="w-5 h-5" />
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
