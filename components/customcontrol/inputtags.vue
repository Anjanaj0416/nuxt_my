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
        cssTagBody
        gap-3
      ">
      <div v-for="item in list" :key="item">
        <tag v-model="item.value" @deletetag="deletetag" :istageditable=true />
      </div>

      <div class="w-32 cursor-pointer">
        <input class="w-full text-gray-600  rounded-lg px-1" type="text" v-model="inputvalue"
          @keypress.enter="addItem($event.target.value)" />
      </div>
    </div>

  </section>
</template>

<script>
import tag from '~/components/customcontrol/tag'
export default {
  props: ['list'],
  components: {
    tag,
  },
  data() {
    return {
      inputvalue: '',
    }
  },
  methods: {
    addItem() {
      var index = this.list.findIndex(item => item.value === this.inputvalue);
      if (index == -1) {
        this.list.push({ value: this.inputvalue })
        this.inputvalue = ''
      }
      else {
        alert('Item Already Exisits');
      }
    },
    deletetag(tagval) {
      try {
        //var arr =   this.list.filter(function(item){
        //  if(item.value == tagval)  return item
        //});

        this.list.forEach((item, i) => {
          if (item.value == tagval)
            this.list.splice(i, 1)
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

.cssTagBody {
  min-height: 50px;
  max-height: 150px;
  overflow: scroll;
}
</style>
