<template>
 
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Simulate login (Replace with API call logic)
      if (this.username === "admin" && this.password === "password") {
        alert("Login successful!");
        this.$router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        alert("Invalid username or password!");
      }
    },
  },
  head() {
    return {
      title: "Login - Digital Tech Labs",
    };
  },
};
</script>

<style scoped>
/* Custom Styles */
</style>
