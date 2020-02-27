import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Login.vue";
import Dashboard from "../components/dashboard-supplier.vue";
import Admin from "../components/admin.vue";
import store from '../store';
import products from '../subcomponents/products.vue';
import orders from '../subcomponents/order.vue'

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const product = {
  template: products
}

const order = {
  template: orders
}


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/dashboard-supplier/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ifAuthenticated,
    children: [
      {
          // при совпадении пути с шаблоном /user/:id/profile
          // в <router-view> компонента User будет показан UserProfile
          path: 'products',
          component: product
      },
      {
      // при совпадении пути с шаблоном /user/:id/posts
      // в <router-view> компонента User будет показан UserPosts
          path: 'orders',
          component: order
      }
  ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: ifAuthenticated
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
