import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  tag?: string;
  href: string;
  readTime?: string;
  author?: string;
};

export default function ArticleCard({
  title,
  description,
  image,
  tag,
  href,
  readTime,
  author,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="hs-card group block overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
        {readTime && (
          <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {readTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {tag && (
          <div className="mb-3 inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
            {tag}
          </div>
        )}

        <h3 className="text-base font-bold leading-6 text-gray-900 transition group-hover:text-purple-600 line-clamp-2">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
            <span>Read Article</span>
            <span className="transition group-hover:translate-x-1">→</span>
          </div>
          {author && (
            <span className="text-xs text-gray-400">{author}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
