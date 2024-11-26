<template>
  <div>
    <Navbar />
    <h2 class="title is-4 has-text-centered has-text-primary">Đây là trang chủ. Vui lòng đăng nhập để vào trang sản phẩm</h2>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "greeting-component",
  components: {
    Navbar
  }
    
};
</script>
