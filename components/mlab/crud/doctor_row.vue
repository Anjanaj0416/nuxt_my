<template>
  <section>
    <div class="row relative">
      <!-- View Mode -->
      <div class="cssView" v-show="!ismodeedit">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div v-for="field in fields" :key="field.key" class="cssitem lg:flex-col">
            <div class="lg:text-xs">{{ field.label }}</div>
            <div class="">
              <template v-if="field.type === 'file'">
                <a
                  v-if="doctor[field.key]"
                  :href="imageroot_mcle + '/Miracle/doctor/signature/' + doctor[field.key]"
                  target="_blank"
                >
                  <img
                    class="cursor-pointer w-16"
                    :src="imageroot_mcle + '/Miracle/doctor/signature/' + doctor[field.key]"
                    alt="Download"
                  />
                </a>
              </template>
              <template v-else>{{ doctor[field.key] }}</template>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Mode -->
      <div class="cssEdit" v-show="ismodeedit">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div v-for="field in fields" :key="field.key" class="cssitem lg:flex-col">
            <div class="lg:text-xs">{{ field.label }}</div>
            <div>
              <template v-if="field.type === 'text' || field.type === 'number'">
                <input
                  :type="field.type"
                  class=""
                  v-model="doctor[field.key]"
                  :maxlength="field.maxlength || null"
                  @input="onInput(field)"
                  @keyup="changeValidation(field.key)"
                  @blur="changeValidation(field.key)"
                />
              </template>

              <template v-if="field.type === 'select'">
                <selectinput2
                  cssclass="cssCRUD"
                  v-model="doctor[field.key]"
                  :cur_item="doctor[field.key]"
                  :selections="field.options"
                  label=""
                />
              </template>

              <template v-if="field.type === 'file'">
                <img_fileupload
                  v-model="Uploading_file_details.file"
                  caption=""
                  @FileChanged="FileChanged"
                  ref="refSignature"
                />
              </template>

              <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">
                {{ err[field.key] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="cssfcontrol block lg:absolute top-0 right-0 p-2 cursor-pointer">
        <div class="flex gap-x-2">
          <div @click="getEdit()">
            <div v-show="!ismodeedit" title="Edit..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <div v-show="ismodeedit" title="Save..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
              </svg>
            </div>
          </div>

          <div v-show="ismodeedit" title="Cancel Edit.." @click="getcancel()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
          </div>

          <div title="Delete.." @click="getdelete()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import img_fileupload from '~/components/customcontrol/img_fileupload'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: { selectinput2, img_fileupload },
  props: ['doctor', 'initData'],
  data() {
    return {
      ismodeedit: false,
      editing_row: {},
      imageroot_mcle: process.env.McleAssets,
      filechanged: false,
      Uploading_file_details: { file: '', destpath: '', filetype: 'png', height: 100, width: 150 },
      err: {},
      fields: [
        { key: 'firstname', label: 'First Name', type: 'text' },
        { key: 'lastname', label: 'Last Name', type: 'text' },
        { key: 'title', label: 'Title', type: 'select', options: this.initData.alTitle },
        { key: 'speciality1', label: 'Speciality 1', type: 'text' },
        { key: 'speciality2', label: 'Speciality 2', type: 'text' },
        { key: 'speciality3', label: 'Speciality 3', type: 'text' },
        { key: 'speciality4', label: 'Speciality 4', type: 'text' },
        { key: 'mobile', label: 'Mobile', type: 'text', maxlength: 10 },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'sex', label: 'Sex', type: 'select', options: this.initData.alGender },
        { key: 'signature', label: 'Signature', type: 'file' }
      ]
    }
  },
  computed: {
    ...mapState({ loggeduser: (state) => state.loggeduser, uploaded_file: (state) => state.miracle.uploaded_file }),
    mode() { return this.ismodeedit ? 'edit' : 'view' }
  },
  methods: {
    ...mapActions({ getSaveSignature: 'miracle/SaveAnyFile' }),
    ...mapMutations({ showMessage: 'PUSH_NOTIFICATION' }),

    onInput(field) {
      if (field.key === 'mobile') this.doctor.mobile = this.doctor.mobile.replace(/[^0-9]/g, '').slice(0, 10)
    },

    changeValidation(key) {
      const value = this.doctor[key]
      switch (key) {
        case 'firstname': case 'lastname': case 'speciality1': this.err[key] = value ? '' : `Invalid ${key}`; break
        case 'mobile': this.err[key] = value.length === 10 ? '' : 'Invalid mobile'; break
        case 'email': this.err[key] = value.includes('@') ? '' : 'Invalid email'; break
        case 'sex': case 'title': this.err[key] = value ? '' : `Invalid ${key}`; break
        case 'signature': this.err[key] = value ? '' : 'Invalid signature'; break
      }
    },

    formValidate() {
      let isValid = true
      this.fields.forEach(f => { this.changeValidation(f.key); if (this.err[f.key]) isValid = false })
      return isValid
    },

    FileChanged() { this.filechanged = true },

    getdelete() { if (confirm('Sure to delete this doctor?')) this.$emit('delete', this.doctor) },

    async getEdit() {
      if (this.ismodeedit) {
        if (!this.formValidate() || !confirm('Sure to save this Doctor?')) return
        if (this.filechanged) {
          this.Uploading_file_details.destpath = `Miracle\\doctor\\signature\\${Date.now()}.png`
          await this.getSaveSignature({ user: this.loggeduser, filedetails: this.Uploading_file_details })
          if (this.uploaded_file) { this.doctor.signature = this.uploaded_file; this.filechanged = false }
        }
        this.$emit('SaveDoctor', this.doctor)
        this.ismodeedit = false
      } else {
        this.editing_row = JSON.parse(JSON.stringify(this.doctor))
        this.ismodeedit = true
      }
    },

    getcancel() { this.ismodeedit = false; this.$emit('cancel', this.editing_row) }
  }
}
</script>

<style scoped>
.row { @apply shadow-2xl my-1 rounded p-2 relative min-h-[50px]; }
.cssitem { @apply flex justify-between gap-x-2 my-2; }
.cssitem input { @apply shadow-outline px-2 w-48 rounded text-EF-blue font-bold; }
.cssitem > div:nth-child(1) { @apply text-sm; }
.cssitem > div:nth-child(2) { @apply text-EF-blue font-bold; }
.cssfcontrol { @apply font-bold; }
.cssfcontrol > div > div { @apply rounded-full shadow-outline text-black p-1; }
.cssfcontrol > div > div:hover { @apply bg-blue-800 text-white; }
p { @apply h-2; }
</style>
