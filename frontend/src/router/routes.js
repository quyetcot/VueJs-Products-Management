import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Greeting.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/FormLogin.vue"),
  },
  {
    path: "/product-list",
    name: "product-list",
    component: () => import("@/views/products/ListProduct.vue"),
  },
  {
    path: "/product-add",
    name: "product-add",
    component: () => import("@/views/products/AddProduct.vue"),
  },
  {
    path: "/product-edit/:id",
    name: "product-edit",
    component: () => import("@/views/products/EditProduct.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
