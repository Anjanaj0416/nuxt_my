<template>
    <section>
        <!-- header -->

        <Header/>
          <section class="px-6 py-16 mx-auto max-w-7xl">
            <div class="max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">

            <!-- Text Content -->
            <div>
                <h2 class="mb-4 text-3xl  font-extrabold tracking-tight text-gray-900">Careers at Digital TechLabs</h2>
                <p class="text-lg text-gray-700 leading-relaxed">
                Join the <span class="font-semibold text-blue-600">Digital Future</span> with Digital TechLabs (Pvt) Ltd.  
                We’re more than just a tech company — we’re a team of innovators, creators, and problem-solvers shaping the future of digital solutions in Sri Lanka and beyond.
                </p>

                <p class="mt-6 text-gray-600">
                We’re always looking for passionate, collaborative, and ambitious individuals who want to grow with us.
                </p>

                <!-- Why Work With Us -->
                <div class="mt-10">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h3>
                <ul class="space-y-3">
                    <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">✔</span>
                    <span><strong>Innovative Projects:</strong> Work on AI, cloud, automation & e-commerce platforms.</span>
                    </li>
                    <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">✔</span>
                    <span><strong>Growth Opportunities:</strong> Mentoring, training & hands-on experience.</span>
                    </li>
                    <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">✔</span>
                    <span><strong>Flexible Culture:</strong> Creativity, collaboration & work-life balance.</span>
                    </li>
                    <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">✔</span>
                    <span><strong>Impactful Work:</strong> Help businesses thrive in a digital-first world.</span>
                    </li>
                </ul>
                </div>

                <!-- Current Openings -->
                <div class="mt-10">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">🚀 Current Openings</h3>
                <div class="space-y-4">
                    <div class="p-5 bg-white rounded-lg border shadow hover:shadow-md transition">
                    <h4 class="text-lg font-semibold text-gray-800">Sales Executive (Example)</h4>
                    <p class="text-gray-600 mt-1">Experience: 2+ years | Location: Colombo / Remote</p>
                    <a href="mailto:hr@dtl.lk" class="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        Apply Now
                    </a>
                    </div>
                </div>
                </div>

                <!-- Apply Instructions -->
                <div class="mt-10 border-t pt-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">📩 How to Apply</h3>
                <p class="text-gray-600">
                    Send your CV and portfolio (if applicable) to:  
                    <a href="mailto:hr@dtl.lk" class="text-blue-600 font-medium hover:underline">hr@dtl.lk</a><br>
                    <span class="italic text-sm">Subject line: [Position] Application – [Your Name]</span>
                </p>
                </div>
            </div>

            <!-- Image / Banner -->
            <div class="mt-8 md:mt-0">
                <img class="w-full rounded-lg shadow-lg" src="https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15860.jpg?w=740&t=st=1743160714~exp=1743164314~hmac=example" alt="Careers at Digital TechLabs">
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
