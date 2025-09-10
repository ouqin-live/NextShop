import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "../components/FeaturedProducts";

// 这是一个服务端组件，默认情况下App Router中的组件都是服务端组件
export default function Home() {
  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <section className="relative bg-blue-600 text-white rounded-lg overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">欢迎来到<span className="bg-white text-blue-600 px-2 rounded">NextShop</span></h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed">使用Next.js构建的现代购物网站，支持多种渲染模式</p>
            <div className="pt-2">
              <Link 
                href="/products" 
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 hover:transform hover:scale-105 transition-all duration-200"
              >
                浏览商品 →
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      </section>

      {/* 特色商品区域 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">特色商品</h2>
          <Link href="/products" className="text-blue-600 hover:underline">查看全部</Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* 渲染模式说明区域 */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Next.js渲染模式展示</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">SSR - 服务端渲染</h3>
            <p className="text-gray-600">每次请求时在服务器上渲染页面，适合动态内容和需要SEO的页面。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">SSG - 静态生成</h3>
            <p className="text-gray-600">在构建时预渲染页面，适合内容不经常变化的页面，提供最佳性能。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">ISR - 增量静态再生成</h3>
            <p className="text-gray-600">结合SSG和SSR的优点，允许静态页面在后台定期重新生成。</p>
          </div>
        </div>
      </section>
    </div>
  );
}

