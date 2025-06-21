<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or
          <NuxtLink to="/learners/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <!-- Account Type -->
        <div>
          <label class="text-base font-medium text-gray-900 dark:text-white">Account Type</label>
          <p class="text-sm leading-5 text-gray-500 dark:text-gray-400">Choose your account type</p>
          <fieldset class="mt-4">
            <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
              <div class="flex items-center">
                <input
                  id="student"
                  v-model="accountType"
                  name="account-type"
                  type="radio"
                  value="student"
                  class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600"
                />
                <label for="student" class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Student
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="school"
                  v-model="accountType"
                  name="account-type"
                  type="radio"
                  value="school"
                  class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600"
                />
                <label for="school" class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Driving School
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              :placeholder="accountType === 'school' ? 'School Name' : 'Full Name'"
            />
          </div>
          
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label for="phone" class="sr-only">Phone number</label>
            <input
              id="phone"
              v-model="phone"
              name="phone"
              type="tel"
              autocomplete="tel"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Password"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <!-- Additional fields for schools -->
        <div v-if="accountType === 'school'" class="space-y-4">
          <div>
            <label for="address" class="sr-only">Address</label>
            <input
              id="address"
              v-model="address"
              name="address"
              type="text"
              autocomplete="street-address"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="School Address"
            />
          </div>
          
          <div>
            <label for="license-number" class="sr-only">License Number</label>
            <input
              id="license-number"
              v-model="licenseNumber"
              name="license-number"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="Driving School License Number"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="agreeTerms"
            name="agree-terms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            I agree to the
            <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">Terms of Service</a>
            and
            <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">Privacy Policy</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!isLoading"
                class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: false
});

import { useAuthStore } from '~/stores/modules/learners/auth'  // or your correct path
const { login } = useAuthStore()

const accountType = ref('student')
const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const address = ref('')
const licenseNumber = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock registration and login
  login({
    id: Math.floor(Math.random() * 1000),
    name: name.value,
    email: email.value,
    type: accountType.value,
    phone: phone.value,
    ...(accountType.value === 'school' && {
      address: address.value,
      licenseNumber: licenseNumber.value
    })
  })
  
  isLoading.value = false
  navigateTo('/')
}

// SEO
useHead({
  title: 'Sign Up - DriveLearn',
  meta: [
    { name: 'description', content: 'Create your DriveLearn account to start booking driving lessons or register your driving school.' }
  ]
})
</script>