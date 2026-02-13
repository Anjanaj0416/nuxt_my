<template>
  <article>
    <div class="p-2 rounded-lg">
      <div class="text-sm">
        <!-- Title Selector -->
        <div class="w-full" v-if="text === 'Title'">
          <selectinput2
            v-model="internalValue"
            :cur_item="internalValue"
            :selections="arrTitle"
            :err="err"
            label="Title"
            @changed="onTitleChanged"
          />
        </div>

        <!-- Text Input -->
        <div class="w-full" v-else>
          <textinput
            mode="edit"
            ctrltype="text"
            :label="text"
            v-model="internalValue"
            :err="err"
            @changeValidation="onChangeValidation"
            maxlength="100"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import textinput from '~/components/customcontrol/textinputExtend'

export default {
  name: 'new_appt_row',
  components: { selectinput2, textinput },
  props: {
    text: { type: String, required: true },
    value: { type: [String, Number], default: '' },
    err: { type: String, default: '' },
    arrTitle: { type: Array, default: () => [] },
  },
  data() {
    return {
      internalValue: this.value,
    }
  },
  watch: {
    internalValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      if (val !== this.internalValue) {
        this.internalValue = val
      }
    },
  },
  methods: {
    onTitleChanged() {
      this.$emit('changed')
    },
    onChangeValidation(lbl) {
      this.$emit('changeValidation', lbl)
    },
  },
}
</script>

<style scoped>
/* Optional scoped styling */
</style>
