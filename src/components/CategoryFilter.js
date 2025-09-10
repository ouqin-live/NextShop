'use client';

import { useRouter } from 'next/navigation';

// 这是一个客户端组件，用于过滤商品类别
export default function CategoryFilter({ categories, selectedCategory }) {
  const router = useRouter();
  
  // 处理类别变更
  const handleCategoryChange = (category) => {
    if (category === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium mb-4">商品类别</h2>
      <div className="space-y-2">
        <div 
          className={`cursor-pointer p-2 rounded ${selectedCategory === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          onClick={() => handleCategoryChange('all')}
        >
          全部商品
        </div>
        
        {categories.map(category => (
          <div 
            key={category}
            className={`cursor-pointer p-2 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}