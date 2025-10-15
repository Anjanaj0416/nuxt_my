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
        <div class=" flex flex-wrap h-auto gap-3 p-2 rounded cursor-pointer">

            <div class="-mt-4 cursor-pointer">
                <serachInput :arrItems="arrItems" ref="compSelect" label="" @selectItem="addItem"
                    class="w-full p-2 border-gray-500 rounded" />
            </div>
            <div v-for="item in arrSelectedItems" :key="item.id">
                <tag :item="item" @deletetag="GetDeleteTag" />
            </div>
        </div>
    </section>
</template>

<script>
import tag from "~/components/customcontrol/tag";
import serachInput from "~/components/customcontrol/SearchInput";

export default {
    props: {
        arrItems: {
            type: Array,
            default: () => [],
        },
    },
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
    // created() {
    //     console.log("arrItems in inputtags_search:", this.arrItems);
    // },
    methods: {
        resetItems() {
            this.arrSelectedItems = [];
            this.arrSelectedIDs = [];
            this.$emit("GetSelectedIds", this.arrSelectedIDs);
        },
        addItem(item) {
            if (!item || !item.id) return;

            const index = this.arrSelectedItems.findIndex((o) => o.id === item.id);
            if (index === -1) {
                this.arrSelectedItems.push(item);
                this.arrSelectedIDs.push(item.id);
                this.$emit("GetSelectedIds", [...this.arrSelectedIDs]);
            } else {
                this.$showAlert("Item already exists!", "error");
            }
        },
        GetDeleteTag(id) {
            const index = this.arrSelectedItems.findIndex((o) => o.id === id);
            if (index !== -1) {
                this.arrSelectedItems.splice(index, 1);
                this.arrSelectedIDs.splice(index, 1);
                this.$emit("GetSelectedIds", [...this.arrSelectedIDs]);
            }
        },
    },
};
</script>

<style>
.cssbtn:hover {
    @apply transform scale-125 duration-500;
}
</style>
