import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  const baseUrl = 'https://sleighstrands.com/admin';
  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data[0];
  } catch (error) {
    return null;
  }
}

export default async function SinglePostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) notFound();
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png";

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      
      {/* Cinematic Header */}
      <div className="relative w-full h-[180px] md:h-[450px] overflow-hidden">
        <Image src={imageUrl} alt={post.title.rendered} fill className="object-cover object-[center_25%]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#8B2632] font-bold block mb-6">Editorial</span>
          <h1 className="text-4xl md:text-6xl font-sans text-black leading-tight mb-8" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <span className="text-xs text-black/40 uppercase tracking-widest">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Content Area with Custom Prose Styling */}
        <div 
          className="text-base md:text-lg text-black/80 leading-loose font-light [&>p]:mb-8 [&>h2]:text-3xl [&>h2]:font-sans [&>h2]:text-[#8B2632] [&>h2]:mb-6 [&>h2]:mt-12 [&>h3]:text-2xl [&>h3]:font-sans [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-10 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>li]:mb-2 [&>img]:rounded-2xl [&>img]:my-12 [&>img]:shadow-xl"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        />
      </article>
      <Footer />
    </main>
  );
}
