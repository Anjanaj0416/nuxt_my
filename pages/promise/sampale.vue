<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">Adding Promise.lk Data</div>

    <!-- Top Action Area -->
    <div class="flex flex-col items-center justify-between mt-8 mb-8 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <Button 
            class="w-24" 
            label="New" 
            variant="primary" 
            @click="showAddEdit" 
        />
      </div>
      <div class="w-full md:w-auto">
        <SearchComp />
      </div>
    </div>

    <div
        v-for="(vendor, index) in dataList"
        :key="index"
        class="flex flex-col gap-5 p-4 mt-4 bg-white border rounded-lg shadow-sm sm:p-6"
    >
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
            <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-8 sm:grid-cols-3 md:grid-cols-8">
                <div
                    class="flex flex-col text-center sm:text-left"
                    v-for="(field, idx) in dataFields"
                    :key="idx"
                >
                    <h1 class="text-sm font-semibold text-gray-700">{{ field.label }}</h1>

                    <!-- Show actual field value if key exists -->
                    <p v-if="field.key && field.key !== 'isActive'" class="text-xs text-gray-600">
                    {{ vendor[field.key] }}
                    </p>

                    <!-- Show status -->
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
        <div  class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end sm:gap-4">
            <LinkBtn label="Edit" @click="showAddEdit(vendor)" />
            <LinkBtn label="Edit" @click="showAddEdit(vendor)" />
        </div>

    </div>


    <!-- Modals -->
    <AddEdit v-if="isAddEdit" @close="isAddEdit = false" />
    <AssignRso v-if="isAssignRso" @close="isAssignRso = false" />
  </section>
</template>

<script>
import Button from "~/components/customcontrol/Button";
import SearchComp from "~/components/customcontrol/SearchComp";
import FilterTab from "~/components/customcontrol/FilterTab";
import LinkBtn from "~/components/customcontrol/Link";
import AddEdit from "~/pages/promise/addEditData.vue";
import AssignRso from "~/components/qms/vendor/assignSalesEx";

export default {
  components: {
    Button,
    SearchComp,
    FilterTab,
    LinkBtn,
    AddEdit,
    AssignRso,
  },
  data() {
    return {
      arrFilter: ["All", "Not Assigned", "Active", "Inactive", "Phone", "Shopname"],
      isAddEdit: false,
      isAssignRso: false,
      isMore: false,
      dataList: [
        {
            customerId: "1",
            vendorName: "Promise LK",
            officerName: "John Doe",
            officerEmail: "john@promise.lk",
            officerPosition: "Manager",
            isActive: true,
        },
        {
            customerId: "2",
            vendorName: "Future Tech",
            officerName: "Jane Smith",
            officerEmail: "jane@futuretech.com",
            officerPosition: "Director",
            isActive: false,
        },
      ],
      dataFields: [
        { label: "Registration  ID", key: "customerId" },
        { label: "Vendor", key: "vendorName" },
        { label: "Officer Name", key: "officerName" },
        { label: "Officer Email", key: "officerEmail" },
        { label: "Officer Position", key: "officerPosition" },
        { label: "Status", key: "isActive" },
        { label: " ", key: "" },
        { label: "", key: "" },
      ],
            showAllFields: [
        { label: "City", key: "city" },
        { label: "Officer Title Id", key: "officerId"},
        { label: "Officer NIC", key: "nic" },
        { label: "Officer PASSPORT", key: "offPas" },
        { label: "Officer First Name", key: "firstName" },
        { label: "Officer Last Name", key: "lastName" },
        { label: "Business Registration Number", key: "bRN" },
        { label: "Tax Identification Number", key: "taxIn" },
        { label: "NMRA Registration Number", key: "NmraRegister" },
        { label: "CIDA Registration Number", key: "contactDesignation" },
      ],
    };
  },
  methods: {
    showAddEdit() {
      this.isAddEdit = true;
    },
  },
};
</script>

<style scoped>
/* Optional Utility Styling */
</style>
