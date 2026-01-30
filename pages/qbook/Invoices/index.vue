<template>
  <section >
    <div class="text-2xl text-bolt">Invoices</div>
    <div class="mt-6 mb-2 flex flex-col gap-4 rounded-xl order bg-white  md:flex-row md:items-center md:justify-between">
        <!-- Left Content -->
        <div class="flex items-center gap-3">
        </div>
        <div>
            <button
                @click="GoToAddNew"
                type="button"
                class="group inline-flex items-center gap-2 rounded-lg bg-[#bbd151] px-5 py-2.5 text-sm font-medium text-black" 
            >
            <svg class="h-4 w-4 transition group-hover:rotate-90" fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Invoice
            </button>
        </div>
    </div>
    <AddInvoice v-if="isAddInvoice" @close="isAddInvoice = false" />
  </section>
</template>

  
<script>

  import LinkBtn from "~/components/customcontrol/Link"; 
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import AddInvoice from "~/components/Q-Book/Invoice/addInvoice.vue";

  definePageMeta({
    layout: 'qbooklogin',   
    // middleware: 'auth-ebook',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,AddInvoice},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddInvoice: false,
      }
    },
    async mounted() {
     
    },
    async created() {
     
      this.showLoading = this.$showLoading;
     
      
    },
    watch: {},
    computed: {
  
    },
    methods: {
        GoToAddNew() {
      this.isAddInvoice = true;
    },
     
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

  </style>
  
  
  