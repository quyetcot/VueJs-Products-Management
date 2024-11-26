import axios from "axios";

const state = {
  products: [],
  detailProduct: {},
};
const getters = {
  getAllProducts(state) {
    return state.products;
  },
  getProductById(state) {
    return state.detailProduct;
  },
};
const mutations = {
  GET_ALL_PRODUCTS(state, dataProducts) {
    state.products = dataProducts;
  },
  ADD_PRODUCT(state, newProduct) {
    state.products.push(newProduct);
  },
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter(
      (products) => products.id != productId
    );
  },
  GET_PRODUCT_BYID(state, dataProduct) {
    state.detailProduct = dataProduct;
  },
  UPDATE_PRODUCT(state, dataProduct) {
    const index = state.products.findIndex(
      (product) => product.id === dataProduct.id
    );
    if (index != -1) {
      state.products[index] = { ...state.products[index], ...dataProduct };
    }
  },
};

const actions = {
  async getAllProducts({ commit }) {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      commit("GET_ALL_PRODUCTS", response.data);
    } catch (error) {
      console.log("Fail!", error);
    }
  },
  async addNewProduct({ commit }, newProduct) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      commit("ADD_PRODUCT", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteProduct({ commit }, productId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );
      console.log(response);
      commit("DELETE_PRODUCT", productId);
    } catch (error) {
      console.log(error);
    }
  },
  async getProductById({ commit }, productId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      commit("GET_PRODUCT_BYID", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateProduct({commit},dataProduct) {
    try {
      console.log(dataProduct);
      const response = await axios.put(
        `http://localhost:5000/api/products/${dataProduct.id}`,
        dataProduct
      );
      commit("UPDATE_PRODUCT", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
