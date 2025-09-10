# NextShop - Next.js购物网站

这是一个使用Next.js构建的现代购物网站，展示了不同的渲染模式（SSR、SSG、ISR）以及服务端组件和客户端组件的使用。

## 功能特点

- **多种渲染模式**：
  - 服务端渲染 (SSR)：商品列表页面和结账页面
  - 静态生成 (SSG)：购物车页面
  - 增量静态再生成 (ISR)：商品详情页面

- **组件类型**：
  - 服务端组件：FeaturedProducts, ProductList等
  - 客户端组件：Header, CategoryFilter, AddToCartButton, CartContent, CheckoutForm等

- **页面**：
  - 首页：展示特色商品和渲染模式说明
  - 商品列表页：使用SSR，支持按类别过滤
  - 商品详情页：使用ISR，展示商品详细信息
  - 购物车页：使用SSG，但内容在客户端处理
  - 结账页：使用SSR，处理用户提交的表单数据

## 技术栈

- **Next.js 15**：使用App Router
- **React**：用于构建用户界面
- **Tailwind CSS**：用于样式设计
- **客户端状态管理**：使用localStorage存储购物车数据

## 渲染模式说明

### SSR (服务端渲染)

服务端渲染在每次请求时在服务器上动态生成HTML。这对于需要实时数据或个性化内容的页面非常有用。

在本项目中，商品列表页面和结账页面使用SSR，通过设置：

```javascript
export const dynamic = 'force-dynamic';
```

### SSG (静态生成)

静态生成在构建时预渲染页面，生成静态HTML。这对于内容不经常变化的页面提供最佳性能。

在本项目中，购物车页面使用SSG，通过设置：

```javascript
export const dynamic = 'force-static';
```

### ISR (增量静态再生成)

ISR结合了SSG和SSR的优点，允许静态页面在后台定期重新生成。这适合内容会定期更新但不需要实时更新的页面。

在本项目中，商品详情页面使用ISR，通过设置：

```javascript
export const revalidate = 60; // 每60秒重新验证
```

## 服务端组件与客户端组件

### 服务端组件

服务端组件在服务器上渲染，不会增加客户端JavaScript包的大小。它们适合：
- 访问后端资源
- 保持敏感信息在服务器上
- 减少客户端JavaScript

在Next.js的App Router中，组件默认是服务端组件。

### 客户端组件

客户端组件在浏览器中渲染，适合需要交互性和客户端状态的功能。通过在文件顶部添加`'use client'`指令来定义。

在本项目中，如Header、CategoryFilter等需要处理用户交互的组件被定义为客户端组件。

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。
