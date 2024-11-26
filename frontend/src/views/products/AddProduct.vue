<template>
  <section>
    <Navbar />
    <div>
      <h2 class="title is-4 has-text-centered has-text-primary">Thêm mới</h2>
      <div class="form-container">
        <form action="" @submit.prevent="addProduct">
          <b-field label="Tên:">
            <b-input
              type="text"
              placeholder="Type tên..."
              @blur="validate"
              v-model="name"
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
              v-model="price"
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
              v-model="category"
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
              Thêm mới
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
      name: "",
      price: null,
      category: "",
      errors: {
        name: null,
        price: null,
        category: null,
      },
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error != null);
    },
  },
  methods: {
    validate() {
      if (!this.name) {
        this.errors.name = "Name is required";
      } else {
        this.errors.name = null;
      }
      if (!this.price) {
        this.errors.price = "Price is required";
      } else {
        this.errors.price = null;
      }
      if (!this.category) {
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
    addProduct() {
      this.validate();
      try {
        const newProduct = {
          id: this.$store.getters['products/getAllProducts'].length + 1,
          name: this.name,
          price: this.price,
          category: this.category,
        };
        this.$store.dispatch("products/addNewProduct", newProduct);
        this.$router.push({name:'product-list'});
      } catch (error) {
        console.log(error);
      }
    },
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
