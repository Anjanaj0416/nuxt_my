<template>
  <section>
    <div class="row relative">
      <!-- View Mode -->
      <div class="cssView" v-show="!ismodeedit">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div v-for="field in fields" :key="field.key" class="cssitem lg:flex-col">
            <div class="lg:text-xs">{{ field.label }}</div>
            <div v-if="field.type !== 'age'">{{ patient[field.key] }}</div>
            <div v-else>{{ patient.age }}</div>
          </div>
        </div>
      </div>

      <!-- Edit Mode -->
      <div class="cssEdit" v-show="ismodeedit">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div v-for="field in fields" :key="field.key" class="cssitem lg:flex-col">
            <div class="lg:text-xs">{{ field.label }}</div>

            <div v-if="field.type === 'text' || field.type === 'number'">
              <input
                :type="field.type"
                class=""
                v-model="patient[field.key]"
                :maxlength="field.maxlength || null"
                @keyup="changeValidation(field.key)"
                @blur="changeValidation(field.key)"
              />
            </div>

            <div v-if="field.type === 'select'">
              <selectinput2
                cssclass="cssCRUD"
                v-model="patient[field.key]"
                :cur_item="patient[field.key]"
                :selections="field.options"
                label=""
              />
            </div>

            <div v-if="field.type === 'age'" class="flex gap-x-2">
              <input
                type="text"
                size="1"
                maxlength="3"
                v-model="age.years"
                @keyup="changeValidation('age')"
                @blur="changeValidation('age')"
                class="w-12"
                placeholder="Yrs"
              />
              <input
                type="text"
                size="1"
                maxlength="2"
                v-model="age.months"
                @keyup="changeValidation('age')"
                @blur="changeValidation('age')"
                class="w-12"
                placeholder="Mos"
              />
            </div>

            <p class="h-2 text-xs ml-1 text-red-800 italic animate-pulse">
              {{ err[field.key] }}
            </p>
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

export default {
  props: ['patient', 'initData'],
  components: { selectinput2 },
  data() {
    return {
      ismodeedit: false,
      editing_row: {},
      age: { years: '', months: '' },
      err: {},
      fields: [
        { key: 'title', label: 'Title', type: 'select', options: this.initData.arrTitle },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'gender', label: 'Gender', type: 'select', options: this.initData.arrGender },
        { key: 'nic', label: 'NIC', type: 'text', maxlength: 15 },
        { key: 'age', label: 'Age', type: 'age' },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'smsnumber', label: 'SMS Number', type: 'text', maxlength: 10 },
        { key: 'whatsappnumber', label: 'WhatsApp Number', type: 'text', maxlength: 10 },
      ]
    }
  },
  methods: {
    changeValidation(key) {
      switch (key) {
        case 'title': this.err.title = this.patient.title ? '' : 'Invalid title'; break;
        case 'name': this.err.name = this.patient.name ? '' : 'Invalid name'; break;
        case 'nic': this.err.nic = this.patient.nic ? '' : 'Invalid NIC'; break;
        case 'gender': this.err.gender = this.patient.gender ? '' : 'Invalid gender'; break;
        case 'age':
          this.err.age = this.age.years || this.age.months ? '' : 'Invalid age';
          this.patient.age = `${this.age.years ? this.age.years + 'yrs ' : ''}${this.age.months ? this.age.months + 'mos' : ''}`;
          break;
        case 'email': this.err.email = this.patient.email ? '' : 'Invalid email'; break;
        case 'smsnumber': this.err.smsnumber = this.patient.smsnumber ? '' : 'Invalid SMS'; break;
        case 'whatsappnumber': this.err.whatsappnumber = this.patient.whatsappnumber ? '' : 'Invalid WhatsApp'; break;
      }
    },
    formValidate() {
      let valid = true;
      this.fields.forEach(f => this.changeValidation(f.key));
      Object.values(this.err).forEach(v => { if (v) valid = false; });
      return valid;
    },
    getEdit() {
      if (this.ismodeedit) {
        if (!this.formValidate() || !confirm('Sure to save this Patient?')) return;
        this.ismodeedit = false;
        this.$emit('SavePatient', this.patient);
      } else {
        this.editing_row = JSON.parse(JSON.stringify(this.patient));
        this.ismodeedit = true;
      }
    },
    getcancel() { this.ismodeedit = false; this.patient = this.editing_row; },
    getdelete() { if (confirm('Sure to delete this Patient?')) this.$emit('delete', this.patient); }
  },
  mounted() {
    // Initialize age split if patient.age exists
    if (this.patient.age) {
      const match = this.patient.age.match(/(\d+)yrs?\s*(\d*)mos?/);
      if (match) {
        this.age.years = match[1] || '';
        this.age.months = match[2] || '';
      }
    }
  }
}
</script>

<style scoped>
.row { @apply shadow-2xl my-1 rounded p-2 relative min-h-[50px]; }
.cssitem { @apply flex justify-between gap-x-2 my-2; }
.cssitem input { @apply shadow-outline pl-1 rounded text-EF-blue font-bold; max-width: 192px; }
.cssitem > div:nth-child(1) { @apply text-sm; }
.cssitem > div:nth-child(2) { @apply text-EF-blue font-bold; }
.cssfcontrol { @apply font-bold; }
.cssfcontrol > div > div { @apply rounded-full shadow-outline text-black p-1; }
.cssfcontrol > div > div:hover { @apply bg-blue-800 text-white; }
p { @apply h-2; }
@media print {
  .cssView > div { @apply grid grid-cols-3; }
  .cssitem { @apply flex justify-start gap-x-2 my-2; }
  .notToPrint { visibility: hidden; }
}
</style>
