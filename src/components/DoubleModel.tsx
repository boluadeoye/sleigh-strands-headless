import Image from 'next/image';

interface DoubleModelProps {
  mode?: 'standard' | 'compact';
  priority?: boolean;
}

export default function DoubleModel({ mode = 'standard', priority = false }: DoubleModelProps) {
  // Calibrated Runway: Increased height to 720px to support the Editorial overlap
  const containerHeight = mode === 'compact'
    ? 'h-[220px] md:h-[720px]' 
    : 'h-[280px] md:h-[750px]';

  // Calibrated Anchor: object-top ensures faces are never severed by the overlap
  const imageCrop = mode === 'compact'
    ? 'object-[center_5%] md:object-top'
    : 'object-[center_15%] md:object-top';

  return (
    <section className={`w-full relative ${containerHeight} overflow-hidden bg-[#FDF8F0] transition-all duration-500`}>
      <Image
        src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102467/blog_assets/vufucyvzozyopb93lu8e.png"
        alt="Sleigh Strands Editorial"
        fill
        priority={priority}
        sizes="100vw"
        className={`object-cover ${imageCrop} transition-all duration-500`}
      />
    </section>
  );
}