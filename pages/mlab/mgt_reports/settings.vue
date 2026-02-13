<template>
  <section class="csshead">
    <div class="m-auto w-full">
      <div class="flex items-center">
        <div class="m-auto text-center cssBorder w-full md:w-1/3 mx-4 p-6">
          <div>
            <img
              :src="assets_root + '/mlab/logo/' + company.logo"
              class="w-32 h-16 mx-auto"
              alt="Company Logo"
            />
          </div>

          <div class="my-4 text-2xl font-bold">Settings</div>

          <div class="my-4 bg-gray-100 p-4 rounded shadow-sm">
            <p class="text-left mb-2">Enable to Send Reports via SMS/Email/WhatsApp</p>
            <p class="text-gray-600 text-xs mb-4">Conditions apply</p>

            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <div>Via SMS [Rs.0.80 Per SMS]</div>
                <input v-model="mlabSettings.sendReportsVia.viaSMS" type="checkbox" />
              </div>
              <div class="flex justify-between items-center text-sm">
                <div>Via WhatsApp [Rs.0.50 Per WhatsApp]</div>
                <input v-model="mlabSettings.sendReportsVia.viaWhatsApp" type="checkbox" />
              </div>
              <div class="flex justify-between items-center text-sm">
                <div>Via Emails [Free]</div>
                <input v-model="mlabSettings.sendReportsVia.viaEmail" type="checkbox" />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="cssBorder cssbtn px-4 py-1 bg-blue-200 hover:bg-blue-400 hover:text-white"
                @click="setSave"
              >
                Save
              </button>
            </div>

            <!-- Debug JSON, remove for production -->
            <pre class="mt-4 text-xs">{{ mlabSettings }}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  data() {
    return {
      assets_root: process.env.McleAssets,
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      company: state => state.company,
      mlabSettings: state => state.systemdata.mlabSettings,
    }),
  },
  methods: {
    ...mapActions({
      setSaveSettings: 'systemdata/setSaveSettings',
      getSettings: 'systemdata/getMlabSettings',
    }),
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
    }),
    async setSave() {
      if (confirm('Sure To Save This Settings?')) {
        await this.setSaveSettings({ user: this.loggeduser, mlabSettings: this.mlabSettings })
      }
    },
  },
  async beforeMount() {
    if (['superuser', 'admin'].includes(this.loggeduser.usergroup)) {
      await this.getSettings({ user: this.loggeduser })
    } else {
      this.showMessage({ type: 'Failed', message: 'Not Allowed to access this page' })
      this.$router.push('/')
    }
  },
  head() {
    return { title: 'EasyAppts - App Settings' }
  },
}
</script>

<style scoped>
.csshead {
  @apply mt-24 px-4 mx-auto w-full;
}

.cssBorder {
  @apply border-gray-500 rounded shadow-lg border-2;
}

.cssbtn:hover {
  @apply border-gray-800 cursor-pointer;
}
</style>
