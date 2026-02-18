<template>
  <section class="mt-12 ml-1 lg:m-16">
    <div class="cssHeading py-2">
      <div class="text-sm lg:text-base uppercase font-bold pb-4 border-b-2 border-gray-600">
        Company Profile
      </div>

      <div class="cssfcontrol notToPrint block absolute top-0 right-0 pt-2 pr-4 cursor-pointer">
        <div class="flex gap-x-4">
          <div @click="getEdit()">
            <div v-show="!ismodeedit" title="Edit..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div v-show="ismodeedit" title="Save..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
          </div>

          <div v-show="ismodeedit" title="Cancel Edit.." @click="getcancel()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="cssView grid grid-cols-2 lg:grid-cols-3 gap-4" v-show="!ismodeedit">
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Name</div>
        <div>{{ companyprofile.name }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">City</div>
        <div class="break-words">{{ companyprofile.city }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Address</div>
        <div class="break-words">{{ companyprofile.address }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Hotline</div>
        <div class="break-words">{{ companyprofile.hotline }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Logo</div>
        <a v-show="companyprofile.logo != ''" :href="imageroot_mcle + '/mlab/logo/' + companyprofile.logo" target="_blank">
          <img class="cursor-pointer w-32" :src="imageroot_mcle + '/mlab/logo/' + companyprofile.logo" alt="Download" />
        </a>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Thermal Logo</div>
        <a v-show="companyprofile.printlogo != ''" :href="imageroot_mcle + '/mlab/logo/' + companyprofile.printlogo" target="_blank">
          <img class="cursor-pointer w-32" :src="imageroot_mcle + '/mlab/logo/' + companyprofile.printlogo" alt="Download" />
        </a>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Letterhead</div>
        <a v-show="companyprofile.letterhead != ''" :href="imageroot_mcle + '/mlab/template/mreport/' + companyprofile.letterhead" target="_blank">
          <img class="cursor-pointer w-12" :src="imageroot_mcle + '/Images/pdfico.png'" alt="Download" />
        </a>
      </div>
    </div>

    <div class="cssView grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4" v-show="ismodeedit">
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Name</div>
        <input type="text" class="w-full shadow-outline rounded p-1" v-model="companyprofile.name" @keyup="changeValidation('name')" @blur="changeValidation('name')" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.name }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">City</div>
        <input type="text" class="w-full shadow-outline rounded p-1" v-model="companyprofile.city" @keyup="changeValidation('city')" @blur="changeValidation('city')" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.city }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Address</div>
        <input type="text" class="w-full shadow-outline rounded p-1" v-model="companyprofile.address" @keyup="changeValidation('address')" @blur="changeValidation('address')" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.address }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Hotline</div>
        <input type="text" class="w-full shadow-outline rounded p-1" v-model="companyprofile.hotline" @keyup="changeValidation('hotline')" @blur="changeValidation('hotline')" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.hotline }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Logo [W*H - 150px*100px]</div>
        <a v-show="companyprofile.logo != ''" :href="imageroot_mcle + '/mlab/logo/' + companyprofile.logo" target="_blank">
          <img class="cursor-pointer w-32" :src="imageroot_mcle + '/mlab/logo/' + companyprofile.logo" alt="Download" />
        </a>
        <img_fileupload v-model="Logo_Uploading_file_details.file" @FileChanged="LogoFileChanged" ref="refLogo" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.logo }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Thermal Logo [W*H - 150px*100px]</div>
        <a v-show="companyprofile.printlogo != ''" :href="imageroot_mcle + '/mlab/logo/' + companyprofile.printlogo" target="_blank">
          <img class="cursor-pointer w-32" :src="imageroot_mcle + '/mlab/logo/' + companyprofile.printlogo" alt="Download" />
        </a>
        <img_fileupload v-model="PrintLogo_Uploading_file_details.file" @FileChanged="PrintLogoFileChanged" ref="refPrintLogo" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.printlogo }}</p>
      </div>
      <div>
        <div class="text-xs text-gray-700 font-bold">Company Letterhead</div>
        <a v-show="companyprofile.letterhead != ''" :href="imageroot_mcle + '/mlab/template/mreport/' + companyprofile.letterhead" target="_blank">
          <img class="cursor-pointer w-12" :src="imageroot_mcle + '/Images/pdfico.png'" alt="Download" />
        </a>
        <pdf_fileupload v-model="Letterhead_Uploading_file_details.file" @FileChanged="LetterHeadFileChanged" ref="refLetterHead" />
        <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">{{ err.letterhead }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import img_fileupload from '~/components/customcontrol/img_fileupload'
