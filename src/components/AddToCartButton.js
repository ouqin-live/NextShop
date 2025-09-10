'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 这是一个客户端组件，用于添加商品到购物车
export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  
  // 处理数量变更
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  // 处理添加到购物车
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // 模拟添加到购物车的操作
    setTimeout(() => {
      // 获取当前购物车
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // 检查商品是否已在购物车中
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // 更新数量
        cart[existingItemIndex].quantity += quantity;
      } else {
        // 添加新商品
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          image: product.image,
          quantity: quantity
        });
      }
      
      // 保存购物车
      localStorage.setItem('cart', JSON.stringify(cart));
      
      setIsAdding(false);
      setMessage('商品已添加到购物车');
      
      // 3秒后清除消息
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 500);
  };
  
  // 直接前往结账
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-3 text-gray-700">数量:</label>
        <div className="flex items-center">
          <button 
            className="px-2 py-1 border border-gray-300 rounded-l"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input 
            type="number" 
            id="quantity" 
            value={quantity} 
            onChange={handleQuantityChange}
            min="1" 
            max={product.stock} 
            className="w-16 text-center border-t border-b border-gray-300 py-1"
          />
          <button 
            className="px-2 py-1 border border-gray-300 rounded-r"
            onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isAdding ? '添加中...' : '加入购物车'}
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={isAdding || product.stock === 0}
          className="flex-1 bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        >
          立即购买
        </button>
      </div>
      
      {product.stock === 0 && (
        <p className="mt-2 text-red-600 text-center">商品已售罄</p>
      )}
      
      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
          {message}
        </div>
      )}
    </div>
  );
}