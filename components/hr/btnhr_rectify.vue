<template>
  <section>
    <div class="flex gap-x-2">
      <!-- Rectify -->
      <div
        v-show="!iseditview"
        @click="click"
        class="
          p-1
          border-gray-500 rounded p-2
          rounded-md
          text-center
          cursor-pointer
          font-bold
          flex
          gap-x-1
          hover:bg-blue-500 hover:text-white
        "
      >
        <div>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg> -->
        </div>
        <div>Rectify</div>
      </div>

      <!-- Save -->
      <div
        v-show="rowid == rectifingrow && iseditview"
        class="
          p-1
          border-gray-500 rounded p-2
          rounded-md
          text-center
          cursor-pointer
          font-bold
          flex
          gap-x-1
          hover:bg-blue-500 hover:text-white
        "
        @click="save_rectification"
      >
        <div>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg> -->
        </div>
        <div>Save</div>
      </div>

      <!-- Cancel -->
      <div
        v-show="rowid == rectifingrow && iseditview"
        @click="canceledit"
        class="
          p-1
          border-gray-500 rounded p-2
          rounded-md
          text-center
          cursor-pointer
          font-bold
          flex
          gap-x-1
          hover:bg-blue-500 hover:text-white
        "
      >
        <div>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg> -->
        </div>
        <div>Cancel</div>
      </div>
    </div>
    <!-- {{iseditview}}
  {{rowid}}
  {{rectifingrow}} -->
  </section>
</template>

<script>
export default {
  props: ['rectifingrow', 'rowid'],
  data() {
    return {
      iseditview: false,
    }
  },
  methods: {
    click() {
      this.$emit('click')
      this.iseditview = true
    },
    canceledit() {

      this.$emit('canceledit')
      this.iseditview = false
    },
    save_rectification() {
      if (confirm('Sure to Rectify this Attendence Record ?')) {
        this.$emit('save_rectification', this.rowid)
        this.iseditview = false
      }
    },
  },
}
</script>

<style>
</style>
