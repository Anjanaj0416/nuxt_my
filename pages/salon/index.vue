<template>
  <section class="bg-center"
    :style="{ backgroundImage: `url('https://img.freepik.com/free-photo/hairdresser-taking-care-her-client_23-2149319778.jpg?t=st=1743669130~exp=1743672730~hmac=0a32416ff73f9fa5a24c78f1cab9c9f0628394e68ff9afaf71eefa29f56ce29b&w=996')` }">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
      <div class="mr-auto place-self-center lg:col-span-8 ">
        <h1
          class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl dark:text-white">
          Saloon</h1>
        <p class="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout fff
          to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>

        <div class="grid grid-cols-1 gap-6 p-6 bg-white shadow-lg md:grid-cols-4 rounded-xl">
          <!-- District Dropdown -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Select District</label>
            <select v-model="district"
              class="w-full p-2 mt-1 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Choose a District</option>
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
            </select>

          </div>

          <!-- City Dropdown -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Select City</label>
            <select v-model="city"
              class="w-full p-2 mt-1 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Choose a City</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
            </select>
          </div>

          <!-- Keyword Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Keyword Search</label>
            <div class="">
              <input type="text" id="simple-search"
                class="w-full p-2 mt-1 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search branch name..." required />
            </div>
          </div>

          <div>
            <div class="mt-5">
              <button type="button"
                class="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm w-full py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


definePageMeta({
  layout: 'cat',
  // middleware: 'auth',
});

export default {

  components: {},
  props: [''],
  data() {
    return {
      salons: [
        {
          name: 'Liyo Salon',
          offer: 'Special Offer 10%',
          address: 'No 06 Pagoda Rd, Nugegoda',
          contactNumber: '077 388 5122',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6O1_kUnFq-CfffvDJQ1fyXkxOwLQyfwY3Q&s',
          link: '#',
          openingHours: { open: '8:00 AM', close: '5:00 PM' }
        },
        {
          name: 'Salon Zero',
          offer: '20% off on your first visit',
          address: 'No 15 High St, Colombo',
          contactNumber: '071 123 4567',
          imageUrl: 'data:image/png;base64,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',
          link: '#',
          openingHours: { open: '9:00 AM', close: '6:00 PM' }
        },
        {
          name: 'Naturals Unisex Salon',
          offer: 'Free consultation',
          address: 'No 45 Main St, Kandy',
          contactNumber: '077 234 5678',
          imageUrl: 'https://static.wixstatic.com/media/592b9f_12c9bb5996d0452fb5cc882b456dd3d8~mv2.png/v1/fit/w_2500,h_1330,al_c/592b9f_12c9bb5996d0452fb5cc882b456dd3d8~mv2.pngg',
          link: '#',
          openingHours: { open: '8:30 AM', close: '5:30 PM' }
        },
        {
          name: 'TONI&GUY Sri Lanka',
          offer: '10% off for first-time customers',
          address: 'No 28 Lake View Rd, Galle',
          contactNumber: '078 345 6789',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8LeW5XH1ckW-5xUeiSMDraT-4PU5Kb2W8A&s',
          link: '#',
          openingHours: { open: '8:00 AM', close: '5:00 PM' }
        },
        {
          name: 'Trendy Cuts',
          offer: 'Buy one, get one free on haircuts',
          address: 'No 22 Park St, Negombo',
          contactNumber: '079 456 7890',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6O1_kUnFq-CfffvDJQ1fyXkxOwLQyfwY3Q&s',
          link: '#',
          openingHours: { open: '9:00 AM', close: '7:00 PM' }
        },
        {
          name: 'Salon Chic',
          offer: 'Free hair treatment with any styling',
          address: 'No 32 Beach Rd, Matara',
          contactNumber: '071 567 8901',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6O1_kUnFq-CfffvDJQ1fyXkxOwLQyfwY3Q&s',
          link: '#',
          openingHours: { open: '8:00 AM', close: '5:00 PM' }
        },
        {
          name: 'Glow Salon',
          offer: '25% off on all beauty services',
          address: 'No 19 River Rd, Anuradhapura',
          contactNumber: '078 678 9012',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6O1_kUnFq-CfffvDJQ1fyXkxOwLQyfwY3Q&s',
          link: '#',
          openingHours: { open: '9:00 AM', close: '6:00 PM' }
        },
        {
          name: 'Prime Salon',
          offer: 'Exclusive Membership Deals',
          address: 'No 14 Kings Rd, Jaffna',
          contactNumber: '077 789 0123',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6O1_kUnFq-CfffvDJQ1fyXkxOwLQyfwY3Q&s',
          link: '#',
          openingHours: { open: '8:30 AM', close: '5:30 PM' }
        }
      ]
    };
  },

  async mounted() {

  },
  async created() {
    //this.sampleStore = useSampleStore();
  },
  watch: {},
  computed: {
  },
  methods: {
  },
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
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>