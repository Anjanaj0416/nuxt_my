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
          {{ registrationType === 'school' ? 'Create your driving school account' : 'Student Registration' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or
          <NuxtLink to="/learners/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <!-- School Registration Form -->
        <div v-if="registrationType === 'school'" class="space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <!-- Existing school fields -->
            <div>
              <label for="name" class="sr-only">School Name</label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                required
                class="input-field"
                placeholder="School Name"
              />
            </div>
            
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="input-field"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label for="phone" class="sr-only">Phone number</label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="input-field"
                placeholder="Phone number"
              />
            </div>
            
            <div>
              <label for="address" class="sr-only">Address</label>
              <input
                id="address"
                v-model="address"
                type="text"
                required
                class="input-field"
                placeholder="School Address"
              />
            </div>
            
            <div>
              <label for="license-number" class="sr-only">License Number</label>
              <input
                id="license-number"
                v-model="licenseNumber"
                type="text"
                required
                class="input-field"
                placeholder="Driving School License Number"
              />
            </div>
          </div>
        </div>

        <!-- Student Registration Form -->
        <div v-else class="space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="studentName" class="sr-only">Full Name</label>
              <input
                id="studentName"
                v-model="studentName"
                type="text"
                required
                class="input-field"
                placeholder="Full Name"
              />
            </div>
            
            <div>
              <label for="studentEmail" class="sr-only">Email address</label>
              <input
                id="studentEmail"
                v-model="studentEmail"
                type="email"
                required
                class="input-field"
                placeholder="Email address"
              />
            </div>

            <div>
              <label for="studentPhone" class="sr-only">Phone number</label>
              <input
                id="studentPhone"
                v-model="studentPhone"
                type="tel"
                required
                class="input-field"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label for="dateOfBirth" class="sr-only">Date of Birth</label>
              <input
                id="dateOfBirth"
                v-model="dateOfBirth"
                type="date"
                required
                class="input-field"
              />
            </div>

            <div>
              <label for="licenseType" class="sr-only">License Type</label>
              <select
                id="licenseType"
                v-model="licenseType"
                required
                class="input-field"
              >
                <option value="learner">Learner's License</option>
                <option value="provisional">Provisional License</option>
                <option value="full">Full License</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Common Password Fields -->
        <div class="space-y-4">
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="currentPassword"
              type="password"
              required
              class="input-field"
              placeholder="Password"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="currentConfirmPassword"
              type="password"
              required
              class="input-field"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="agreeTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            I agree to the
            <a href="#" class="text-primary-500 hover:text-primary-500 dark:text-primary-500">Terms of Service</a>
            and
            <a href="#" class="text-primary-500 hover:text-primary-500 dark:text-primary-500">Privacy Policy</a>
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-secondary-970 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
          v-if="!isLoading"
          class="h-5 w-5 text-black group-hover:text-black"
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

const route = useRoute()
const registrationType = ref(route.query.type || 'school')
const selectedSchool = ref(route.query.school || null)


import { ref } from 'vue'
import { useUserStore } from '~/stores/modules/userStore'

definePageMeta({
  layout: false
});


const userStore = useUserStore()

const studentName = ref('')
const studentEmail = ref('')
const studentPhone = ref('')
const studentPassword = ref('')
const studentConfirmPassword = ref('')
const dateOfBirth = ref('')
const licenseType = ref('learner')

const accountType = ref('school')
const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const address = ref('')
const licenseNumber = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)

// Computed property for password field binding
const currentPassword = computed({
  get() {
    return registrationType.value === 'school' ? password.value : studentPassword.value
  },
  set(val) {
    if (registrationType.value === 'school') {
      password.value = val
    } else {
      studentPassword.value = val
    }
  }
})

// Computed property for confirm password field binding
const currentConfirmPassword = computed({
  get() {
    return registrationType.value === 'school' ? confirmPassword.value : studentConfirmPassword.value
  },
  set(val) {
    if (registrationType.value === 'school') {
      confirmPassword.value = val
    } else {
      studentConfirmPassword.value = val
    }
  }
})

const handleRegister = async () => {
  if (registrationType.value === 'school') {
    // Existing school registration logic
    // ...
  } else {
    // Student registration logic
    if (studentPassword.value !== studentConfirmPassword.value) {
      userStore.showToast('Passwords do not match!', 'error')
      return
    }

    if (!agreeTerms.value) {
      userStore.showToast('Please agree to the Terms of Service', 'error')
      return
    }

    isLoading.value = true

    const registerDetails = {
      name: studentName.value,
      email: studentEmail.value,
      password: studentPassword.value,
      phone: studentPhone.value,
      dateOfBirth: dateOfBirth.value,
      licenseType: licenseType.value,
      schoolId: selectedSchool.value,
      accountType: 'student'
    }

    try {
      // Call your student registration API here
      // await userStore.registerStudent(registerDetails, showLoading)
      
      isLoading.value = false
      
      if (userStore.token) {
        navigateTo('/learners')
      }
    } catch (error) {
      isLoading.value = false
      userStore.showToast('Registration failed. Please try again.', 'error')
    }
  }
}


// SEO
useHead({
  title: 'Sign Up - DriveLearn',
  meta: [
    { name: 'description', content: 'Create your DriveLearn account to start booking driving lessons or register your driving school.' }
  ]
})
</script>

<style scoped>
.input-field {
  @apply appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700;
}
</style>