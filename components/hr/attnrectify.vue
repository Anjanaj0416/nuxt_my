<template>
  <section>
    <div v-show="rowid != rectifingrow">{{ value }}</div>
    <div v-show="rowid == rectifingrow">
      <input type="time" class="w-24 rounded text-blue-300 text-center" @input="updateValue($event.target.value)"
        :value="value" />
    </div>
  </section>
</template>

<script>
export default {
  props: ['rectifingrow', 'value', 'rowid'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value.trim())
    },
  },
}
</script>

<style></style>