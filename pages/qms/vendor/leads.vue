<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">Merchant Leads</div>
    <div class="flex flex-col items-center justify-between mt-2 mb-8 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="mr-2">
          <Button class="w-24" label="New" variant="primary" @click="GoToAddNew" />
        </div>
      </div>
      <div class="w-full md:w-auto">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />

    <div v-if="leadStore.listLeads.length === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
      <p>No Leads available...</p>
    </div>

    <div class="flex flex-col gap-5 p-2 mt-2 bg-white border-2 rounded-md shadow-md sm:p-6"
      v-for="(lead, index) in leadStore.listLeads" :key="index">

      <div class="flex justify-start">
        <span
          class="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {{ lead.noofDaysPending }} Days Pending
        </span>
      </div>


      <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between">
        <div class="flex flex-col text-center sm:text-left" v-for="(field, idx) in vendorFields" :key="idx">
          <h1 class="text-base font-semibold text-gray-700">
            {{ field.label }}
          </h1>

          <!-- Conditional rendering -->
          <template v-if="field.key === 'status'">
            <span :class="{
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': lead.status === 'RSOAssigned',
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': lead.status === 'Pending',
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': lead.status === 'Cancelled',
              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300': lead.status === 'Hold',
              'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300': lead.status === 'Completed',
              // 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300': lead.status === 'Rejected'
            }" class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {{ lead.status || 'Unknown' }}
            </span>
          </template>
          <template v-else>
            <p class="text-sm text-gray-500">
              {{ lead[field.key] }} {{ field.secondKey ? lead[field.secondKey] : "" }}
            </p>
          </template>
        </div>

        <hr class="block w-full mt-2 border-gray-300 sm:hidden " />
      </div>

      <!-- Expandable More Section -->
      <div class="flex flex-col items-center gap-2 mt-2 mb-4 sm:flex-row sm:justify-end sm:mb-9 sm:mt-1 sm:-my-6">
        <LinkBtn :label="isMore && rowIndex === index ? 'Less' : 'More'"
          class="text-black dark:bg-transparent dark:text-blue-900 dark:hover:bg-transparent"
          @click="isMore = !isMore; rowIndex = index" />
      </div>


      <!-- Expanded Fields -->
      <div v-if="isMore && rowIndex === index">
        <!-- <pre>{{ JSON.stringify(lead, null, 2) }}</pre> -->

        <section class="flex flex-col gap-5 p-4 mt-2 bg-white sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="text-center sm:text-left" v-for="(field, idx) in showAllFields" :key="idx">
              <h2 class="text-sm font-semibold text-gray-700">{{ field.label }}</h2>

              <template v-if="field.key === 'isActive'">
                <span :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                    lead.isActive === true,
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
                    lead.isActive === false,
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300':
                    lead.isActive === undefined,
                }" class="inline-block px-3 py-1 mt-1 text-xs font-medium rounded-full">
                  {{ lead.isActive === true ? 'Active' : 'InActive' || 'Unknown' }}
                </span>
              </template>
              <template v-else>
                <p :class="['mt-1 text-sm text-gray-500', field.class]">
                  {{ lead[field.key] }} {{ field.secondKey ? lead[field.secondKey] : "" }}
                </p>

              </template>
            </div>
          </div>

          <!-- Editable Fields -->
          <div v-if="userStore.loggedUser.granted?.includes('flo')" class="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div class="w-full sm:w-1/2">
              <selectinput2 v-model="lead.status" :cur_item="lead.status" :selections="leadStore.InitLeads.listStatus"
                :err="err.status" label="Lead Status" />
            </div>
            <div class="w-full sm:w-1/2">
              <h2 class="text-sm font-semibold text-gray-700">Comment</h2>
              <textarea v-model="lead.newComment" class="w-full p-2 border rounded-md resize-none" rows="3"
                placeholder="Add a comment..." />
              <p v-if="err.newComment" class="mt-2 text-sm text-red-600">
                {{ err.newComment }}
              </p>
            </div>
          </div>
          <!-- {{ lead }} -->
          <!-- Action Buttons -->
          <div v-if="userStore.loggedUser.granted?.includes('flo')" class="flex justify-end pt-2">
            <LinkBtn
              class="px-5 py-2 text-sm font-medium transition bg-white border-2 rounded-lg shadow text-blue-950 border-blue-950 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600"
              variant="primary" label="Update" @click="SetUpdateVendorLead(lead)" />
          </div>
        </section>
      </div>
    </div>
    <AddLeads v-if="isAddLeads" @close="isAddLeads = false" />
    <AddRso v-if="isAddRso" :comment="newComment" :leadId="selectedLeadId"
      @close="isAddRso = false; currentRsoLead = null" />

  </section>

