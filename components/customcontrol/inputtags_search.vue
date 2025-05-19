<!-- Usage:

 <inputtags_search class="w-full" :arrItems="listDistricts"  @GetSelectedIds="GetSelectedOtherDistrictIds" />

import inputtags_search from '~/components/customcontrol/inputtags'

components: {
   inputtags_search
 },

data() {
    return {
      listDistricts:[{id:1,value:'Gampaha'}],
      arrAdditionalDistricts:[],
    }
  },
  methods: {
    GetSelectedOtherDistrictIds(listIds){
      arrAdditionalDistricts=listIds;
    },

}
-->

<template>
  <section>
    <div class="flex flex-wrap h-auto gap-3 py-4 rounded cursor-pointer">
      <div v-for="item in arrSelectedItems" :key="item">
        <tag
          :item="item"
          @deletetag="GetDeleteTag"          
        />
      </div>

      <div class="-mt-4 cursor-pointer">
        <serachInput
          :arrItems="arrItems"
          ref="compSelect"
          label=""
          @selectItem="addItem"
          class="w-48 p-2 border-gray-500 rounded"
        />
      </div>
    </div>
   
   
  </section>
</template>

<script>
import tag from "~/components/customcontrol/tag";
import serachInput from "~/components/customcontrol/SearchInput";

export default {
  props: ["arrItems"],
  components: {
    tag,
    serachInput,
  },
  data() {
    return {
     arrSelectedItems: [],
      arrSelectedIDs: [],
    };
  },
  methods: {
   
    resetItems() {
     
    },
    // addItem(id) {
      
    //   var index = this.arrSelectedItems.findIndex((o) => o.id === id);

    //   if (index == -1) {
    //     let selected_item = this.arrItems.filter((item) => {
    //       return item.id == id;
    //     })[0];

    //     this.arrSelectedItems.push(selected_item);
    //     this.arrSelectedIDs.push(selected_item.id);
       
    //     this.$emit("GetSelectedIds",  this.arrSelectedIDs.slice());
    //   } else {
     
    //      this.$showAlert("Item Already Exisits!", "error");
    //   }
    // },
    addItem(id) {
      if (this.arrSelectedItems.length >= 4) {
        this.$showAlert("Maximum 4 districts can be selected!", "error");
        return;
      }

      var index = this.arrSelectedItems.findIndex((o) => o.id === id);
      if (index == -1) {
        let selected_item = this.arrItems.find((item) => item.id == id);
        this.arrSelectedItems.push(selected_item);
        this.arrSelectedIDs.push(selected_item.id);
        this.$emit("GetSelectedIds", this.arrSelectedIDs.slice());
      } else {
        this.$showAlert("Oops! You’ve already selected this district.", "error");

      }
    },
    GetDeleteTag(id) {
      try {
       
        var index = this.arrSelectedItems.findIndex((o) => o.id === id);
        this.arrSelectedItems.splice(index, 1);
         this.arrSelectedIDs.splice(index, 1);     
        this.$emit("GetSelectedIds",  this.arrSelectedIDs.slice());
        
      } catch (e) {}
      
    },
  },
};
</script>

<style>
.cssbtn:hover {
  @apply transform scale-125 duration-500;
}
</style>
