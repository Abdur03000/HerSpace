type SectionTitleProps = {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({
  label,
  title,
  subtitle,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
          {label}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
