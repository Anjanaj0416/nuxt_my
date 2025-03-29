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
        border-2 border-blue
        bg-blue
        rounded
        px-3
        py-4
        cursor-pointer
        flex flex-wrap
        h-auto
        gap-3
      ">
      <div v-for="item in list" :key="item">
        <tag v-model="item.value" @deletetag="deletetag" :istageditable="false" />
      </div>

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
    </div>
  </section>
</template>

<script>
import tag from '~/components/customcontrol/tag'
import serachInput from '~/components/customcontrol/SearchInput'

export default {
  props: ['arrSelectedIDs', 'arrItems'],
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
  methods: {
    // selectValue(id){
    //    this.inputvalue= id
    //     this.list.push({ value: this.inputvalue })
    // },
    resetItems() {
      this.list = []
    },
    addItem(id) {
      var index = this.arrSelectedIDs.findIndex((item) => item === id)

      if (index == -1) {
        let selected_item = this.arrItems.filter((item) => {
          return item.id == id
        })[0]

        this.list.push({ value: selected_item.value })
        this.arrSelectedIDs.push(selected_item.id)

      } else {
        alert('Item Already Exisits')
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

        var index = this.arrSelectedIDs.findIndex((val) => val === delitem.id)
        this.arrSelectedIDs.splice(index, 1)

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
