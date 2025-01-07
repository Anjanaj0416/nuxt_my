<template>
  <section class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Login Card -->
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
            class="w-full p-3 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Password -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
            class="w-full p-3 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full px-4 py-2 mt-6 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  </section>
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
