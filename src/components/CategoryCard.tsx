import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  image: string;
};

export default function CategoryCard({
  name,
  slug,
  emoji,
  description,
  image,
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group relative overflow-hidden rounded-3xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="mb-2 text-3xl">{emoji}</div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-sm leading-6 text-white/75 line-clamp-2">
          {description}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-purple-600">
          Explore →
        </div>
      </div>
    </Link>
  );
}
