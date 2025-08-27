<template>
    <section>
        <!-- header -->

        <Header/>
        <section class="px-6 py-16 mx-auto max-w-7xl">
          <div class="max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">

              <!-- Text Content -->
              <div class="mt-4 md:mt-0">
                  <h2 class="mb-4 text-3xl  font-extrabold tracking-tight text-gray-900">Our Service</h2>
                  
                  <p class="mt-4 text-medium text-gray-600">
                      At Digital Tech Labs, we harness the power of technology to create innovative digital solutions that drive business growth. From startups to enterprises, our mission is to deliver solutions that are not only functional but also engaging, scalable, and future-ready.
                  </p>

                  <h2 class="mt-8 text-2xl font-bold text-gray-900">Who We Are</h2>
                  <p class="mt-4 text-medium text-gray-600">
                      We are a passionate team of developers, designers, and strategists committed to transforming ideas into digital experiences. Our approach combines creativity with technical expertise to solve real-world business challenges.
                  </p>

                  <h2 class="mt-8 text-2xl font-bold text-gray-900">What We Do</h2>
                  <p class="mt-4 text-medium text-gray-600">
                      Our diverse range of services is designed to help businesses thrive in a competitive digital landscape. We focus on building seamless experiences, automating operations, and connecting businesses with their customers efficiently.
                  </p>

                  <ul class="mt-6 text-lg text-gray-700 list-disc list-inside space-y-2">
                      <li><strong>E-commerce Development:</strong> Engaging, high-performing online stores built for conversion and seamless shopping experiences.</li>
                      <li><strong>Multivendor Marketplaces:</strong> Scalable platforms connecting sellers and buyers effortlessly, with robust management tools.</li>
                      <li><strong>Business Automation:</strong> Smart workflows and tools that streamline daily operations, saving time and reducing errors.</li>
                      <li><strong>Mobile & Web Apps:</strong> User-centric apps for all screens and platforms, delivering smooth and intuitive experiences.</li>
                      <li><strong>SMS Gateway Solutions:</strong> Reliable messaging platforms to engage customers instantly and effectively.</li>
                  </ul>
              </div>

              <!-- Images -->
              <img class="w-full dark:hidden rounded-lg shadow-lg" src="https://img.freepik.com/free-photo/medium-shot-colleagues-standing-together_23-2149345239.jpg?t=st=1743157114~exp=1743160714~hmac=f1bcc85bff38ffab31f80526fd55508e44741149a29b890c4ebf2061104d11ef&w=740" alt="Team collaborating image">
              <img class="hidden w-full dark:block rounded-lg shadow-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image">
          </div>
      </section>

        
        <Footer/>
        

  
    </section>
  </template>
  
<script setup>
  import { ref } from "vue";
  import Header from "~/components/DigitalTechLabs/header.vue";
  import Footer from "~/components/DigitalTechLabs/footer.vue";

  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/autoplay";



  // Mobile Menu Toggle
  const menuOpen = ref(false);
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };


</script>

<script>
definePageMeta({
  layout: 'bst',
});

export default {
  component:{Header,Footer},
  data() {
    return {
      imageroot: process.env.Assets_83,
    };
  },
  async mounted() {
     
  },

    async created() {
      //this.sampleStore = useSampleStore();
    },
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {},
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      };
    },
};
</script>

<style scoped>
/* Utility Classes */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.html {
  scroll-behavior: smooth;
}
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}
nav a:hover {
  @apply bg-white text-black;
}
</style>
