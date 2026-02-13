<template>
  <section>
    <div class="m-0 lg:m-8 bg-blue-600 rounded">
      <div class="cssmain m-auto flex lg:gap-x-8 p-4 rounded-lg">

        <!-- Left Banner -->
        <div class="w-full lg:w-1/4 lg:flex hidden">
          <div class="m-auto bg-white text-center rounded p-4">
            <img class="w-full h-auto" src="~/assets/images/homebanner.jpg" alt="Banner" />
            <div class="py-2">
              <h1 class="text-4xl font-bold text-blue-900">Welcome</h1>
              <p class="text-gray-600 tracking-tighter leading-3">Join with us</p>
              <p class="text-gray-600 tracking-tighter leading-6">We make your business smart</p>
            </div>
          </div>
        </div>

        <!-- Right Registration Form -->
        <div class="w-full lg:w-3/4 flex bg-gray-300 p-4 rounded">
          <div class="m-auto w-full">
            <div class="my-8">
              <img class="w-64 m-auto" src="~/assets/images/LOGO_new.png" alt="Logo" />
            </div>
            <div class="text-3xl text-center font-semibold">Register</div>

            <div class="my-4 cssform grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <div>
                Laboratory Name
                <input type="text" maxlength="80" v-model="form.labName" placeholder="Enter your Lab Name" />
                <span>{{ err.labName }}</span>
              </div>
              <div>
                Address
                <input type="text" maxlength="100" v-model="form.address" placeholder="Your Place?" />
                <span>{{ err.address }}</span>
              </div>
              <div>
                Contact Name
                <input type="text" maxlength="80" v-model="form.contactName" placeholder="Contact Person Name?" />
                <span>{{ err.contactName }}</span>
              </div>
              <div>
                Contact Number
                <input type="text" maxlength="12" v-model="form.contactNumber" />
                <span>{{ err.contactNumber }}</span>
              </div>
              <div>
                WhatsApp Number
                <input type="text" maxlength="12" v-model="form.whatsappNumber" />
                <span>{{ err.whatsappNumber }}</span>
              </div>
              <div>
                Email
                <input type="email" maxlength="80" v-model="form.email" placeholder="What is your Email Address?" />
                <span>{{ err.email }}</span>
              </div>
            </div>

            <div class="my-4 cssbtn text-center" @click="submitForm">
              Submit
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      form: {
        labName: '',
        address: '',
        contactName: '',
        contactNumber: '',
        whatsappNumber: '',
        email: '',
      },
      err: {
        labName: '',
        address: '',
        contactName: '',
        contactNumber: '',
        whatsappNumber: '',
        email: '',
      },
    }
  },
  methods: {
    validateForm() {
      let valid = true

      // Lab Name
      if (!this.form.labName) {
        this.err.labName = 'Lab Name is required'
        valid = false
      } else this.err.labName = ''

      // Address
      if (!this.form.address) {
        this.err.address = 'Address is required'
        valid = false
      } else this.err.address = ''

      // Contact Name
      if (!this.form.contactName) {
        this.err.contactName = 'Contact Name is required'
        valid = false
      } else this.err.contactName = ''

      // Contact Number
      if (!/^\d{10,12}$/.test(this.form.contactNumber)) {
        this.err.contactNumber = 'Invalid Contact Number'
        valid = false
      } else this.err.contactNumber = ''

      // WhatsApp Number
      if (!/^\d{10,12}$/.test(this.form.whatsappNumber)) {
        this.err.whatsappNumber = 'Invalid WhatsApp Number'
        valid = false
      } else this.err.whatsappNumber = ''

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.err.email = 'Invalid Email'
        valid = false
      } else this.err.email = ''

      return valid
    },
    submitForm() {
      if (this.validateForm()) {
        alert('Form Submitted!\n' + JSON.stringify(this.form, null, 2))
        // Here you can call your API to submit the registration
      }
    },
  },
  head() {
    return {
      title: 'EasyAppts - Register',
    }
  },
}
</script>

<style scoped>
.cssmain {
  min-height: 100%;
}

.cssform input {
  @apply my-2 block p-2 rounded w-full text-sm;
}

.cssform span {
  @apply text-red-700 text-xs;
}

.cssbtn {
  @apply p-2 cursor-pointer transform text-white bg-blue-600 rounded-lg text-center w-32 uppercase mx-auto;
}

.cssbtn:hover {
  @apply scale-110;
}
</style>
