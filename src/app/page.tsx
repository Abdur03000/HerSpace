import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import SectionTitle from "@/components/SectionTitle";

/* ── static data ─────────────────────────────────────── */

const testimonials = [
  {
    quote: "HerSpace helped me completely transform my skincare routine. My skin has never looked better!",
    name: "Ayesha K.",
    role: "Skincare Enthusiast",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    quote: "I found so many amazing fashion ideas here. The styling guides are honestly better than any magazine.",
    name: "Sara M.",
    role: "Fashion Lover",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote: "The animal articles make my day every single time. Absolutely love this space!",
    name: "Nadia R.",
    role: "Animal Lover",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

const beautyTips = [
  { tip: "Always apply SPF — even indoors ☀️", color: "from-pink-400 to-rose-400" },
  { tip: "Drink 8 glasses of water daily 💧", color: "from-blue-400 to-cyan-400" },
  { tip: "Never sleep with makeup on 🌙", color: "from-purple-400 to-violet-400" },
  { tip: "Moisturise damp skin for better absorption 🌿", color: "from-emerald-400 to-teal-400" },
  { tip: "Clean your makeup brushes weekly 🖌️", color: "from-amber-400 to-orange-400" },
  { tip: "Use silk pillowcase for hair & skin 🛏️", color: "from-fuchsia-400 to-pink-400" },
  { tip: "Vitamin C serum brightens dark spots ✨", color: "from-yellow-400 to-orange-400" },
  { tip: "Double cleanse to remove all makeup 🫧", color: "from-indigo-400 to-purple-400" },
];

const instagramImages = [
  { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", alt: "Makeup", href: "/category/beauty/makeup" },
  { src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80", alt: "Cat", href: "/category/animals/cats" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", alt: "Fashion", href: "/category/fashion/outfits" },
  { src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", alt: "Skincare", href: "/category/beauty/skincare" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", alt: "Travel", href: "/category/travel/destinations" },
  { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80", alt: "Dog", href: "/category/animals/dogs" },
  { src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80", alt: "Dessert", href: "/category/food/desserts" },
  { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80", alt: "Lifestyle", href: "/category/lifestyle/self-care" },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", alt: "Shoes", href: "/category/fashion/shoes" },
];

/* ── featured article (Editor's Pick) ─────────────── */
const featuredArticle = categories[0].subcategories[1].articles[0]; // makeup > natural look
const featuredCat = categories[0];
const featuredSub = categories[0].subcategories[1];

/* ── component ───────────────────────────────────────── */

export default function Home() {
  const featuredCategories = categories.slice(0, 3);

  return (
    <main>

      {/* ══ HERO — full background image ═══════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=85"
            alt="HerSpace Hero"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative flex min-h-[90vh] items-center">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm">✨</span>
                <span className="text-sm font-semibold text-white">Welcome to HerSpace</span>
              </div>

              <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
                Your little space for{" "}
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  everything
                </span>{" "}
                you love.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                Discover beauty secrets, fashion inspiration, adorable animals, delicious recipes and travel dreams — all in one beautiful place made just for you.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/category/beauty"
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-purple-900/40 transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Explore Beauty 💄
                </Link>
                <Link
                  href="/category/animals"
                  className="rounded-full border border-white/30 bg-white/15 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/25"
                >
                  Meet the Animals 🐱
                </Link>
              </div>

              {/* Quick category pills */}
              <div className="mt-10 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {c.emoji} {c.name}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 text-2xl">
          ↓
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════ */}
      <section className="border-y border-pink-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "6", label: "Categories", emoji: "🎀" },
              { value: "20+", label: "Sub-Topics", emoji: "🌿" },
              { value: "60+", label: "Articles", emoji: "📖" },
              { value: "100%", label: "For Women", emoji: "💜" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-2xl font-bold text-gray-900">{s.value}</span>
                <span className="text-xs font-medium uppercase tracking-widest text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDITOR'S PICK — Featured Article ════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8">
          <SectionTitle label="Editor's Pick" title="Featured Article" subtitle="Our top recommendation for you today" />
        </div>

        <Link
          href={`/category/${featuredCat.slug}/${featuredSub.slug}/${featuredArticle.id}`}
          className="group relative flex flex-col overflow-hidden rounded-3xl shadow-2xl shadow-purple-100 transition hover:-translate-y-1 hover:shadow-3xl md:flex-row"
        >
          {/* Image — left side on desktop */}
          <div className="relative h-72 md:h-auto md:w-1/2">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 md:block hidden" />
          </div>

          {/* Content — right side */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-purple-600 to-pink-500 p-10 md:w-1/2">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              ✨ Editor&apos;s Pick
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {featuredArticle.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              {featuredArticle.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-white/70">
              <span>✍️ {featuredArticle.author}</span>
              <span>•</span>
              <span>📖 {featuredArticle.readTime}</span>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-purple-600 transition group-hover:shadow-lg w-fit">
              Read Article
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ══ FEATURED CATEGORIES ══════════════════════════ */}
      <section className="bg-white/60 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <SectionTitle label="Explore" title="Featured Categories" subtitle="Dive into our most popular spaces" center />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredCategories.map((c) => (
              <CategoryCard
                key={c.slug}
                name={c.name}
                slug={c.slug}
                emoji={c.emoji}
                description={c.description}
                image={c.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALL CATEGORIES ═══════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <SectionTitle label="More to Discover" title="All Categories" center />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group flex items-center gap-5 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-3xl shadow-inner">
                {c.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-purple-600">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-500 line-clamp-2">
                  {c.description}
                </p>
              </div>
              <div className="ml-auto text-gray-300 transition group-hover:translate-x-1 group-hover:text-purple-500">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ BEAUTY TIPS QUICK CARDS ══════════════════════ */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <SectionTitle label="Quick Tips" title="Beauty Tips of the Day 💡" subtitle="Simple habits that transform your beauty routine" />
          </div>

          {/* Horizontal scroll on mobile, wrap on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0">
            {beautyTips.map((t, i) => (
              <div
                key={i}
                className={`flex-shrink-0 rounded-2xl bg-gradient-to-r ${t.color} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:flex-shrink sm:w-auto`}
                style={{ minWidth: "220px" }}
              >
                <p className="text-sm font-semibold leading-6">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BEAUTY SUBCATEGORIES SHOWCASE ════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <SectionTitle label="Beauty" title="Explore Beauty Topics 💄" />
          <Link href="/category/beauty" className="hidden rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-purple-600 transition hover:bg-pink-50 sm:block">
            View All →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories[0].subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/category/beauty/${sub.slug}`}
              className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-36 overflow-hidden">
                <Image src={sub.image} alt={sub.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 transition group-hover:text-purple-600">{sub.name}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-400 line-clamp-2">{sub.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ INSTAGRAM-STYLE GRID ═════════════════════════ */}
      <section className="bg-white/60 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <SectionTitle label="Inspiration" title="Visual Inspiration Board 📸" subtitle="Click any image to explore that world" center />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {instagramImages.map((img, i) => (
              <Link
                key={i}
                href={img.href}
                className={`group relative overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? undefined : "1/1" }}
              >
                <div className={i === 0 ? "relative h-full min-h-[300px]" : "relative aspect-square"}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-purple-600 shadow-lg">
                      Explore {img.alt} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ANIMALS SHOWCASE ═════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <SectionTitle label="Animals" title="Adorable Animal World 🐱" />
          <Link href="/category/animals" className="hidden rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-purple-600 transition hover:bg-pink-50 sm:block">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {categories[2].subcategories.map((sub) => (
            <Link key={sub.slug} href={`/category/animals/${sub.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={sub.image} alt={sub.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-purple-600">{sub.name}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{sub.description}</p>
                <div className="mt-4 text-sm font-semibold text-purple-600">Discover {sub.name} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-500 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Community</p>
            <h2 className="mt-2 text-4xl font-bold text-white">What Our Readers Say 💬</h2>
            <p className="mt-3 text-white/70">Real women, real stories, real love</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="relative rounded-3xl bg-white/15 p-7 backdrop-blur-sm">
                <span className="absolute -top-3 left-6 text-5xl font-black text-white/20 leading-none">&ldquo;</span>
                <p className="relative text-base leading-7 text-white">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/30">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER CTA ═══════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white p-12 text-center shadow-xl shadow-pink-100">
          <div className="text-5xl">💌</div>
          <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">Never Miss an Update</h2>
          <p className="mt-4 text-lg text-gray-500">Beauty tips, fashion trends and lifestyle inspiration — straight to your inbox.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-pink-200 bg-pink-50 px-5 py-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-purple-400 sm:w-80"
            />
            <button className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-4 text-sm font-bold text-white shadow-md transition hover:opacity-90">
              Subscribe ✨
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
