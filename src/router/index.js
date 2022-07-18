import { createWebHistory, createRouter } from 'vue-router'
// import { auth } from '@/firebase/firebaseInit'
const routes = [
  {
    path: "",
    name: "Home",
    component: import('@/pages/HomePage.vue'),
  },
  {
    path: "/product",
    name: "Product",
    component: import('@/pages/HomePage.vue'),
  },
  {
    path: "/about",
    name: "About",
    component: import('@/pages/AboutPage.vue'),
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: import('@/pages/DetailPage.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: import('@/pages/LoginPage.vue'),
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: import('@/pages/admin/LoginPage.vue'),
  },
  {
    path: "/admin",
    name: "Admin",
    component: import('@/pages/admin/AdminPage.vue'),
    meta:{
        requireAuth:true
    },
    children: [
      // {
      //   // UserProfile will be rendered inside User's <router-view>
      //   // when /user/:id/profile is matched
      //   path: '/orders',
      //   name: 'Orders',
      //   component: import('@/pages/admin/OrderPage.vue'),
      // },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/orders-without-login',
        name: 'OrdersWithoutLogin',
        component: import('@/components/admin/OrderWithoutLoginPage.vue'),
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/orders-with-member',
        name: 'OrdersWithMember',
        component: import('@/components/admin/OrdersWithMemberPage.vue'),
      },
    ],
  },
  {
    path: "/admin/orders",
    name: "Order",
    component: import('@/pages/admin/OrderPage.vue'),
    meta:{
        requireAuth:true
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: import('@/pages/PaymentPage.vue')
  },
  {
    path:"/check-orders",
    name:"CheckOrders",
    component: import('@/pages/CheckOrders.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  let authLogin = localStorage.getItem('adminLogin')?JSON.parse(localStorage.getItem('adminLogin')):null
  if (to.path === '/admin/login' && authLogin) {
    next('/admin')
    return
  }
  if (to.matched.some(record => record.meta.requireAuth) && !authLogin) {
    next('/admin/login')
    return
  }
  next()
})
export default router;