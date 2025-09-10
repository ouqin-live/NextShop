// 商品列表页面 - 使用SSR渲染模式

import { getAllProducts, getAllCategories } from '../../lib/products';
import ProductList from '../../components/ProductList';
import CategoryFilter from '../../components/CategoryFilter';

// 使用searchParams获取查询参数，这是服务端组件的特性
export default async function ProductsPage({ searchParams }) {
  // 获取查询参数中的category
  const { category } = await searchParams;
  const selectedCategory = category || 'all';
  
  // 并行获取所有产品和类别
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories()
  ]);
  
  // 根据选定的类别过滤产品
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">商品列表</h1>
      <p className="text-gray-600 mb-8">这个页面使用SSR (服务端渲染) 模式，每次请求时在服务器上动态渲染。</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* 侧边栏过滤器 */}
        <div className="w-full md:w-1/4">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
          />
        </div>
        
        {/* 商品列表 */}
        <div className="w-full md:w-3/4">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

// 这个函数告诉Next.js这个页面应该使用SSR模式
export const dynamic = 'force-dynamic';