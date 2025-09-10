// 商品详情页面 - 使用SSG和ISR渲染模式

import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getAllProducts } from '../../../lib/products';
import AddToCartButton from '../../../components/AddToCartButton';

// 商品详情页面组件
export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  
  // 如果商品不存在，显示404页面
  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">404 - 商品不存在</h1>
        <p className="text-gray-600 mb-6">抱歉，您查找的商品不存在或已被移除。</p>
        <Link 
          href="/products" 
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回商品列表
        </Link>
      </div>
    );
  }
  
  // 计算折扣价格
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  return (
    <div>
      <div className="mb-6">
        <Link href="/products" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回商品列表
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* 商品图片 */}
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-full">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* 商品信息 */}
          <div className="p-6 md:w-1/2">
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{product.category}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="mb-4">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-2">¥{discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through">¥{product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {product.discount}% 折扣
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-blue-600">¥{product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">库存状态:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock} 件可用</span>
                ) : (
                  <span className="text-red-600">缺货</span>
                )}
              </div>
            </div>
            
            <AddToCartButton product={product} />
            
            <div className="mt-6 text-sm text-gray-500">
              <p>此页面使用增量静态再生成 (ISR) 渲染模式，在构建时预渲染并定期更新。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 静态生成路径
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map(product => ({
    id: product.id,
  }));
}

// 配置ISR - 每60秒重新验证页面
export const revalidate = 60;