<!-- Usage:

 <inputtags class="w-full" :list="arrcustomer" :istageditable=true/>

import inputtags from '~/components/tailwindcomp/inputtags'

components: {
   inputtags
 },

data() {
    return {
       arrcustomer:[{value:'Damith Manage'},{value:'Sanjaya Pradeep'},{value:'Sarath Alponsu'},{value:'dimupthu lakruwan'},{value:'anjana amarakoon'},{value:'dimuthu'}],
    }
  },

-->


<template>
  <section>
    <div class="
        border-gray-500 rounded p-2
        border-2 border-SID-blue
        bg-SID-blue
        rounded
        px-3
        py-4
        cursor-pointer
        flex flex-wrap
        h-auto
        gap-3
      ">


      <div class="cursor-pointer">
        <!-- <input
          class="w-full text-white bg-transparent rounded-lg px-1"
          type="text"
          v-model="inputvalue"
          @keypress.enter="addItem($event.target.value)"
        /> -->

        <serachInput :arrItems="arrItems" ref="compSelect" label="" v-model="inputvalue" @selectItem="addItem"
          class="w-48 border-gray-500 rounded p-2 rounded" />
      </div>

      <div v-for="item in arrSelectedItems" :key="item">

        <tag :value="item.value" @deletetag="deletetag" :istageditable="false" />
      </div>
    </div>
  </section>
</template>

<script>
import tag from "~/components/customcontrol/tag";
import serachInput from "~/components/customcontrol/SearchInput";

export default {
  props: ['arrSelectedItems', 'arrItems'],
  components: {
    tag,
    serachInput,
  },
  data() {
    return {
      inputvalue: '',
      list: [],
    }
  },
  created() {
    // console.log("created.arrSelectedItems:", this.arrSelectedItems);

    if (!this.arrSelectedItems || this.arrSelectedItems.length === 0) {
      this.arrSelectedItems = [];
    }
  },
  methods: {
    // selectValue(id){
    //    this.inputvalue= id
    //     this.list.push({ value: this.inputvalue })
    // },
    resetItems() {
      this.list = []
    },
    addItem(item) {
      console.log("addItem:", item);
      console.log("this.arrSelectedItems:", this.arrSelectedItems);


      if (this.arrSelectedItems.length === 0) {
        console.log('ok');

        this.arrSelectedItems.push(item)
        console.log("after arrSelectedItems:", this.arrSelectedItems);
      } else {
        console.log('not ok');
        var index = this.arrSelectedItems.findIndex((i) => i.id == item.id)
        console.log("index:", index);

        if (index == -1) {
          // let selected_item = this.arrItems.filter((item) => {
          //   return item.id == id
          // })[0]

          // this.list.push({ value: item.value })
          this.arrSelectedItems.push(item)

        } else {
          alert('Item Already Exist')
        }

      }

    },
    deletetag(tagval) {

      try {
        //var arr =   this.list.filter(function(item){
        //  if(item.value == tagval)  return item
        //});

        let delitem = this.arrItems.filter((item) => {
          return item.value == tagval
        })[0]

        var index = this.arrSelectedItems.findIndex((o) => o.id === delitem.id)
        this.arrSelectedItems.splice(index, 1)

        this.list.forEach((item, i) => {
          if (item.value == tagval) this.list.splice(i, 1)
        })

        //this.list.splice(item)
      } catch (e) { }
      // this.list.splice(index)
    },
  },
}
</script>

<style>
.cssbtn:hover {
  @apply transform scale-125 duration-500;
}
</style>
