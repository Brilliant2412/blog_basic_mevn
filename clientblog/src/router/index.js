import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateBlog from '../views/CreateBlog.vue'
import MyBlog from '../views/MyBlog.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogTrash from '../views/BlogTrash.vue'
import store from '../store'



Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/createBlog',
    name: 'createBlog',
    component: CreateBlog,
    
  },
  {
    path: '/stored/blogs',
    name: 'myBlog',
    component: MyBlog,
    
  },
  {
    path: '/blogs/:id',
    name: 'blogdetail',
    component: BlogDetail,
    
 },
 {
  path: '/blogs/edit/:id',
  name: 'blogedit',
  component: BlogEdit,
  
},
  {
    path: '/trash/blogs',
    name: 'blogtrash',
    component: BlogTrash,
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // store
});

router.beforeEach((to, from, next) => {
  // kiem tra xem tuyen duong toi co  can xac thuc hay khong
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (store.getters.isLoggedIn){
      next({
        path: '/'
      })
      return
    }else{
      next({
        path: '/login'
      })
    }
  }else{
    next();
  }
});

export default router;