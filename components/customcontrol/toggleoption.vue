<!--
Usage : 
  <toggleoption v-model="advertisement.ref_sticker" label="Ref Sticker" />
-------------------------
import toggleoption from '~/components/customcontrol/toggleoption'
-------------------------
components: { toggleoption },
-------------------------
-->

<template>
  <section>
    <label class="block text-sm text-gray-00">{{ label }}</label>
    <div class>
      <!-- Toggle Button -->
      <label class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <!-- <input type="checkbox" class="hidden" v-model="value" @change="updateValue" /> -->
          <!-- line -->
          <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <!-- dot -->
          <div class="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
        <!-- label -->
      </label>
    </div>
  </section>
</template>

<script>
//import tagsSearchInput from "~/components/customcontrol/";
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: '',
  components: {},
  props: ['value', 'label'],
  data() {
    return {}
  },
  computed: {
    // ...mapState({
    //   //   myself: (state) => state.agent.myself,
    // }),
  },
  methods: {
    // ...mapActions({
    //   // getBirthdate: "agent/getBirthdate",
    //   // setBDay: "agent/setBDay",
    // }),
    // ...mapMutations({
    //   // getBirthdate: "agent/getBirthdate",
    // }),
    updateValue: function () {
      this.$emit('input', (this.value) ? 1 : 0)
      //this.$emit('changed', (this.value)?1:0)
    },
  },
  beforeMount() { },
  head() {
    return {
      title: '',
    }
  },
}
</script>

<style scoped>
.toggle__dot {
  top: -0.15rem;
  left: -0.10rem;
  transition: all 0.3s ease-in-out;
}

input:checked~.toggle__dot {
  transform: translateX(100%);
  @apply bg-blue-400;
}
</style>