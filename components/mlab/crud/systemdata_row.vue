<template>
  <section>
    <div class="row relative">
      <!-- View Mode -->
      <div class="cssView" v-show="!ismodeedit">
        <div class="lg:flex lg:justify-between">
          <div
            v-for="field in fields"
            :key="field.name"
            class="cssitem flex-none lg:flex-col"
          >
            <div class="lg:text-xs">{{ field.label }}</div>
            <div class="break-words">
              {{ displayValue(field) }}
            </div>
          </div>
        </div>
      </div>
      <!-- End View Mode -->

      <!-- Edit Mode -->
      <div class="cssEdit" v-show="ismodeedit">
        <div class="lg:flex lg:justify-between">
          <div
            v-for="field in fields"
            :key="field.name"
            class="cssitem lg:flex-col"
          >
            <div class="lg:text-xs">{{ field.label }}</div>
            <div>
              <component
                :is="field.component || 'input'"
                v-model="editingRow[field.name]"
                v-bind="field.props"
                @keyup="changeValidation(field.name)"
                @blur="changeValidation(field.name)"
              ></component>
              <p
                class="h-2 text-xs ml-1 text-red-800 italic animate-pulse"
              >
                {{ err[field.name] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End Edit Mode -->

      <!-- Controls -->
      <div
        class="cssfcontrol notToPrint block lg:absolute top-0 right-0 p-2 cursor-pointer"
      >
        <div class="flex gap-x-2">
          <!-- Edit / Save -->
          <div @click="toggleEdit()">
            <div v-show="!ismodeedit" title="Edit..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div v-show="ismodeedit" title="Save..">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
          </div>

          <!-- Cancel -->
          <div v-show="ismodeedit" @click="cancelEdit()" title="Cancel Edit..">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>

          <!-- Delete -->
          <div v-if="allowDelete" @click="deleteRow()" title="Delete..">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      <!-- End Controls -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    rowData: { type: Object, required: true }, // patient or systemdata
    fields: { type: Array, required: true }, // [{ name, label, component?, props? }]
    allowDelete: { type: Boolean, default: true },
  },
  data() {
    return {
      ismodeedit: false,
      editingRow: {},
      err: {},
    }
  },
  methods: {
    // Toggle edit/save
    toggleEdit() {
      if (this.ismodeedit) {
        if (this.formValidate() && confirm('Sure to save?')) {
          this.ismodeedit = false
          this.$emit('save', this.editingRow)
        }
      } else {
        this.ismodeedit = true
        this.editingRow = JSON.parse(JSON.stringify(this.rowData))
      }
    },
    cancelEdit() {
      this.ismodeedit = false
      this.editingRow = JSON.parse(JSON.stringify(this.rowData))
    },
    deleteRow() {
      if (confirm('Sure to delete?')) {
        this.$emit('delete', this.rowData)
      }
    },
    changeValidation(fieldName) {
      const val = this.editingRow[fieldName]
      this.err[fieldName] =
        val === '' || val === null || val === undefined ? `Invalid ${fieldName}` : ''
    },
    formValidate() {
      let isValid = true
      this.fields.forEach((f) => {
        const val = this.editingRow[f.name]
        if (val === '' || val === null || val === undefined) {
          this.err[f.name] = `Invalid ${f.name}`
          isValid = false
        } else {
          this.err[f.name] = ''
        }
      })
      return isValid
    },
    displayValue(field) {
      const val = this.rowData[field.name]
      // Format special cases, e.g., age object or number formatting
      if (field.format && typeof field.format === 'function') return field.format(val)
      return val
    },
  },
}
</script>

<style scoped>
.row {
  @apply shadow-2xl my-1 rounded p-2 relative;
  min-height: 50px;
}
.cssitem {
  @apply gap-x-2 my-2;
}
.cssitem input,
.cssitem textarea {
  @apply shadow-outline px-2 rounded font-bold;
}
.cssitem > div:nth-child(1) {
  @apply text-sm;
}
.cssitem > div:nth-child(2) {
  @apply text-blue-700 font-bold;
}
.cssfcontrol {
  @apply font-bold;
}
.cssfcontrol > div > div {
  @apply rounded-full shadow-outline text-black p-1;
}
.cssfcontrol > div > div:hover {
  @apply bg-blue-800 text-white;
}
p {
  @apply h-2;
}
@media print {
  .notToPrint {
    visibility: hidden;
  }
}
</style>
