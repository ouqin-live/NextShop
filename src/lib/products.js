// 模拟产品数据库
const products = [
  {
    id: '1',
    name: '高性能笔记本电脑',
    description: '最新一代处理器，16GB内存，512GB SSD存储，适合专业工作和游戏。',
    price: 6999,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop',
    featured: true,
    discount: 10,
    stock: 15
  },
  {
    id: '2',
    name: '智能手表',
    description: '全天候健康监测，运动追踪，通知提醒，长达7天的电池续航。',
    price: 1299,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop',
    featured: true,
    discount: 5,
    stock: 25
  },
  {
    id: '3',
    name: '无线降噪耳机',
    description: '主动降噪技术，高清音质，舒适佩戴，长达30小时的电池续航。',
    price: 899,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    featured: true,
    discount: null,
    stock: 30
  },
  {
    id: '4',
    name: '专业相机',
    description: '2400万像素，4K视频录制，多种拍摄模式，适合专业摄影师。',
    price: 4599,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
    featured: true,
    discount: 15,
    stock: 10
  },
  {
    id: '5',
    name: '智能家居套装',
    description: '包含智能音箱、灯泡、插座和传感器，轻松打造智能家居环境。',
    price: 1599,
    category: '智能家居',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop',
    featured: false,
    discount: null,
    stock: 20
  },
  {
    id: '6',
    name: '游戏主机',
    description: '最新一代游戏主机，支持4K游戏，内置1TB存储，附带一个无线控制器。',
    price: 3799,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    featured: false,
    discount: null,
    stock: 8
  },
  {
    id: '7',
    name: '智能手机',
    description: '6.7英寸全面屏，5G网络，128GB存储，强大的相机系统。',
    price: 4999,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1964&auto=format&fit=crop',
    featured: false,
    discount: 8,
    stock: 22
  },
  {
    id: '8',
    name: '平板电脑',
    description: '10.9英寸视网膜显示屏，A14仿生芯片，支持Apple Pencil。',
    price: 3299,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1974&auto=format&fit=crop',
    featured: false,
    discount: null,
    stock: 18
  }
];

// 获取所有产品
export async function getAllProducts() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

// 获取特色产品
export async function getFeaturedProducts() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.filter(product => product.featured);
}

// 根据ID获取产品
export async function getProductById(id) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  return products.find(product => product.id === id) || null;
}

// 根据类别获取产品
export async function getProductsByCategory(category) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 400));
  return products.filter(product => product.category === category);
}

// 获取所有产品类别
export async function getAllCategories() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  const categories = [...new Set(products.map(product => product.category))];
  return categories;
}