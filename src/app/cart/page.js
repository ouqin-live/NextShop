// 购物车页面 - 使用SSG渲染模式，但购物车内容在客户端处理

import CartContent from '../../components/CartContent';

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">购物车</h1>
      <p className="text-gray-600 mb-8">
        这个页面使用SSG (静态生成) 渲染模式，但购物车内容在客户端动态处理。
      </p>
      
      <CartContent />
    </div>
  );
}

// 配置为静态页面
export const dynamic = 'force-static';