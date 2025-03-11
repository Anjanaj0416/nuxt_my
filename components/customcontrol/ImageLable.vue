
<!-- usage

import ImageLable from "~/components/customcontrol/ImageLable";
components: {
  ImageLable,
}
<ImageLable :imageUrl=""  alt=""  />           -->


<template>
  <section class="">
    
    
    <a :href="imageUrl" target="_blank">
                      <img 
                        :src="imageUrl" 
                        :alt="alt" 
                        class="object-cover w-16 h-16 rounded-md"
                        :title="title"
                      />
                    </a>
  </section>
</template>

  
  <script>
 
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {},
    props: [ 'imageUrl', 'alt','title'],
    data() {
      return {
     
      }
    },
    async mounted() {},
    watch: {},
    computed: {
    
    },
    methods: {
      
    },
    async beforeMount() {
      
  
    },
    
  }
  
  
  </script>
  

  <style scoped>

</style>

  
  
  