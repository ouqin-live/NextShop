'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 这是一个客户端组件，用于显示和管理购物车内容
export default function CartContent() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 在客户端加载购物车数据
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
    setIsLoading(false);
  }, []);
  
  // 更新商品数量
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // 从购物车中移除商品
  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // 计算商品价格
  const calculateItemPrice = (item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return price * item.quantity;
  };
  
  // 计算总价
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateItemPrice(item), 0);
  };
  
  // 清空购物车
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', '[]');
  };
  
  if (isLoading) {
    return <div className="text-center py-10">加载购物车...</div>;
  }
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-medium mb-4">您的购物车是空的</h2>
        <p className="text-gray-600 mb-6">看起来您还没有添加任何商品到购物车。</p>
        <Link 
          href="/products" 
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          浏览商品
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单价</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">小计</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cart.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <Link href={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.discount ? (
                    <div>
                      <span className="text-sm text-blue-600 font-medium">
                        ¥{(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 line-through ml-1">
                        ¥{item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-900">¥{item.price.toFixed(2)}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button 
                      className="px-2 py-1 border border-gray-300 rounded-l"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      min="1" 
                      className="w-12 text-center border-t border-b border-gray-300 py-1"
                    />
                    <button 
                      className="px-2 py-1 border border-gray-300 rounded-r"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  ¥{calculateItemPrice(item).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={clearCart}
          className="text-red-600 hover:text-red-800"
        >
          清空购物车
        </button>
        
        <div className="text-right">
          <div className="text-lg mb-2">
            总计: <span className="text-blue-600 font-bold">¥{calculateTotal().toFixed(2)}</span>
          </div>
          <Link 
            href="/checkout" 
            className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            去结账
          </Link>
        </div>
      </div>
    </div>
  );
}