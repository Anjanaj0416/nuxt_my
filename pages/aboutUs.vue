<template>
    <section>
        <!-- header -->

        <Header/>
        
        <section class="px-6 py-16 mx-auto max-w-7xl">
            <div class="max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">

                <!-- Text Content -->
                <div class="mt-4 md:mt-0">
                <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                    About Us
                </h2>
                <p class="mt-4 text-gray-600">
                    Driving Digital Transformation with Innovation & Impact. At Digital Tech Labs, we are a team of passionate innovators, problem solvers, and creators focused on delivering cutting-edge technology solutions. Our mission is to empower businesses through digital transformation by offering high-quality software development, digital marketing, and IT services. We strive to help businesses leverage technology to enhance their operational efficiency, drive growth, and stay ahead in a fast-paced, ever-evolving digital world.
                </p>

                <h3 class="mt-8 text-2xl font-bold text-gray-900 ">Who We Are</h3>
                <p class="mt-4 text-gray-600 text-medium ">
                    We are a dynamic and agile team with a diverse skill set, ranging from software engineers and web developers to digital marketers and strategic consultants. Our team is dedicated to creating innovative, reliable, and scalable technology solutions tailored to meet the unique needs of each client.
                </p>

                <h3 class="mt-8 text-2xl font-bold text-gray-900 ">What We Do</h3>
                <p class="mt-4 text-medium  text-gray-600">
                    We specialize in providing a wide array of services including:
                </p>
                <ul class="mt-4 text-medium text-gray-600 list-disc list-inside space-y-1">
                    <li>Custom Software Development</li>
                    <li>Web and Mobile Application Development</li>
                    <li>Digital Marketing & SEO</li>
                    <li>Cloud Solutions & IT Infrastructure</li>
                    <li>IT Consulting & Business Strategy</li>
                </ul>

                <h3 class="mt-8 text-2xl font-bold text-gray-900 ">Vision</h3>
                <p class="mt-4 text-medium  text-gray-600">
                    To redefine the future of B2B commerce through smart, secure, and connected digital innovation.
                </p>

                <h3 class="mt-8 text-2xl font-bold text-gray-900 ">Mission</h3>
                <p class="mt-4 text-medium  text-gray-600">
                    To deliver intelligent digital solutions that empower B2B businesses to operate efficiently, scale faster, and create lasting value.
                </p>
                </div>

                <!-- Image / Illustration -->
                <div class="mt-8 md:mt-0">
                <img class="w-full rounded-lg shadow-lg" src="/assets/img/digitalTechLabs/aboutUs.jpg" alt="BtoB.LK Project Banner">
                
                </div>

            </div>
        </section>

        <!-- <section class="px-6 py-16 mx-auto bg-gray-100">
            <aside aria-label="Related articles" class="py-8 lg:py-8 dark:bg-gray-800">
            <div class="max-w-screen-xl px-4 mx-auto">
                <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
                <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mb-5 rounded-lg" alt="Image 1">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first office</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 2 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" class="mb-5 rounded-lg" alt="Image 2">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Enterprise design tips</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 12 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" class="mb-5 rounded-lg" alt="Image 3">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">We partnered with Google</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 8 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" class="mb-5 rounded-lg" alt="Image 4">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first project with React</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 4 minutes
                        </a>
                    </article>
                </div>
            </div>
            </aside>
        </section> -->
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
  component:(Header,Footer),
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
