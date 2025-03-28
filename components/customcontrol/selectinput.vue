<template>
  <article>

 <div class=" pt-2 px-2 rounded">
 <div class="">
 <label class="w-32  cssSelectLabel">{{label}}</label>
 {{selections}}
 <select class="cssselect mt-2" v-model='selected_item' >
            <option
              v-for="sitem  in selections"
              :key="sitem.id"
              :value="sitem.id"
              :v-bind:value="sitem.value"
              :selected="sitem.id===selected_item.id">
              {{sitem.value}}
              </option>
 </select>



 <p class="text-xs ml-1 text-red-700 italic">{{err}}</p>



    </div>
 </div>

 </article>
</template>

<script>
export default {
props:['selections','item','value','err','label'],
data() {
  return {
  selected_item:{},
  }
},
   watch: {
  	selected_item: function() {
      if(this.selected_item=='Select')
      this.err = 'select correct type..';
      else{
      this.$emit('input', this.selected_item.trim());
      this.err = '';
      }
    }
  },
methods: {
  //  updateValue: function (value) {
  //     this.$emit('input', value);
  //   },
  //   changevalidate:function(){
  //     this.$emit('changeValidation', this.label);
  //   },
 // onSelectChange:function(val){
     // this.$emit('onSelectChange', val);
  //  },
 },
}

</script>

<style>
.cssSelectLabel{
  font-size:14px;
  font-weight:normal;
    @apply text-orange-500;
  }

 .cssselect{
  font-size:14px;
  padding:4px 4px;
  width:95%;
  height:30px;
  background-color: transparent;
   @apply border-2 border-orange-400;

}







</style>
