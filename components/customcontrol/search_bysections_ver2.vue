<!--
## usage -
----------------------------------------------------------------------
 <search_bysections_ver2 :arrsections="arrsections"  @getsearch="search_begin"/>


 <script>
 import search_bysections_ver2 from '~/components/tailwindcomp/search_bysections_ver2'

export default {
 components: {
     search_bysections_ver2
 },
  data() {
    return {
     arrsections: [
        { name: 'empname',code:501, selected: true },
        { name: 'empno',code:502, selected: false },
        { name: 'contact',code:503, selected: false },
        { name: 'supervisor',code:504, selected: false },
        { name: 'email',code:505, selected: false },
      ],
    }
  },

  methods: {
        search_begin(req){
      console.log(req);

    }
  },

}

-->

<template>
  <article>
    <div class="relative">
      <div class="flex p-2 bg-white border-gray-500 rounded" title="Search">
        <div class="w-full px-2 ">
          <input :placeholder="placeholder" type="text" class="text-sm text-black focus:outline-none"
            v-model="search_val" @keyup="isopened = true" />
          <!-- @keydown.enter="search_begin" -->
        </div>
        <!-- <div
          class="flex content-center px-1 text-white bg-gray-600 rounded-l-none rounded-r cursor-pointer "
            @click="search_begin"
        > -->
        <button type="submit"
          class="px-4 py-2 ml-2 text-sm text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="search_begin">
          Search
        </button>
        <!-- </div> -->
      </div>

      <div class="absolute z-50 w-full p-2 py-2 text-sm text-gray-600 bg-white border-gray-500 rounded"
        v-show="isopened && search_val != ''">
        <div class="absolute top-0 right-0 flex gap-2 mt-2 mr-1">
          <roundedbtn_refresh class="w-6" title="Refresh Options" @onclick="clear" />
          <roundedbtn_close class="w-6" title="close Options" @onclick="isopened = false" />
        </div>
        <div class="flex py-1 cursor-pointer hover:bg-blue-300" v-for="section in arrsections" :key="section"
          @click="sec_select(section)">
          <div class="flex items-center w-8">
            <input name="chksearchtype" type="radio" :id="section.name" :checked="section.selected"
              class="text-blue-600 rounded-full form-radio" />
          </div>
          <div class="flex items-center pl-2">
            {{ section.name }}
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
  components: { roundedbtn_refresh, roundedbtn_close },
  props: ['arrsections', 'placeholder'],
  data() {
    return {
      selectedsec: '',
      isopened: false,
      search_val: '',
      serach_id: 100,
    }
  },
  methods: {
    sec_select(section) {
      //reset all
      this.arrsections.forEach(function (sec) {
        sec.selected = false
      });
      section.selected = true;
      this.serach_id = section.code
    },

    search_begin() {

      // console.log( {searchby:this.serach_id,searchval : this.search_val });
      this.$emit('getsearch', { searchby: this.serach_id, searchval: this.search_val })
      this.isopened = false
    },

    clear() {
      let cnt = 0;
      try {
        this.arrsections.forEach(function (sec) {
          sec.selected = (cnt == 0) ? true : false
          cnt++
        });
        this.search_val = ''

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