import pdf_fileupload from '~/components/customcontrol/pdf_fileupload'

export default {
  layout: 'default',
  components: { img_fileupload, pdf_fileupload },
  data() {
    return {
      imageroot_mcle: process.env.McleAssets,
      Logo_Uploading_file_details: { file: '', destpath: '', filetype: 'png', height: 100, width: 150 },
      PrintLogo_Uploading_file_details: { file: '', destpath: '', filetype: 'png', height: 100, width: 150 },
      Letterhead_Uploading_file_details: { file: '', destpath: '', filetype: 'pdf', height: 0, width: 0 },
      ismodeedit: false,
      isLogoChanged: false,
      isPrintLogoChanged: false,
      isLetterheadChanged: false,
      err: { name: '', city: '', address: '', hotline: '', logo: '', printlogo: '', letterhead: '' },
    }
  },
  computed: {
    ...mapState({
      loggeduser: (state) => state.loggeduser,
      companyprofile: (state) => state.systemdata.companyprofile,
      systemdata: (state) => state.systemdata.systemdata,
      uploaded_file: (state) => state.miracle.uploaded_file,
    }),
  },
  methods: {
    ...mapActions({
      getCompanyProfile: 'systemdata/getCompanyProfile',
      getSaveFile: 'miracle/SaveAnyFile',
      getSave: 'systemdata/getSave',
      setCompanyLogo: 'miracle/setCompanyLogo',
    }),
    ...mapMutations({ showMessage: 'PUSH_NOTIFICATION' }),
    LogoFileChanged() { this.isLogoChanged = true },
    PrintLogoFileChanged() { this.isPrintLogoChanged = true },
    LetterHeadFileChanged() { this.isLetterheadChanged = true },

    changeValidation(lbl) {
      switch (lbl) {
        case 'name': this.err.name = !this.companyprofile.name ? 'Invalid Comapny Name' : ''; break
        case 'city': this.err.city = !this.companyprofile.city ? 'Invalid City' : ''; break
        case 'address': this.err.address = !this.companyprofile.address ? 'Invalid Company Address' : ''; break
        case 'hotline': this.err.hotline = !this.companyprofile.hotline ? 'Invalid Hotline' : ''; break
        case 'logo': this.err.logo = !this.companyprofile.logo ? 'Invalid Company Logo' : ''; break
        case 'printlogo': this.err.printlogo = !this.companyprofile.printlogo ? 'Invalid Thermal Logo' : ''; break
        case 'letterhead': this.err.letterhead = !this.companyprofile.letterhead ? 'Invalid LetterHead' : ''; break
      }
    },

    getcancel() { this.ismodeedit = false },

    async getEdit() {
      if (this.ismodeedit && confirm('Sure to save this Company Profile ?')) {
        this.ismodeedit = false
        if (this.isLogoChanged) await this.uploadFile(this.Logo_Uploading_file_details)
        if (this.isPrintLogoChanged) await this.uploadFile(this.PrintLogo_Uploading_file_details)
        if (this.isLetterheadChanged) await this.uploadFile(this.Letterhead_Uploading_file_details)

        this.systemdata.id = this.companyprofile.id
        this.systemdata.dtype = 'company'
        this.systemdata.dvalue = JSON.stringify(this.companyprofile)
        this.systemdata.status = 1

        await this.getSave({ systemdata: this.systemdata, user: this.loggeduser })
        await this.setCompanyLogo({ logo: this.companyprofile.logo, companycode: this.loggeduser.clientcode })
        await this.getCompanyProfile({ param: '', clientcode: this.loggeduser.clientcode })
      } else this.ismodeedit = true
    },

    async uploadFile(fileDetails) {
      fileDetails.destpath = fileDetails.destpath || ''
      await this.getSaveFile({ user: this.loggeduser, filedetails: fileDetails })
      if (this.uploaded_file) fileDetails.filetype === 'pdf' ? this.companyprofile.letterhead = this.uploaded_file : fileDetails === this.Logo_Uploading_file_details ? this.companyprofile.logo = this.uploaded_file : this.companyprofile.printlogo = this.uploaded_file
    },
  },

  async beforeMount() {
    await this.getCompanyProfile({ param: '', clientcode: this.loggeduser.clientcode })
  },
  head() { return { title: 'Test App' } },
}
</script>

<style scoped>
.cssView > div {}
.cssfcontrol { @apply font-bold }
.cssfcontrol > div > div { @apply rounded-full shadow-outline text-black p-1 }
.cssfcontrol > div > div:hover { @apply bg-blue-800 text-white }
</style>
