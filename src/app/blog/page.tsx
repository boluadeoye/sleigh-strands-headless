import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

async function getPosts() {
  const baseUrl = 'https://sleigh.staymedia.ng';
  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed`, { next: { revalidate: 3600 } });
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 opacity-70 blur-[2px] scale-105">
          <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white font-sans text-5xl md:text-7xl font-bold tracking-tighter uppercase">
          The <span className="text-[#8B2632] font-sans italic">Editorial</span>
        </h1>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post: any) => {
            const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776170457/blog_assets/av9grfitavzjltpmsopn.png";
            return (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                  <Image src={imageUrl} alt={post.title.rendered} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B2632] font-bold mb-3">Hair Care</span>
                <h2 className="text-2xl font-sans text-black leading-tight mb-4 group-hover:text-[#FF6B35] transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-sm text-black/60 line-clamp-3 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
