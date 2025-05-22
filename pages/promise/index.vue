<template>
  <section class="justify-center min-h-screen px-4 mt-16 mb-20 lg:px-80">
    <div class="text-2xl uppercase">Adding Promise.lk Data</div>

    <div class="flex flex-col items-center justify-between mt-8 mb-8 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="mr-2">
          <Button class="w-24" label="New" variant="primary" @click="showAddEdit" />
        </div>
      </div>
      <div class="w-full md:w-auto">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />

    <!-- Merchant List -->
    <div
      v-for="(vendor, index) in dataList"
      :key="index"
      class="flex flex-col gap-5 p-4 mt-4 bg-white border rounded-lg shadow-sm sm:p-6"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-6 sm:grid-cols-3 md:grid-cols-8">
          <div
            class="flex flex-col text-center sm:text-left"
            v-for="(field, idx) in dataFields"
            :key="idx"
          >
            <h1 class="text-sm font-semibold text-gray-700">{{ field.label }}</h1>
            <p v-if="field.key && field.key !== 'isActive'" class="mt-2 text-xs text-gray-600">
              {{ vendor[field.key] }}
            </p>
            <span
              v-else-if="field.key === 'isActive'"
              class="text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mt-1"
              :class="vendor.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ vendor.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 mt-2 mb-4 sm:flex-row sm:justify-end sm:mb-4 sm:mt-1 sm:-my-6">
        <LinkBtn
          :label="rowIndex === index ? 'Less' : 'More'"
          class="text-black dark:bg-transparent dark:text-blue-900 dark:hover:bg-transparent"
          @click="toggleMore(index)"
        />
            <LinkBtn label="Edit" @click="showAddEdit(vendor)" />

      </div>

      <!-- Expanded Fields -->
      <div v-if="rowIndex === index" class="w-full">
        <section class="flex flex-col gap-5 p-4 mt-2 bg-white sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              class="text-center sm:text-left"
              v-for="(field, idx) in showAllFields"
              :key="idx"
            >
              <h2 class="text-sm font-semibold text-gray-700">{{ field.label }}</h2>
              <template v-if="field.key === 'isActive'">
                <span
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                      vendor.isActive === true,
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
                      vendor.isActive === false,
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300':
                      vendor.isActive === undefined,
                  }"
                  class="inline-block px-3 py-1 mt-1 text-xs font-medium rounded-full"
                >
                  {{ vendor.isActive || 'Unknown' }}
                </span>
              </template>
              <template v-else>
                <p class="mt-1 text-sm text-gray-500">
                  {{ vendor[field.key] }} {{ field.secondKey ? vendor[field.secondKey] : '' }}
                </p>
              </template>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal -->
    <AddEdit v-if="isAddEdit" @close="isAddEdit = false" />
  </section>
</template>

<script>
import FilterTab from "~/components/customcontrol/FilterTab";
import SearchComp from "~/components/customcontrol/SearchComp";
import LinkBtn from "~/components/customcontrol/Link";
import Button from "~/components/customcontrol/Button.vue";
import AddEdit from "~/pages/promise/addEditData.vue";

definePageMeta({
  layout: "promise",
  middleware: "auth",
});

export default {
  components: {
    FilterTab,
    SearchComp,
    LinkBtn,
    Button,
    AddEdit,
  },
  data() {
    return {
      arrFilter: ["Pending", "Completed", "Cancelled", "Hold"],
      isAddEdit: false,
      rowIndex: -1,
      dataList: [
          {
            businessRegistrationAuthority: "Pr001",
            businessName: "Promise LK",
            country: "John Doe",
            businessRegistrationNo: "john@promise123",
            typeOfOrganization: "Manager",
            registeredAddress: "Colombo",
            street: "of4",
            registrationNo: "9745874v",
            province: "123",
            state: "test",
            website: "test",
            email: "john@promise.lk",
            OfficerEmail: "jane@futuretech.com",
            officialTelephoneNo: "456",
            passportNo: "tex45",
            isActive: true
          },
          {
            businessRegistrationAuthority: "Pr002",
            businessName: "Future Tech",
            country: "Jane Smith",
            businessRegistrationNo: "jane@futuretech123",
            typeOfOrganization: "Director",
            registeredAddress: "Colombo",
            street: "123",
            registrationNo: "9745874v",
            province: "123",
            state: "test",
            website: "test",
            email: "jane@futuretech.com",
            OfficerEmail: "jane@futuretech.com",
            officialTelephoneNo: "456",
            passportNo: "tex45",
            isActive: false
          },
      ],
      dataFields: [
        { label: "Business  Authority", key: "businessRegistrationAuthority" },
        { label: "Business Name", key: "businessName" },
        { label: "Country", key: "country" },
        { label: "Business Registration No", key: "businessRegistrationNo" },
        { label: "Type of Organization", key: "typeOfOrganization" },
        { label: "Status", key: "isActive" },
        { label: " ", key: "" },
        { label: "", key: "" },
      ],
      showAllFields: [
        { label: "Registered Address", key: "registeredAddress" },
        { label: "Street", key: "street" },
        { label: "registeredAddress", key: "registeredAddress" },
        { label: "Province", key: "province" },
        { label: "State", key: "state" },
        { label: "Website", key: "website" },
        { label: "Email", key: "email" },
        { label: "Telephone No.", key: "officialtelephoneno" },
        { label: "Passport No", key: "PassportNo" },
        { label: "Officer Name", key: "country" },
        { label: "officialtelephoneno", key: "officialtelephoneno" },
        { label: "Mobile phone No ", key: "PassportNo" },
        { label: "Officer Email", key: "OfficerEmail" },
      ],
    };
  },
  methods: {
    showAddEdit() {
      this.isAddEdit = true;
    },
    toggleMore(index) {
      this.rowIndex = this.rowIndex === index ? -1 : index;
    },
  },
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
  },
};
</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}
.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>
