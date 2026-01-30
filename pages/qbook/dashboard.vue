<template>
  <section class="">
    <P >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia sint pariatur aliquid consequuntur ad mollitia debitis ea, quibusdam perspiciatis accusantium quisquam eveniet tempore adipisci, error voluptas velit! Voluptates, corporis voluptas.</P>
  </section>
</template>

  
<script>

  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import { useUserStore } from '~/stores/modules/userStore';


  definePageMeta({
    layout: 'qbooklogin',   
    // middleware: 'auth',
    middleware: 'auth-ebook',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
     
      
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

  </style>
  
  
  