<template>
  <article>
      <div>
           <button
               :title="title"
                  class="px-4 py-1 text-white font-bold tracking-wider bg-EF-green rounded"
                  type="button"
                  @click="click"
                >{{text}}</button>
      </div>
  </article>
</template>

<script>
export default {
     props: ['text', 'title'],
    methods:{
        click() {
      this.$emit('click')
    },
    },
}
</script>

<style>

</style>