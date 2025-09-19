<template>
    <section>
        <!-- header -->

        <Header/>
            <section class="px-6 py-16 mx-auto max-w-7xl">
            <div class="max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">

                <!-- Text Content -->
                <div class="mt-4 md:mt-0">
                <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">PROJECT</h2>
                <p class="mt-2 text-xl text-gray-700 font-medium">
                    Real Innovation. Real Impact.
                </p>
                <p class="mt-4 text-gray-600">
                    At Digital TechLabs, we don’t just build software — we engineer digital ecosystems that drive growth, efficiency, and competitive edge.
                    Each project reflects our commitment to innovation, performance, and meaningful results.
                </p>

                <h3 class="mt-8 text-2xl font-bold text-gray-900">BtoB.LK – Sri Lanka’s Premier B2B Marketplace</h3>
                <p class="mt-2 text-gray-600">
                    <strong>Industry:</strong> B2B E-commerce | <strong>Platform:</strong> Multivendor Web Portal
                </p>
                <p class="mt-2 text-gray-600 italic">
                    “Connecting thousands of businesses, vendors, and buyers across the nation.”
                </p>

                <h4 class="mt-6 text-xl font-semibold text-gray-900">📌 What We Did:</h4>
                <ul class="mt-2 text-gray-700 list-disc list-inside space-y-1">
                    <li>Full platform architecture & development</li>
                    <li>Vendor/buyer registration flows</li>
                    <li>Quotation call system</li>
                    <li>Subscription & payment integration</li>
                    <li>Backend CMS + workflow automation</li>
                </ul>

                <h4 class="mt-6 text-xl font-semibold text-gray-900">📈 Impact:</h4>
                <ul class="mt-2 text-gray-700 list-disc list-inside space-y-1">
                    <li>1,000+ vendors onboarded</li>
                    <li>80% reduction in manual procurement</li>
                    <li>Growing user base across all industries</li>
                </ul>
                </div>

                <!-- Image / Video Banner -->
                <div class="mt-8 md:mt-0">
                <!-- Large Image or Video -->
                <img class="w-full rounded-lg shadow-lg" src="/assets/img/digitalTechLabs/project.png" alt="BtoB.LK Project Banner">
                <!-- Optionally, replace the image with a video -->
                <!--
                <video class="w-full rounded-lg shadow-lg" autoplay muted loop>
                    <source src="path-to-your-project-demo.mp4" type="video/mp4">
                </video>
                -->
                </div>
            </div>
            </section>


        
        <Footer/>
        

  
    </section>
  </template>
  
<script setup>
  import { ref } from "vue";
  import Header from "~/components/DigitalTechLabs/header.vue";
  import Footer from "~/components/DigitalTechLabs/footer.vue";
  import projectImge from "~/assets/img/digitalTechLabs/project.png"

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
