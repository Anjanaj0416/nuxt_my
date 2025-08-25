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
<!-- <template>
 <article class="w-full">
  <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700 ">
    {{ label }}
  </label>

  <div class="relative">
    <select
      :class="[
        cssclass,
        'appearance-none w-full border border-gray-300  rounded-md px-3 py-2 pr-10 bg-white  text-gray-700  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
      ]"
      @change="onChange"
      :value="cur_item"
    >
    <option disabled value="" selected v-if="!cur_item">Please select</option>
      <option
        v-for="sitem in selections"
        :key="sitem"
        :value="sitem"
        :selected="sitem === cur_item"
        class="uppercase"
      >
        {{ sitem }}
      </option>
    </select>


    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <p v-if="err" class="mt-1 text-xs italic text-red-600 dark:text-red-400">
    {{ err }}
  </p>
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
</style> -->


<template>
  <article class="w-full">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700 ">
      {{ label }}
    </label>
    <div class="relative">
      <select :class="[
        cssclass,
        'appearance-none border border-gray-300 rounded-md w-full px-3 py-2 pr-10 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
      ]" :value="modelValue" @change="onChange" @click.stop>
        <option disabled value="" v-if="!modelValue">Please select</option>
        <!-- <option disabled value="{{cur_item}}" v-if="!modelValue && cur_item">{{ cur_item }}</option> -->
        <!-- <option  v-for="sitem in selections" :key="sitem" :value="sitem" class="uppercase">
          {{ sitem }}
        </option> -->
        <template v-if="isDistrict">
          <option v-for="item in selections" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </template>

        <template v-else-if="isReport">
          <option v-for="item in selections" :key="item.id" :value="item.id">
            {{ item.value }}
          </option>
        </template>

        <template v-else>
          <option v-for="item in selections" :key="item || item" :value="item">
            {{ item }}
          </option>
        </template>


      </select>

      <!-- Custom dropdown icon -->
      <!-- <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div> -->
    </div>

    <p v-if="err" class="mt-2 text-sm text-red-600">
      {{ err }}
    </p>
  </article>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    cur_item: {
      type: [String, Number],
      default: ''
    },
    isDistrict: Boolean,
    isReport: Boolean,
    err: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    cssclass: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChange(event) {
      if (this.isDistrict) {
        const selectedIndex = event.target.value;
        console.log("selectedIndex:", selectedIndex);

        const selectedOption = this.selections.find(i => i.id == selectedIndex);
        console.log("selectedOption:", selectedOption);

        this.$emit('update:modelValue', selectedIndex);
        this.$emit('changed', selectedOption);

      } else {
        const newValue = event.target.value;
        this.$emit('update:modelValue', newValue);
        this.$emit('changed', newValue);
        console.log('Selected:', newValue);
      }


    }
  }
}
</script>

<style scoped>
/* You can keep or add custom styles here */
</style>
