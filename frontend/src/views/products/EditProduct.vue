<template>
  <section>
    <Navbar />
    <div>
      <h2 class="title is-4 has-text-centered has-text-primary">Cập nhật</h2>
      <div class="form-container">
        <form action="" @submit.prevent="updateProduct">
          <b-field label="Tên:">
            <b-input
              type="text"
              placeholder="Type tên..."
              @blur="validate"
              v-model="detailProduct.name"
            >
            </b-input>
          </b-field>
          <span v-if="errors.name" class="has-text-danger">{{
            errors.name
          }}</span>

          <b-field label="Giá:">
            <b-input
              type="text"
              placeholder="Type giá..."
              @keypress="restrictNonNumbers"
              @blur="validate"
              v-model="detailProduct.price"
            >
            </b-input>
          </b-field>
          <span v-if="errors.price" class="has-text-danger">{{
            errors.price
          }}</span>

          <b-field label="Danh mục:">
            <b-input
              type="text"
              placeholder="Type danh mục..."
              @blur="validate"
              v-model="detailProduct.category"
            >
            </b-input>
          </b-field>
          <span v-if="errors.category" class="has-text-danger">{{
            errors.category
          }}</span>

          <div class="has-text-centered">
            <button
              type="submit"
              class="button is-success"
              :disabled="hasErrors"
            >
              Cập nhật
            </button>
          </div>
        </form>
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
  data() {
    return {
      errors: {
        name: null,
        price: null,
        category: null,
      },
      productId: this.$route.params.id,
    };
  },
  computed: {
    detailProduct() {
      return this.$store.getters["products/getProductById"];
    },
    hasErrors() {
      return Object.values(this.errors).some((error) => error != null);
    },
  },
  methods: {
    validate() {
      if (!this.detailProduct.name) {
        this.errors.name = "Name is required";
      } else {
        this.errors.name = null;
      }
      if (!this.detailProduct.price) {
        this.errors.price = "Price is required";
      } else {
        this.errors.price = null;
      }
      if (!this.detailProduct.category) {
        this.errors.category = "Category is required";
      } else {
        this.errors.category = null;
      }
    },
    restrictNonNumbers(event) {
      const char = event.key; // Sử dụng `event.key` để lấy ký tự nhập vào
      if (!/^[0-9.]$/.test(char)) {
        event.preventDefault(); // Ngăn chặn ký tự không phải số hoặc dấu chấm
      }
    },
    updateProduct() {
      try {
        this.validate();
        const dataProduct = {
          id: Number(this.productId),
          name: this.detailProduct.name,
          price: this.detailProduct.price,
          category: this.detailProduct.category,
        };
        console.log(dataProduct);
        this.$store.dispatch("products/updateProduct", dataProduct);
        alert("Cập nhật thành công!!!");
        this.$router.push({ name: "product-list" });
      } catch (error) {
        console.log(error);
        alert("Cập nhật thất bại!!!");
      }
    },
  },
  mounted() {
    this.$store.dispatch("products/getProductById", this.productId);
  },
};
</script>
<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Full height to center vertically */
}

form {
  width: 50%; /* Set form width to 50% */
}
</style>
