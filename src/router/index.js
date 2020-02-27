import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Login.vue";
import Dashboard from "../components/Dashboard-supplier.vue";
import Admin from "../components/Admin.vue";
import store from '../store';


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
          component: require('../subcomponents/Products.vue').default
      },
      {
      // при совпадении пути с шаблоном /user/:id/posts
      // в <router-view> компонента User будет показан UserPosts
          path: 'orders',
          component: require('../subcomponents/Order.vue').default
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
