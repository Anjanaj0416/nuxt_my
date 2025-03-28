<!-- Usage
  <template>
  <section class="p-4 mt-32">
      <p> Search Product  N Services</p>
      <dynamicserachInput2
                class=""
                :arrItems="arraccountnos"
                label="AccountNo"
                :err="err.accounno"
                :Item="cheque.accounno"
                v-model="cheque.accounno"
                @LoadItems="getAccountnos"
                @changeValidation="changeValidation"
                title_text="Acc.No."
                length="3"
                @selected="AccountnoSelected"
                @setclear="setclear"
                :mode="mode"
                 ref="refaccounno"
              />
  </section>  
</template>

<script>
import dynamicserachInput2 from '~/components/customcontrol/dynamicserachInput2'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['arrItems','Item', 'label', 'err','length','title_text','mode'],
  components: {
    dynamicserachInput2,
  },
  data() {
    return {    
   ismodeedit : false,
    err: {
        accounno: '',
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState({        
        arraccountnos: (state) => state.cheque.arraccountnos,
    }),
     mode() {      
      return  this.ismodeedit ? 'edit' : 'view'
    },
 },

  methods: {
    ...mapActions({     
      getLoadAccountnos: 'cheque/getLoadAccountnos',
    }),

     async getAccountnos(searchval) {
      await this.getLoadAccountnos({ searchval: searchval })
    },


      AccountnoSelected(value) {      
      this.cheque.accounno = value.split('|')[1].trim()
      this.$refs.refaccounno.value = this.cheque.accounno
       this.$refs.refcustomer.setclear();
    },

     formValidate() {
           this.cheque.accounno = this.$refs.refaccounno.value;
       },
      
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
        <input type="text" :title="title_text + ' ,type search keyword and press enter'"
          class="w-full px-5 py-1 text-gray-700 bg-gray-400 rounded" id="txtSearch" v-model="value" ref="comp_search"
          placeholder="Search - Press Enter" @blur="hideList" @click="isshowlist = true" @keypress.enter="Loadvalues()"
          @keyup="settypevalue($event.target.value)" :class="(mode == 'view') ? 'cssview' : 'cssedit'" />




        <p class="text-xs ml-1 text-red-700 italic">{{ err }}</p>
      </div>
      <div class="cssSerachedList mt-1 z-40" v-show="isshowlist" @mouseleave="isshowlist = false">
        <div v-for="item in arrItems" :key="item" v-bind:class="{ cssItemHover: selecteditem == item }" :title="item"
          @mouseover="isOnList = true" @mouseleave="isOnList = false" @click="selectItem(item)" class="truncate h-8">
          {{ item.value }}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['arrItems', 'Item', 'label', 'err', 'length', 'title_text', 'mode'],

  data() {
    return {
      value: '',
      selecteditem: -1,
      isshowlist: false,
      isOnList: false,
    }
  },
  mounted() {
    this.selecteditem = this.Item
    this.value = this.Item
  },
  computed: {},

  methods: {
    selectItem(selecteditem) {
      this.Item = selecteditem
      this.value = selecteditem.value
      this.isshowlist = false
      this.$emit('input', selecteditem.value)
      this.$emit('selected', selecteditem)
      this.$emit('changeValidation', { label: this.label, value: this.value })
    },
    // mouseover(item) {
    //   this.selecteditem = item
    // },
    setclear() {
      this.$emit('input', '')
      this.value = ''
    },
    hideList() {
      this.$emit('changeValidation', { label: this.label, value: this.value })
      if (!this.isOnList) this.isshowlist = false
    },
    settypevalue(val) {
      this.value = val
    },
    Loadvalues() {
      this.err = ''
      let val = this.value.trim()
      if (val.length > this.length) {
        this.$emit('LoadItems', val)
        this.isshowlist = true
      } else {
        this.err = 'Input atleast ' + this.length + ' letters for search.. '
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

.cssview {
  @apply bg-transparent text-white;
}

.cssedit {
  @apply bg-white;
}
</style>
