<!--
<article>
      <infotag :message="msg.body" :message_header="msg.header" />
    </article>

    import infotag from '~/components/customcontrol/infotag'

 components: {
   infotag,
   }

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
    <article class="w-auto">
      <div class="csstagHeading bg-green-600 rounded-t text-white  p-1 text-center uppercase">{{ heading }}</div>
      <div class="bg-gray-500 text-xs text-white   p-1 " :title="info_title">{{ info }} </div>

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
  methods: {

  },
}
</script>

<style scoped>
@media (min-width: 640px) {}

.csstagHeading {
  font-size: 10px;
}
</style>