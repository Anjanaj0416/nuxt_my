<!-- Usage
  <template>
  <section class="p-4 mt-32">
      <p> Search Product  N Services</p>
       <dynamicserachInput class="w-64" :arrItems = "alPS" label="PNS"  :err = "err.classname" @selectedItem="PnSSelected" @LoadItems="getLoad"/>
  </section>  
</template>

<script>
import dynamicserachInput from '~/components/customcontrol/dynamicserachInput'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    dynamicserachInput,
  },
  data() {
    return {    
   
    }
  },
  mounted() {},
  computed: {
    ...mapState({        
        alPS: (state) => state.reservedaddetail.InitData.alPS,               
    }),
 },

  methods: {
    ...mapActions({     
     getProductnServericsClassifications:'reservedaddetail/getProductnServericsClassifications',
    }),

    async getLoad(searchstring) {      
      await this.getProductnServericsClassifications({"param":searchstring})
    },

    PnSSelected(selecteditem){
      console.log(selecteditem)
    } 
  },
  watch: {},
}
</script>

<style scoped>
</style>



       
 -->

<template>
  <div>
    <label v-if="label.indexOf('#') != -1" class="block text-sm text-gray-00">
      {{ label.substring(0, label.indexOf('#')) }}
      <span class="underline font-bold text-blue-300">{{
        label.charAt(label.indexOf('#') + 1)
      }}</span>
      {{ label.substring(label.indexOf('#') + 2, label.length) }}
    </label>
    <label v-if="label.indexOf('#') == -1" class="block text-sm text-gray-00">{{
      label
    }}</label>

    <div class="cssSerach">
      <div>
        <input type="text" title="type search keyword and press enter"
          class="w-full px-5 py-1 text-gray-700 bg-gray-400 rounded" id="txtSearch" v-model="Item.value"
          ref="comp_search" placeholder="Search - Press Enter" @blur="hideList" @click="isshowlist = true"
          @keypress.enter="Loadvalues(Item.value)" />

        <p class="text-xs ml-1 text-red-700 italic">{{ err }}</p>
      </div>
      <div class="cssSerachedList mt-1 z-40" v-show="isshowlist" @mouseleave="isshowlist = false">

        <div v-for="item in arrItems" :key="item.id" v-bind:class="{ cssItemHover: selecteditem == item.id }"
          :title="item.value" @mouseover="isOnList = true" @mouseleave="isOnList = false" @click="selectItem(item)"
          class="truncate h-8 text-black">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['arrItems', 'label', 'err'],

  data() {
    return {
      Item: { id: -1, value: '' },
      selecteditem: -1,
      isshowlist: false,
      isOnList: false,
    }
  },
  mounted() { },
  computed: {},

  methods: {
    selectItem(selecteditem) {
      this.Item = selecteditem
      this.isshowlist = false
      this.$emit('selectedItem', selecteditem)
    },
    mouseover(item) {
      this.selecteditem = item.id
    },

    hideList() {
      if (!this.isOnList) this.isshowlist = false
    },

    Loadvalues(val) {
      this.err = ''
      if (val.length > 2) {
        this.$emit('LoadItems', val)
        this.isshowlist = true
      } else {
        this.err = 'Input atleast three leters for search.. '
      }
    },
  },
  watch: {},
}
</script>

<style scoped>
.csslbl:hover {
  cursor: pointer;
}

.cssSerach {
  position: relative;
}

.cssSerachedList {
  @apply bg-green-300;

  max-height: 200px;
  overflow: scroll;
  scrollbar-width: thin;
  z-index: 999;
  position: absolute;
  width: 100%;
}

.cssSerachedList>div {
  color: white;
  list-style: none;
  text-align: left;
  @apply pl-2;
  @apply border-b-2;
  @apply border-white;
}

.cssSerachedList>div:hover {
  cursor: pointer;
  @apply text-white;
  @apply bg-blue;
}

.cssItemHover {
  @apply text-green;
  @apply bg-blue;
}
</style>
