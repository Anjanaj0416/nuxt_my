<template>
  <div class="px-2 py-0 flex flex-col gap-0 items-center bg-blue-50">
    <div class="relative w-full max-w-6xl">
      <input
        v-model="localSearchTerm"
        type="text"
        :placeholder="t('searchPlaceholder')"
        class="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        @click="handleSearch"
        class="absolute inset-y-0 right-0 flex items-center px-4 bg-blue-400 hover:bg-blue-700 text-white rounded-r-lg"
      >
        {{ t('search') }}
      </button>
    </div>
  </div>
</template>
<script setup>
    /* const searchTerm = ref('');

    defineProps({
        modelValue: {
        type: String,
        default: ''
        }
    }); */

    import { useI18n } from 'vue-i18n'
    import { useShopStore } from '@/stores/modules/Q-Appts/shops'
    const store = useShopStore()
  
  /* const localSearchTerm = computed({
  get: () => store.searchTerm,
  set: (val) => store.setSearchTerm(val)
  }) */

  const localSearchTerm = ref('')
  const { t } = useI18n()

  const handleSearch = () => {
  store.searchTerm = localSearchTerm.value
  store.setSelectedDistance('')
  store.setSelectedAvailability('')
  store.setSelectedGenders([])
  //store.setSelectedDistrict('')
  store.setSelectedCity('')
  localSearchTerm.value = ''
  
   
  //store.loadData() // Or whatever method triggers fetching

    /*  <serachInput
                  :arrItems="alCatItems"
                  ref="catcomp"
                  label="Category"
                  :err="err.categoryid"
                  v-model="category_id"
                   @selectItem=""
                />
          import serachInput from '~/components/customcontrol/serachInput'
           components: { serachInput },
          data() {
            return {
            alCatItems:[
            {id:'1',value:'cat1' },
            {id:'2',value:'cat2' },
            {id:'3',value:'cat3' },
            {id:'4',value:'cat4' },
            ],
            category_id:4,
            }    ,
            err:{
              categoryid:'',
            },
          },
       
         ----###########--------------- 
         component method call and data assign
         formValidate -     //this.$refs.catcomp.err = this.err.categoryid
          setNew.. -  //this.$refs.catcomp.initCategoryItem(-1)
          setEdit.. -  // this.$refs.catcomp.initItem(inventory.itemid)
          
           mounted() {
            this.$refs.catcomp.initItem(inventory.itemid)
            },
           ----###########---------------
         ----########### Index Page value insteed id---------------
              <td
                class="p-3 border border-grey-light hover:bg-gray-100"
              >{{getcategoryName(producttype.categoryid)}}</td>
      ----###########--------------
       computed: {  
    getcategoryName() {
      return (catid) => {
        try {
          return this.alCatItems.filter((item) => {
            return item.id == catid
          })[0].value
        } catch {
          return ''
        }
      }
    },
 */
}

</script>
<style scoped>
</style>