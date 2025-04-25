<!--
## usage -
----------------------------------------------------------------------
 <search_bysections :arrsections="arrsections" :arrDateRange="arrDateRange" @getsearch="search_begin"/>

 <script>
import search_bysections from '~/components/tailwindcomp/search_bysections'
export default {
 components: {
search_bysections
 },
  data() {
    return {
      arrsections: [
        { name: 'Orderidno', selected: false },
        { name: 'Expired', selected: false },
        { name: 'Renew Soon', selected: true },
        { name: 'Renew', selected: false },
        { name: 'SSL', selected: false },
      ],
      arrDateRange: [
        { section: 'SSL Date', from: '2021-11-01', to: '2021-11-30' },
        { section: 'Domain', from: '2021-11-10', to: '2021-12-04' },
      ],
    }
  },

   methods: {
    search_begin(req){
      console.log(req);

    }

  },

-->

<template>
  <article>
    <div class="w-auto relative">
      <div class="border-gray-500 rounded p-2 bg-white rounded flex" title="Search">
        <div class="px-2 w-full">
          <input
            :placeholder="placeholder"
            type="text"
            class="focus:outline-none"
            v-model="search_val"
            @keyup="isopened=true"
            @keydown.enter="search_begin"
            @mouseover="isopened=true"

          />
        </div>
        <div
          class="
            bg-gray-600
            px-1
            rounded-r rounded-l-none
            text-white
            flex
            content-center
            cursor-pointer"
            @click="search_begin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"

          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div class="rounded border-gray-500 rounded p-2 py-2 text-sm text-gray-600 absolute w-full  bg-white z-50" v-show="isopened && search_val!=''">
         <div class="mr-1 mt-2 absolute top-0 right-0 flex gap-2">
           <roundedbtn_refresh class="w-6" title="Refresh Options"  @onclick="clear"/>
           <roundedbtn_close class="w-6" title="close Options"  @onclick="isopened=false"/>
         </div>
        <div
          class="flex cursor-pointer py-1 hover:bg-blue-300"
          v-for="section in arrsections"
          :key="section"
          @click="sec_select(section)"
        >
          <div class="w-8">
            <input
              type="checkbox"
              :id="section.name"
              @change="sec_select(section)"
              :checked="section.selected"
            />
          </div>
          <div>{{ section.name }}</div>
        </div>

        <div class="p-1" v-show="arrDateRange.length > 0">
          <div class="linebrake" />
          <div v-for="dr in arrDateRange" :key="dr" class="mt-2">
            <div>{{ dr.section }}</div>
            <div class="flex gap-4">
              <div class="w-1/2">
                From <input id="from" type="date" v-model="dr.from" class="border-gray-500 rounded p-2 rounded" />
              </div>
              <div class="w-1/2">
                To <input id="to" type="date" v-model="dr.to" class="border-gray-500 rounded p-2 rounded"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </article>
</template>

<script>
import roundedbtn_refresh from '~/components/customcontrol/roundedbtn_refresh'
import roundedbtn_close from '~/components/customcontrol/roundedbtn_close'

export default {
  components:{roundedbtn_refresh,roundedbtn_close},
  props:['arrsections','arrDateRange','placeholder'],
  data() {
    return {
      selectedsec: '',
      isopened:false,
      search_val:'',
    }
  },
  methods: {
    sec_select(section) {
      section.selected = !section.selected
    },
    search_begin(){

     // console.log( {arrsections:this.arrsections,arrDateRange : this.arrDateRange,searchval : this.search_val });
     this.$emit('getsearch',{arrsections:this.arrsections,arrDateRange : this.arrDateRange,searchval : this.search_val })
     this.isopened=false
    },

    clear(){
        try{
          this.arrsections.forEach(function(sec){
           sec.selected=false
          });
          this.arrDateRange.forEach(function(dr){
           dr.from=''
           dr.to=''
          });
        } catch (error) {
          
          return ''
        }

    },


  },
}
</script>

<style scoped>
input {
  width: 100%;
}

.linebrake {
  box-shadow: 0 0 0 1px rgba(66, 153, 225, 0.5);
}
</style>
