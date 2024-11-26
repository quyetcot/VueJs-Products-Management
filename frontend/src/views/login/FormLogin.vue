<template>
  <div>
    <Navbar></Navbar>
    <h2 class="title is-4 has-text-centered has-text-primary">Login</h2>
    <div class="form-container">
      <form action="" @submit.prevent="handleLogin">
        <b-field label="Email">
          <b-input
            type="email"
            placeholder="Type Email..."
            @blur="validateEmail"
            v-model="email"
          >
          </b-input>
        </b-field>
        <span v-if="errors.email" class="has-text-danger">{{ errors.email }}</span>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            @blur="validatePassword"
            password-reveal
          >
          </b-input>
        </b-field>
        <span v-if="errors.password" class="has-text-danger">{{ errors.password }}</span>

        <div class="has-text-centered">
          <button type="submit" class="button is-success" :disabled="hasErrors">Login</button>
        </div>
      </form>
      <p v-if="fail" class="error">{{ fail }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: null,
        password: null,
      },
      fail: null,
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error != null);
    },
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = "Invalid email format.";
      } else {
        this.errors.email = null;
      }
    },
    validatePassword() {
      if (!this.password) {
        this.errors.password = "Password is required.";
      } else {
        this.errors.password = null;
      }
    },
    handleLogin() {
      this.validateEmail();
      this.validatePassword();
      if (this.hasErrors) return; // Dừng nếu có lỗ
      const credentials = {
        email: this.email,
        password: this.password,
      };
      try {
        this.$store.dispatch("auth/login", credentials);
        this.$router.push("/product-list");
      } catch (error) {
        this.fail = "Login Fail";
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
