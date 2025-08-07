<template>
    <div class="flex flex-col justify-between sm:flex-row">
        <div v-for="(field, index) in fields" :key="index">
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-base font-semibold text-gray-700">{{ field.label }}</h1>
          
          <!-- Check if the field is for 'shopLogo' -->
          <p v-if="field.key === 'shopLogo'">
          <img
            :src="`${imageroot}${data[field.key]}`"
            alt="Shop Logo"
            v-if="data[field.key]" 
            class="object-contain w-20 h-20 mx-auto"
          />
          <!-- Fallback text if the image URL is missing -->
          <span v-else class="text-sm text-gray-500">No Shop Logo Available</span>
        </p>
          
          <p v-if="field.key !== 'isActive'" class="text-sm text-gray-500">
            {{ data[field.key] }} {{ field.secondKey ? data[field.secondKey] : '' }}
          </p>
          <span
            v-else
            :class="{
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': data.isActive === true,
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': data.isActive === false,
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300': data.isActive === undefined 
            }"
            class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
          >
          {{ data.isActive ? 'Active' : 'Inactive' }}
          </span>

        </div>

        <!-- Divider (for responsiveness) -->
        <hr class="block w-full border-gray-300 sm:hidden" />
        <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      imageroot: {
      type: String,
      default: 'https://learners.lk:5005/web/assets/'
    }
    }
  };
  </script>
  