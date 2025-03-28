<!--
     <serachInput
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
           
           ----###########---------------

         ----########### Index Page value insteed id---------------
              <td
                class="border-grey-light border hover:bg-gray-100 p-3"
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
 -->

<template>
  <div>
    <label v-if="label.indexOf('#') != -1" class="block text-sm text-gray-00">
      {{ label.substring(0, label.indexOf('#')) }}
      <span class="underline font-bold text-blue-300">{{ label.charAt(label.indexOf('#') + 1) }}</span>
      {{ label.substring(label.indexOf('#') + 2, label.length) }}
    </label>
    <label v-if="label.indexOf('#') == -1" class="block text-sm text-gray-00">{{ label }}</label>

    <div v-show="!modal">
      <input type="text" class="w-full px-5 py-1 text-gray-700 bg-white rounded" id="txtItem" :title="Item.value"
        v-model="Item.value" @focus="setfocus" />

      <p class="text-xs ml-1 text-red-700 italic">{{ err }}</p>
    </div>

    <div v-show="modal" class="cssSerach">
      <div>
        <input type="text" class="w-full px-5 py-1 text-gray-700 bg-white rounded" id="txtSearch" v-model="item_serach"
          ref="comp_search" placeholder="Search" @keydown="control($event)" />
      </div>

      <div class="cssSerachedList z-40">

        <div v-for="item in filtered" :key="item.id" v-bind:class="{ cssItemHover: selecteditem == item.id }"
          :title="item.value" @mouseover="mouseover(item)" @click="selectItem(item)" class="overflow-hidden h-8">
          {{ item.value }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['arrItems', 'label', 'err'],

  data() {
    return {
      item_serach: '',
      filtered: [],
      modal: false,
      Item: { id: -1, value: '' },
      selecteditem: -1,
      active_index: -1,
      isInItemList: false,
    }
  },
  mounted() { },
  computed: {},

  methods: {
    setfocus() {
      this.modal = true
      this.$refs.comp_search.focus()
      this.filtered = this.arrItems.slice(0, 30);

    },

    selectItem(selecteditem) {
      this.$emit('selectItem', selecteditem.id)
      this.$emit('input', selecteditem.id)
      this.Item = selecteditem
      this.modal = false
    },
    mouseover(item) {
      this.selecteditem = item.id
    },
    control(evt) {


      if (evt.keyCode == 38) {
        this.isInItemList = true
        if (this.filtered.length > 0 && this.active_index > 0) {
          this.active_index--
          this.selecteditem = this.filtered[this.active_index].id
          // console.log(this.active_index + ':' + this.selecteditem)
        }
      } else if (evt.keyCode == 40) {
        this.isInItemList = true
        if (
          this.filtered.length > 0 &&
          this.filtered.length - 1 !== this.active_index
        ) {
          this.active_index++
          this.selecteditem = this.filtered[this.active_index].id
          //console.log(this.active_index + ':' + this.selecteditem)
        }
      } else if (evt.keyCode == 13) {
        if (!this.isInItemList) {
          this.filtered = this.arrItems
        } else {
          this.selectItem(this.filtered[this.active_index])
        }
      } else if (evt.keyCode == 9 || evt.keyCode == 27) {
        this.modal = false
        this.isInItemList = false
        this.isInItemList = false
        // this.Item = {id:-1,value:''}
      }
    },
    initItem(id) {
      try {
        this.modal = false
        if (id == -1) {
          this.Item = { id: '-1', value: '' }
        } else {
          this.Item = this.arrItems.filter((item) => {
            return item.id == id
          })[0]
        }
      } catch {
        this.Item = this.arrItems[0]
      }
    },
  },
  watch: {
    item_serach(val) {
      this.active_index = -1
      if (val.toLowerCase() == '' || val.toLowerCase() == ' ') {
        this.filtered = this.arrItems
      } else {
        this.filtered = this.arrItems.filter((item) => {
          for (let text in item) {
            if (
              item[text].toString().toLowerCase().indexOf(val.toLowerCase()) >
              -1
            ) {
              return item
            }
          }
        })
      }
    },
  },
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
