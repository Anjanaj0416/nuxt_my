
<template>
  <div class="flex flex-col min-h-[50vh]">
    <!-- Main content -->
    <main class="flex-grow">
      <slot></slot> <!-- Your page content goes here -->
    </main>

    <!-- Footer -->
    <footer class="w-full bg-purple-700">
      <div class="flex justify-center items-center h-10 px-4 sm:h-8 text-center">
        <p class="text-sm font-medium text-white truncate">
          &copy; {{ currentYear }} Digital Tech Labs – Driving Digital Excellence 🚀 All rights reserved
        </p>
      </div>
    </footer>
  </div>
</template>


  
  <script>

  
  export default {
   
    components: {},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        currentYear: new Date().getFullYear()
      }
    },
    async mounted() {},
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {},
    async beforeMount() {

  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }
  

  </script>
  
  <style scoped>
  .cssfotter{
    height: 60px; /* Adjust the footer height */
  background-color: #072556;
  color: white;
  text-align: center;
  padding: 10px;
  line-height: 30px;

  }
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }
  @keyframes marquee {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}

.animate-marquee {
    animation: marquee 15s linear infinite;
}
  </style>
  
  
  