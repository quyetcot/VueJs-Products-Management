<template>
  <section>
    <Navbar />
    <div class="">
      <p class="title is-2 has-text-centered is-primary my-5">
        Danh sách sản phẩm
      </p>
      <router-link to="/product-add">
        <button class="button is-primary">Thêm mới</button>
      </router-link>
      <div class="container">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th class="has-text-centered is-primary">ID</th>
              <th class="has-text-centered is-primary">Name</th>
              <th class="has-text-centered is-primary">Price</th>
              <th class="has-text-centered is-primary">Category</th>
              <th class="has-text-centered is-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td class="has-text-centered">{{ product.id }}</td>
              <td class="has-text-centered">{{ product.name }}</td>
              <td class="has-text-centered">{{ product.price }}</td>
              <td class="has-text-centered">{{ product.category }}</td>
              <td class="has-text-centered">
                <button
                  class="button is-danger"
                  @click="deleteProduct(product.id)"
                >
                  Delete
                </button>
                <button class="button is-warning">
                  <router-link :to="`product-edit/${product.id}`">Edit</router-link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  computed: {
    products() {
      return this.$store.getters["products/getAllProducts"];
    },
  },
  methods: {
    deleteProduct(productId) {
      if(confirm('Bạn có chắc chắn muốn xóa??')){
        this.$store.dispatch("products/deleteProduct", productId);
      }
    },
  },
  mounted() {
    this.$store.dispatch("products/getAllProducts");
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.table {
  border-radius: 20px; /* Thêm border-radius cho bảng */
}

.title {
  font-weight: bold; /* Đậm chữ */
  text-transform: uppercase; /* Chữ in hoa */
  color: #3273dc; /* Màu sắc tùy chỉnh */
}
</style>
