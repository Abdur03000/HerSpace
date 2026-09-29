type IconProps = { className?: string };

const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  // Lipstick
  beauty: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.6c2.6 1.9 4 3.9 4 5.4 0 1.4-1.7 2.4-4 2.4s-4-1-4-2.4c0-1.5 1.4-3.5 4-5.4Z" />
      <path d="M8.5 11.7h7v8.9a1.4 1.4 0 0 1-1.4 1.4H9.9a1.4 1.4 0 0 1-1.4-1.4v-8.9Z" />
    </svg>
  ),

  // Dress
  fashion: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.1 2.9 12 6.5l2.9-3.6a5.5 5.5 0 0 1 3.1 3.4l-1.5 3.7 3.7 9.4a1 1 0 0 1-.9 1.5H4.8a1 1 0 0 1-.9-1.5l3.7-9.4-1.5-3.7a5.5 5.5 0 0 1 3-3.4Z" />
    </svg>
  ),

  // Cat face
  animals: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className={className} aria-hidden>
      <path d="M6.6 6.9 5.1 3.1l4.4 2.5a8.5 8.5 0 0 1 5 0l4.4-2.5-1.5 3.8A7 7 0 1 1 6.6 6.9Zm3 5.3a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm4.8 0a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 16.1a.9.9 0 0 0-1.2.9l1.2 1.3 1.2-1.3a.9.9 0 0 0-1.2-.9Z" />
    </svg>
  ),

  // Heart
  lifestyle: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 20.7 4.5 13.3a4.9 4.9 0 0 1 7-6.9l.5.5.5-.5a4.9 4.9 0 1 1 7 6.9L12 20.7Z" />
    </svg>
  ),

  // Cake
  food: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.4 9.7h15.2l-.8 3.5a1 1 0 0 1-1 .8H6.2a1 1 0 0 1-1-.8l-.8-3.5Z" />
      <path d="M3.4 15.2h17.2v4.3a1.5 1.5 0 0 1-1.5 1.5H4.9a1.5 1.5 0 0 1-1.5-1.5v-4.3Z" />
      <circle cx="12" cy="6.3" r="1.9" />
    </svg>
  ),

  // Airplane
  travel: ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.2 14.4 14 11.3V5a1.9 1.9 0 0 0-3.8 0v6.3l-7.2 3.1a.9.9 0 0 0 .2 1.7l6.9 1.9v3.2l-2.1 1.2a.7.7 0 0 0 .4 1.3l3.4-.6 3.4.6a.7.7 0 0 0 .4-1.3l-2.1-1.2V19l6.9-1.9a.9.9 0 0 0 .2-1.7Z" />
    </svg>
  ),
};

export default function CategoryIcon({ slug, className }: { slug: string } & IconProps) {
  const Icon = ICONS[slug];
  if (!Icon) return null;
  return <Icon className={className} />;
}
