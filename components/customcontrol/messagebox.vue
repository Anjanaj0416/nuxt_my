<!--
<article>
      <messagebox :message="msg.body" :message_header="msg.header" @clickMsgOK="clickMsgOK" />
    </article>

    import messagebox from '~/components/customcontrol/messagebox'

    data() {
    return {
      msg: {
        isShowMsg: true,
        header: 'Login Error',
        body: 'Enter Correct UserName',
      },
    }
  },

methods:{
   clickMsgOK(){
      alert('clickMsgOK');
    },
    }
-->
<template>
  <section>
    <article class="min-h-screen h-100 w-screen absolute top-0 left-0">
      <div class="container mx-auto h-full flex flex-1 justify-center" style="margin-top: 250px">
        <div class="w-64 md:w-3/4 max-w-lg">
          <div class="leading-loose">
            <div role="alert">
              <div class="bg-green text-gray-600 font-bold rounded-t px-4 py-2">{{ message_header }}</div>
              <div class="border border-t-0 bg-gray-100 rounded-b border-green px-4 py-3 text-green-700">
                <p class="text-gray-600">{{ message }}</p>

                <div class="mt-4 flex justify-center">
                  <appbutton @click="cmdOK" text="OK" title="Exit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import appbutton from '~/components/customcontrol/button_type2'
export default {
  props: ['message', 'message_header'],
  components: { appbutton },
  data() {
    return {}
  },
  methods: {
    cmdOK() {
      this.$emit('clickMsgOK')
    },
  },
}
</script>

<style scoped>
@media (min-width: 640px) {}
</style>