</template>

<script>

import FilterTab from "~/components/customcontrol/FilterTab";
import { useUserStore } from "~/stores/modules/userStore";
import SearchComp from "~/components/customcontrol/SearchComp";
import LinkBtn from "~/components/customcontrol/Link";
import selectinput2 from "~/components/customcontrol/selectinput2";
import AddLeads from "~/components/qms/vendor/addLeads";
import Button from "~/components/customcontrol/Button.vue";
import AddRso from "~/components/qms/vendor/assignSalesEx.vue"
import { useLeadStore } from "~/stores/modules/qms/leadStore";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: { FilterTab, SearchComp, LinkBtn, selectinput2, AddLeads, Button, AddRso },
  props: [""],
  data() {
    return {
      arrFilter: ["All", "Pending", "Completed", "Cancelled", "Hold", "RSOAssigned"],
      imageroot: "",
      showLoading: null,
      showAlert: null,
      isAddLeads: false,
      isAddRso: false,
      searchBy: "",
      keyword: "",
      isMore: false,
      newComment: "",
      rowIndex: -1,
      err: { status: '', newComment: '' },
      vendorFields: [
        { label: "Company Name", key: "companyName" },
        { label: "Business Type ", key: "industry" },
        { label: "Company Contact Number", key: "companyPhone" },
        { label: "Company Email", key: "companyEmail" },
        { label: "City", key: "city" },
        { label: "Status", key: "status" },
      ],
      showAllFields: [
        { label: "Company Mobile Number", key: "companyPhone" },
        { label: "Address Line 1", key: "address1" },
        { label: "Address Line 2", key: "address2" },
        { label: "District", key: "district" },
        { label: "Mobile Number", key: "contactMobile" },
        { label: "Website", key: "web" },
        { label: "Business Registration Number", key: "contactPhoneNo" },
        { label: "More Details", key: "" },
        { label: "Contact Person Name", key: "contactPersonFirstName", secondKey: "contactPersonLastname" },
        { label: "Contact Designation", key: "contactDesignation" },
        { label: "Contact Number", key: "contactPhoneNo" },
        { label: "Contact Mobile Number", key: "contactMobile" },
        { label: "Contact Email", key: "contactEmail" },
        { label: "Status", key: "isActive" },
        { label: "Comment", key: "comment", class: "max-h-[150px] overflow-auto whitespace-pre-wrap break-words" },
      ],
    };
  },
  async mounted() { },
  async created() {
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;

    await this.leadStore.GetInitLeads(
      this.showLoading
    );

    await this.leadStore.loadInitVendor(
      this.showLoading
    );

    await this.leadStore.loadListLeads(
      { keyword: "", searchBy: this.searchBy },
      this.showLoading
    );

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;

  },
  watch: {},
  computed: {},
  methods: {

    async GetSearch(searchVal) {
      if (searchVal) {
        this.keyword = searchVal
      } else {
        this.keyword = ""
      }
      console.log("keyword, searchBy", searchVal, this.searchBy);

      await this.leadStore.loadListLeads(
        { keyword: this.keyword, searchBy: this.searchBy },
        this.showLoading
      );

      this.searchBy = "";
      this.keyword = "";

    },

    async SetSelectedFilter(type) {
      this.searchBy = type;
      await this.GetSearch();
    },

    SetUpdateVendorLead(lead) {
      var request = { Id: lead.id, Comment: lead.newComment, Status: lead.status };
      this.newComment = lead.newComment;

      if (this.IsValidate(lead.newComment, lead.status)) {
        if (lead.status === 'RSOAssigned') {
          this.selectedLeadId = lead.id;
          this.isAddRso = true;
          // console.log(this.selectedLeadId);
          return;
        }

        this.$showConfirm(
          "Are you sure you want to update this lead?",
          "warning"
        ).then(async (result) => {
          if (result) {
            await this.leadStore.SetUpdateVendorLead(request, this.showLoading);
          } else {
            // console.log("Action canceled");
          }
        });
      }

    },

    GoToAddNew() {
      this.isAddLeads = true;
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    IsValidate(comment, status) {
      console.log("lead:", comment, status);

      this.clearErr();

      let IsValidate = true;

      if (!status) {
        console.log("status:");
        this.err.status = "Please Select Lead Status!";
        IsValidate = false;
      }

      if (!comment) {
        console.log("comment:");
        this.err.newComment = "Please Enter Comment!";
        IsValidate = false;
      }

      return IsValidate;
    },

  },
  async beforeMount() {

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
