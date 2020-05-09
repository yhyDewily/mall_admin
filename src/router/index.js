import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import Login from "../pages/Login";
import OrderList from "../pages/OrderList";
import OrderDetail from "../pages/OrderDetail";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";
import ProductList from "../pages/ProductList";
import UserInfo from "../pages/UserInfo";
import CategoryList from "../pages/CategoryList";
import DealDetail from "../pages/DealDetail";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/deal_detail',
      children:[
        {
          path: '/deal_detail',
          name: 'deal_detail',
          component: DealDetail
        },
        {
          path: '/order_list',
          name: 'order_list',
          component: OrderList,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/order_detail',
          name: 'order_detail',
          component: OrderDetail,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/product_detail/:id',
          name: 'product_detail',
          component: ProductDetail,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/product_edit',
          name: 'product_edit',
          component: ProductEdit,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/product_list',
          name: 'product_list',
          component: ProductList,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/user_info',
          name: 'user_info',
          component: UserInfo,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/category_list',
          name: 'category_list',
          component: CategoryList,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
      ]
    },
]

const router = new VueRouter({
  routes
})

export default router
