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
 -->


<template>
  <div>
   
    <label v-if="label" :for="modal ? 'txtSearch' : 'txtItem'" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div v-show="!modal">
      <input type="text"
        class="w-full p-2 mt-2 text-sm text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        id="txtItem" :title="Item.value || ''" v-model="Item.value" @focus="setfocus" placeholder="Search...." />
      <!-- {{ filtered }}
    zz  {{ Item.value }} -->
      <p class="ml-1 text-xs italic text-red-700">{{ err }}</p>
    </div>

    <div v-show="modal" class="cssSerach">
      <div>
        <input type="text"
          class="w-full p-2 mt-2 text-sm text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          id="txtSearch" v-model="item_serach" ref="comp_search" placeholder="Search...." @keydown="control($event)" />
        <!-- pp  {{ Item.value }} -->
        <!-- Search Icon -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-2 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="z-40 cssSerachedList">
        <div v-for="item in filtered" :key="item.id" v-bind:class="{ cssItemHover: selecteditem == item.id }"
          :title="item.value" @mouseover="mouseover(item)" @click="selectItem(item)"
          class="h-auto p-2 text-sm overflow-hidden hover:bg-blue-900 hover:text-white cursor-pointer transition-colors duration-200 ease-in-out">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["arrItems", "label", "err","exisitngId"],

  data() {
    return {
      item_serach: "",
      filtered: [],
      modal: false,
      Item: { id: -1, value: "" }, // Always defined
      selecteditem: -1,
      active_index: -1,
      isInItemList: false,
    };
  },

  watch: {
    arrItems: {
      handler(newItems) {
        // Update the filtered list when arrItems change
        if (this.item_serach.trim() === "") {
          this.filtered = newItems;
        } else {
          this.filtered = newItems.filter((item) => {
            return Object.values(item).some((val) =>
              val
                .toString()
                .toLowerCase()
                .includes(this.item_serach.toLowerCase())
            );
          });
        }

        // Also update the Item if it's already selected by id,
        // but ensure Item is always an object with .value
        if (this.Item.id !== -1) {
          const match = newItems.find((item) => item.id == this.Item.id);
          this.Item = match ? match : { id: -1, value: "" };
        }
      },
      deep: true,
      immediate: true,
    },

    item_serach(val) {
      this.active_index = -1;
      if (val.toLowerCase() == "" || val.toLowerCase() == " ") {
        this.filtered = this.arrItems;
      } else {
        this.filtered = this.arrItems.filter((item) => {
          for (let text in item) {
            if (
              item[text].toString().toLowerCase().indexOf(val.toLowerCase()) >
              -1
            ) {
              return item;
            }
          }
        });
      }
    },      
      exisitngId: {
    handler(id) {
     this.initItem(id)     
    },
    immediate: true 
  }

  },

  methods: {
    setfocus() {
      this.modal = true;
      this.$refs.comp_search.focus();
      this.filtered = this.arrItems.slice(0, 30);
    },

    selectItem(selecteditem) {
      
      this.$emit("selectItem", selecteditem);
      this.$emit("input", selecteditem.id);
      this.Item = selecteditem;
      this.modal = false;
    },

    mouseover(item) {
      this.selecteditem = item.id;
    },

    control(evt) {
      if (evt.keyCode == 38) {
        this.isInItemList = true;
        if (this.filtered.length > 0 && this.active_index > 0) {
          this.active_index--;
          this.selecteditem = this.filtered[this.active_index].id;
        }
      } else if (evt.keyCode == 40) {
        this.isInItemList = true;
        if (
          this.filtered.length > 0 &&
          this.filtered.length - 1 !== this.active_index
        ) {
          this.active_index++;
          this.selecteditem = this.filtered[this.active_index].id;
          console.log(this.active_index + ":" + this.selecteditem);
        }
      } else if (evt.keyCode == 13) {
        if (!this.isInItemList) {
          this.filtered = this.arrItems;
        } else {
          this.selectItem(this.filtered[this.active_index]);
        }
      } else if (evt.keyCode == 9 || evt.keyCode == 27) {
        this.modal = false;
        this.isInItemList = false;
      }
    },

    initItem(id) {
      try {
        this.modal = false;
        if (id == 0) {
          this.Item = { id: "-1", value: "" };
        } else {
          const found = this.arrItems.find((item) => item.id == id);
          this.Item = found ? found : { id: -1, value: "" };
        }
      } catch {
        this.Item = { id: -1, value: "" };
      }
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.modal = false; // Close the dropdown when clicked outside
      }
    },
  },

  mounted() {
    // Add a global click event listener
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeDestroy() {
    // Clean up the event listener
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.csslbl:hover {
  cursor: pointer;
}

.cssSerach {
  position: relative;
}

.cssSerachedList {
  background-color: #d1d5db;
  /* Tailwind bg-gray-300 equivalent */

  max-height: 200px;
  overflow: scroll;
  scrollbar-width: thin;
  z-index: 999;
  position: absolute;
  width: 100%;
}

.cssSerachedList>div {
  list-style: none;
  text-align: left;
  padding-left: 0.5rem;
  border-bottom: 2px solid white;
  background-color: #f3f4f6;
  /* Tailwind bg-gray-100 */
  color: black;
}

.cssSerachedList>div:hover {
  cursor: pointer;
  color: white;
  background-color: #3b82f6;
  /* Tailwind bg-btn, assuming blue */
}

.cssItemHover {
  color: #3b82f6;
  background-color: #3b82f6;
}
</style>
