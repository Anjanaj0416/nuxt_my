<!--
<article>
      <infotag :message="msg.body" :message_header="msg.header" />
    </article>

    import infotag from '~/components/customcontrol/infotag'

    data() {
    return {
      msg: {
        heading: 'info',
        info: 'CSONo: FL026',
        info_title: 'RSO Number',
      },
    }
  },

-->
<template>
  <section>
    <article class="bg-transparent">
      <div
        class="csstagHeading text-xs lg:text-sm rounded-t w-full text-white   uppercase"
      >{{heading}}</div>
      <div class="bg-transparent text-xs ">
        <input        
          class="bg-transparent text-xs lg:text-base  font-bold w-32 lg:w-64 uppercase "          
          :title="info_title"
        
          readonly          
          type="text"
          :value="info"
        />
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: ['heading', 'info', 'info_title'],
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

	<style scoped>
@media (min-width: 640px) {
}

.csstagHeading {
  
}

input {
  border: none;
  outline: none;
  
}
</style>