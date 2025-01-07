<template>
  <section class="flex items-center justify-center min-h-screen ">
    <!-- Sign Up Card -->
    <div class="flex flex-col-reverse items-center w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
      <!-- Left Section -->
      <div class="p-8 md:w-1/2">
        <h2 class="text-2xl font-bold text-gray-800">
          Market place
        </h2>
        <p class="mt-4 text-gray-600">
          To learn more, visit
          <a href="" class="text-indigo-600 underline" target="_blank">
            marketplace
          </a>.
        </p>
        <div class="mt-8">
          <!-- <img
            src="https://d1.awsstatic.com/webteam/images/AWS_logo_lockup_smile.0d06d85b2e0f57eeb7d08478e20c55c1.svg"
            alt="Logo"
            class="w-32"
          /> -->
        </div>
      </div>

      <!-- Right Section -->
      <div class="p-8 md:w-1/2 bg-gray-50">
        <h3 class="mb-6 text-xl font-semibold text-center text-gray-700">
          Sign In 
        </h3>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email address"
              required
              class="w-full p-3 mt-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <!-- Account Name Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="text"
              v-model="accountName"
              placeholder="Choose an account name"
              required
              class="w-full p-3 mt-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <!-- Verify Button -->
          <button
            type="submit"
            class="w-full px-4 py-2 font-semibold text-white bg-indigo-900 rounded-lg hover:indigo-800"
          >
            Sing In
          </button>
        </form>

        <!-- Separator -->
        <div class="flex items-center my-6">
          <hr class="w-full border-gray-300" />
          <span class="mx-2 text-sm text-gray-500">OR</span>
          <hr class="w-full border-gray-300" />
        </div>

        <!-- Sign In Button -->
        <button
          @click="goToSignin"
          class="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Create New Account
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      accountName: "",
    };
  },
  methods: {
    handleSignup() {
      // Simulate signup logic
      if (this.email && this.accountName) {
        alert(`Signup successful for ${this.accountName}`);
      } else {
        alert("Please fill in all fields!");
      }
    },
    goToSignin() {
      this.$router.push("/signin");
    },
  },
  head() {
    return {
      title: "Sign Up - AWS",
    };
  },
};
</script>

<style scoped>
/* Custom Styles */
</style>
