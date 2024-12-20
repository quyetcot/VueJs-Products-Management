import { createStore } from "vuex";
import auth from "./modules/auth";
import products from "./modules/products";

export default createStore({
  modules: {
    auth,
    products,
  },
});


