import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { SanityProduct } from "@/config/inventory";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { usePathname } from "next/navigation";

interface Props {
	params: {
		slug: string;
	};
}

export default async function Page({ params }: Props) {
	const product =
		await client.fetch<SanityProduct>(groq`*[_type == "product" && slug.current == "${params.slug}"][0] {
        _id,
        _createdAt,
        "id": _id,
        name,
        sku,
        images,
        price,
        currency,
        description,
        sizes,
        categories,
        colors,
        "slug": slug.current
    }`);

	return (
		<main className="max-w-5xl mx-auto sm:px-6 sm:pt-16 lg:px-8">
			<div className="max-w-2xl mx-auto lg:max-w-none">
				{/* Product */}
				<div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
					{/* Product gallery */}
					<ProductGallery product={product} />
					{/* Product info */}
					<ProductInfo product={product} />
				</div>
			</div>
		</main>
	);
}
