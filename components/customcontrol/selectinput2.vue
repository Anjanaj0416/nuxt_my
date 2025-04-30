<!--
Usage :
import selectinput2 from "~/components/customcontrol/selectinput2";
--------------------------------------
components: { selectinput2,  },
--------------------------------------
 <selectinput2
      class="w-64"
      v-model="item"
      :cur_item="item"
      :selections="alTypes"
      :err="err.type"
      label="Types"
      @changed="changed_item"
    />
--------------------------------------
 data() {
    return {
      alTypes: ["Car", "Motor", "Bike", "Motor Car", "Van", "Lorry", "MiniBus"],

      item: "MiniBus",

      err: { type: "" },
    };
  },
--------------------------------------

--------------------------------------
-->
<template>
  <article>
    <!-- <label class="block text-sm text-gray-00">{{ label }}</label> -->
    <select :class="cssclass" @change="onChange"
      class="cssselect w-full border-gray-500 rounded p-2 h-8 text-gray-700 bg-white rounded px-2" :value="cur_item">
      <!--  v-model="cur_item -->
      <option v-for="sitem in selections" :key="sitem" :value="sitem" :v-bind:value="sitem"
        :selected="sitem === cur_item" class="uppercase px-2"> {{ sitem }}</option>
    </select>

    <!-- <p class="text-xs ml-1 text-red-700 italic">{{ err }}</p> -->

  </article>
</template>

<script>
export default {
  props: ['selections', 'cur_item', 'value', 'err', 'label', 'cssclass'],
  data() {
    return {
      selected_item: {},
    }
  },
  watch: {
    cur_item: function () {
      try {
        this.$emit('input', this.cur_item.trim())
      }
      catch (error) { }
    },
  },
  methods: {
    onChange() {
      let newValue = event.target.value;
      console.log("new value:", newValue);

      this.$emit('update:modelValue', newValue);
      this.$emit('changed', newValue)
    },
  },
  beforeMount() {
  },
}
</script>

<style>
.cssPages {
  @apply h-6;

}
</style>
