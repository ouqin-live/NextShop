// 这是一个服务端组件，用于展示特色商品

import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '../lib/products';

export default async function FeaturedProducts() {
  // 获取特色商品数据
  const products = await getFeaturedProducts();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Link href={`/products/${product.id}`}>
            <div className="relative h-48 w-full">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">¥{product.price.toFixed(2)}</span>
                {product.discount && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {product.discount}% 折扣
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}