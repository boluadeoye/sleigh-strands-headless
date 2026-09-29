import Image from 'next/image';

interface DoubleModelProps {
  mode?: 'standard' | 'compact';
  priority?: boolean;
}

export default function DoubleModel({ mode = 'standard', priority = false }: DoubleModelProps) {
  const containerHeight = mode === 'compact'
    ? 'h-[220px] md:h-[720px]'
    : 'h-[280px] md:h-[750px]';

  return (
    <section className={`w-full relative ${containerHeight} overflow-hidden bg-[#FDF8F0] transition-all duration-500`}>
      <Image
        src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779784645/blog_assets/kqlt5ehf1fhox5pqd5dp.jpg"
        alt="Sleigh Strands Editorial"
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-top transition-all duration-500"
      />
    </section>
  );
}
