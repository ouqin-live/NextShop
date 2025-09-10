'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 这是一个客户端组件，用于处理结账表单
export default function CheckoutForm() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'creditCard'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const router = useRouter();
  
  // 在客户端加载购物车数据
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
    setIsLoading(false);
    
    // 如果购物车为空，重定向到购物车页面
    if (cartData.length === 0) {
      router.push('/cart');
    }
  }, [router]);
  
  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
  
  // 表单验证
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的电子邮箱';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '请输入有效的电子邮箱';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入您的电话号码';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = '请输入您的地址';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = '请输入您的城市';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = '请输入邮政编码';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 模拟提交订单
      setTimeout(() => {
        // 清空购物车
        localStorage.setItem('cart', '[]');
        
        setIsSubmitting(false);
        setOrderComplete(true);
      }, 1500);
    }
  };
  
  // 返回购物页面
  const handleContinueShopping = () => {
    router.push('/products');
  };
  
  if (isLoading) {
    return <div className="text-center py-10">加载中...</div>;
  }
  
  if (orderComplete) {
    return (
      <div className="text-center py-10">
        <div className="mb-6 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">订单已完成</h2>
        <p className="text-gray-600 mb-6">感谢您的购买！您的订单已成功提交。</p>
        <button 
          onClick={handleContinueShopping}
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          继续购物
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 结账表单 */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">配送信息</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">电话号码</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">城市</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">邮政编码</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">支付方式</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="creditCard" 
                    name="paymentMethod" 
                    value="creditCard" 
                    checked={formData.paymentMethod === 'creditCard'} 
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="creditCard">信用卡</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="alipay" 
                    name="paymentMethod" 
                    value="alipay" 
                    checked={formData.paymentMethod === 'alipay'} 
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="alipay">支付宝</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="wechatPay" 
                    name="paymentMethod" 
                    value="wechatPay" 
                    checked={formData.paymentMethod === 'wechatPay'} 
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="wechatPay">微信支付</label>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isSubmitting ? '处理中...' : '提交订单'}
            </button>
          </form>
        </div>
      </div>
      
      {/* 订单摘要 */}
      <div>
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-3">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 text-sm"> x {item.quantity}</span>
                </div>
                <span className="text-gray-900">¥{calculateItemPrice(item).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">小计</span>
              <span className="text-gray-900">¥{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">运费</span>
              <span className="text-gray-900">¥0.00</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mt-4">
              <span>总计</span>
              <span className="text-blue-600">¥{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}