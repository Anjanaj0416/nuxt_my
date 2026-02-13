<template>
  <section>
    <div class="row">
      <div class="flex flex-wrap">
        <div class="csscell">
          <!-- start first row (view-only) -->
          <div class="cssfirstrow mx-auto grid grid-cols-2 lg:grid-cols-5 gap-x-2" v-show="!ismodeedit && !ismore">
            <div class="w-32">
              <div class="text-sm text-white">Field 1</div>
              <div>{{ item.field1 }}</div>
            </div>
            <div class="w-32">
              <textinput mode="view" ctrltype="text" label="Field 2" v-model="item.field2" maxlength="20"/>
            </div>
            <div class="w-32">
              <textinput mode="view" ctrltype="text" label="Field 3" v-model="item.field3" maxlength="20"/>
            </div>
            <div class="w-32">
              <div class="text-sm text-white">Date</div>
              <div>{{ $options.filters.toShortDate(item.dateField) }}</div>
            </div>
            <div class="w-32">
              <textinput mode="view" ctrltype="text" label="Status" v-model="item.status" maxlength="20"/>
            </div>
          </div>
          <!-- end first row -->

          <!-- start second row (edit/more) -->
          <div class="csssecondrow mx-auto grid grid-cols-2 lg:grid-cols-5 gap-x-2" v-show="ismore || ismodeedit">
            <div class="w-32">
              <dynamicsearchinput
                v-if="mode=='edit'"
                :arrItems="searchItems"
                v-model="item.field1"
                label="Field 1"
                :err="err.field1"
                @LoadItems="loadSearchItems"
                @selectedItem="field1Selected"
              />
              <div v-else>
                <div class="text-sm text-white">Field 1</div>
                <div>{{ item.field1 }}</div>
              </div>
            </div>
            <div class="w-32">
              <textinput :mode="mode" ctrltype="text" label="Field 2" v-model="item.field2" :err="err.field2" maxlength="20"/>
            </div>
            <div class="w-32">
              <textinput :mode="mode" ctrltype="text" label="Field 3" v-model="item.field3" :err="err.field3" maxlength="20"/>
            </div>
            <div class="w-32">
              <textinput v-if="mode=='edit'" mode="edit" ctrltype="date" label="Date" v-model="item.dateField" :err="err.dateField"/>
              <div v-else>
                <div class="text-sm text-white">Date</div>
                <div>{{ $options.filters.toShortDate(item.dateField) }}</div>
              </div>
            </div>
            <div class="w-32">
              <textinput :mode="mode" ctrltype="text" label="Status" v-model="item.status" :err="err.status" maxlength="20"/>
            </div>
          </div>
          <!-- end second row -->
        </div>

        <div class="cssfcontrol lg:flex lg:gap-4">
          <div class="clickable" title="more.." @click="ismore = !ismore">
            <!-- More Icon -->
          </div>
          <div class="clickable" title="edit.." @click="getEdit()">
            <!-- Edit Icon -->
          </div>
          <div v-show="ismodeedit" class="clickable" title="Cancel Edit.." @click="getcancel()">
            <!-- Cancel Icon -->
          </div>
          <div class="clickable" title="delete.." @click="getdelete()">
            <!-- Delete Icon -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import textinput from '~/components/customcontrol/textinputExtend'
import dynamicsearchinput from '~/components/customcontrol/dynamicsearchinput'
import { mapState, mapActions } from 'vuex'

export default {
  components: { textinput, dynamicsearchinput },
  props: ['item'],
  data() {
    return {
      ismodeedit: false,
      ismore: false,
      editing_row: {},
      err: {
        field1: '',
        field2: '',
        field3: '',
        dateField: '',
        status: ''
      }
    }
  },
  computed: {
    mode() {
      return this.ismodeedit ? 'edit' : 'view'
    },
    ...mapState({
      searchItems: (state) => state.someModule.searchItems
    })
  },
  methods: {
    ...mapActions({
      loadSearchItems: 'someModule/loadSearchItems'
    }),
    formValidate() {
      let isValid = true
      if (!this.item.field1) { this.err.field1 = 'Required'; isValid = false } else this.err.field1 = ''
      if (!this.item.field2) { this.err.field2 = 'Required'; isValid = false } else this.err.field2 = ''
      if (!this.item.field3) { this.err.field3 = 'Required'; isValid = false } else this.err.field3 = ''
      if (!this.item.dateField) { this.err.dateField = 'Required'; isValid = false } else this.err.dateField = ''
      if (!this.item.status) { this.err.status = 'Required'; isValid = false } else this.err.status = ''
      return isValid
    },
    getEdit() {
      if (this.ismodeedit && this.formValidate() && confirm('Save changes?')) {
        this.ismodeedit = false
        this.$emit('saveItem', this.item)
      } else {
        this.ismodeedit = true
        this.ismore = true
        this.editing_row = this.getCloneItem()
      }
    },
    getcancel() {
      this.ismodeedit = false
      this.item = this.editing_row
    },
    getdelete() {
      if (confirm('Delete this item?')) this.$emit('deleteItem', this.item)
    },
    getCloneItem() {
      return JSON.parse(JSON.stringify(this.item))
    },
    field1Selected(selectedItem) {
      this.item.field1 = selectedItem
    }
  }
}
</script>

<style scoped>
.row { @apply shadow-2xl my-1 rounded p-2 relative; }
.cssfcontrol { @apply flex-none font-bold absolute top-0 right-0 pt-4 pr-4; }
.cssfcontrol > div { @apply mb-2 cursor-pointer uppercase text-white; }
.cssfcontrol > div:hover { @apply text-gray-500 font-bold; }
</style>
