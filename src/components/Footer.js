export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-300">NextShop是一个使用Next.js构建的现代购物网站，支持多种渲染模式，包括SSR、SSG和ISR。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">首页</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white">商品列表</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">购物车</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <p className="text-gray-300">邮箱: contact@nextshop.com</p>
            <p className="text-gray-300">电话: (123) 456-7890</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NextShop. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}