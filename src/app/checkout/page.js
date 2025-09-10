// 结账页面 - 使用SSR渲染模式

import CheckoutForm from '../../components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">结账</h1>
      <p className="text-gray-600 mb-8">
        这个页面使用SSR (服务端渲染) 模式，处理用户提交的表单数据。
      </p>
      
      <CheckoutForm />
    </div>
  );
}

// 这个函数告诉Next.js这个页面应该使用SSR模式
export const dynamic = 'force-dynamic';