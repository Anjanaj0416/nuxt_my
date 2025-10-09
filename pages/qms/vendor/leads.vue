<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="text-2xl uppercase">Merchant Leads</div>
    <div
      class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row"
    >
      <div class="w-full mb-4 md:mb-0">
        <div class="mr-2">
          <Button
            class="w-24"
            label="New"
            variant="primary"
            @click="GoToAddNew"
          />
        </div>
      </div>
      <div class="w-full md:w-96">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <FilterTab @selected="SetSelectedFilter" :arrFilter="leadStore.InitLeads.leadViewItemCount" />
     
    <div
      v-if="leadStore.listLeads.length === 0"
      class="text-center text-gray-900 mt-5 text-sm font-medium"
    >
      <p>No leads available...</p>
    </div>
    <div
      class="flex flex-col gap-2 p-4 mt-3 bg-white border rounded-xl shadow-sm hover:shadow-md "
      v-for="(lead, index) in leadStore.listLeads"
      :key="index"
    >
<!-- {{ leadStore.listLeads }} -->

      <div class="flex justify-start">
        <span
          class="inline-block px-2 py-1 text-[12px] font-medium text-blue-800 bg-blue-100 rounded-full"
        >
          ⏳ {{ lead.noofDaysPending }} Days Pending
        </span>
      </div>

      <div
        class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between"
      >
        <div
          class="flex flex-col text-center sm:text-left"
          v-for="(field, idx) in vendorFields"
          :key="idx"
        >
          <h1 class="text-xs font-semibold text-gray-600">
            {{ field.label }}
          </h1>

          <!-- Conditional rendering -->
          <template v-if="field.key === 'status'">
            <span
              :class="{
                'bg-green-100 text-green-700 ': lead.status === 'CSOAssigned',
                'bg-yellow-100 text-yellow-800 ': lead.status === 'Pending',
                'bg-red-100 text-red-800 ': lead.status === 'Cancelled',
                'bg-orange-100 text-orange-800 ': lead.status === 'Hold',
                'bg-teal-100 text-teal-800 ': lead.status === 'Completed',
                // 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300': lead.status === 'Rejected'
              }"
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
            >
              {{ lead.status  }}
            </span>
          </template>
          <template v-else>
            <p class="text-xs text-gray-500 mt-0.5" v-if="lead[field.key] || field.secondKey && lead[field.secondKey]">
              {{ lead[field.key] || '—' }}
              {{ field.secondKey ? lead[field.secondKey] || '' : '' }}
            </p>
            <p v-else class="text-sm text-gray-500 mt-0.5 italic">No Data</p>
          </template>
        </div>

        <hr class="block w-full mt-2 border-gray-300 sm:hidden" />
      </div>

      <!-- Expandable More Section -->
      <div
        class="flex flex-col items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3"
      >
     
       <LinkBtn  v-if=" lead.csoNo!=''"
          label="View Order"
          class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900"
          @click="GoToOrder(lead.vendorId)"
        />
       
        <LinkBtn
          :label="isMore && rowIndex === index ? 'Less' : 'More'"
          class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900"
          @click="
            isMore = !isMore;
            rowIndex = index;
          "
        />
      </div>

      <!-- Expanded Fields -->
      <div v-if="isMore && rowIndex === index">
        <!-- <pre>{{ JSON.stringify(lead, null, 2) }}</pre> -->

        <section class="flex flex-col gap-5 p-4 mt-0 bg-white sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-7">
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person Number</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPhoneNo || "No Data" }}
              </p>
            </div>

            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Reported By</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.reportedBy || "No Data" }}
              </p>
            </div>

            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Created Date</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.createdDate || "No Data" }}
              </p>
            </div>

            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Visit Type</h2>
              <p class="mt-1 text-xs text-gray-700">
                 {{ lead.isBlindVisit === true ? "Blind Visit" : lead.isNewVisit === true ? "Office Visit" : "No Data" }}
              </p>
            </div>

            <div v-if="lead.isBlindVisit === true" class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Blind New Visit</h2>
              <p v-if="lead.isBlindNewVisit === true" class="mt-1 text-xs text-gray-700">
                {{ lead.blindNewVisit_Time }}
              </p>
              <div v-if="lead.isBlindNewVisit === false" class="mt-1 text-xs text-gray-700 flex items-center gap-2">
                <input
                  v-model="lead.blindNewVisit"
                  type="checkbox"
                  class="w-3.5 h-3.5 accent-blue-600 rounded border-gray-400 focus:ring-1 focus:ring-blue-400"
                />
                <label for="blindVisit" class="text-xs font-medium text-gray-600 select-none">
                  yes 
                </label>
              </div>
            </div>

            <div v-if="lead.isBlindNewVisit === true || lead.isNewVisit === true" class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Exisitng Visit</h2>
              <p v-if="lead.isExisitngVisit === true" class="mt-1 text-xs text-gray-700">
                {{ lead.exisitngVisit_Time || "-" }}
              </p>
              <div v-if="lead.isBlindNewVisit === false" class="mt-1 text-xs text-gray-700 flex items-center gap-2">
                <input
                  v-model="lead.exisitngVisit"
                  type="checkbox"
                  class="w-3.5 h-3.5 accent-blue-600 rounded border-gray-400 focus:ring-1 focus:ring-blue-400"
                />
                <label class="text-xs font-medium  text-gray-600 ">
                  Yes
                </label>
              </div>
            </div>

            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Status</h2>
              <span
                :class="{
                  'bg-green-100 text-green-800': lead.isActive === true,
                  'bg-red-100 text-red-800': lead.isActive === false,
                  'bg-gray-100 text-gray-800': lead.isActive === undefined,
                }"
                class="inline-block px-3 py-1 mt-1 text-xs font-medium rounded-full"
              >
                {{ lead.isActive === true ? "Active" : lead.isActive === false ? "Inactive" : "Unknown" }}
              </span>
            </div>

            
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div class="text-center sm:text-left">
              <!-- Comment -->
              <h2 class="block text-xs font-semibold text-gray-600">Comment</h2>
              <p
                v-html="formatComment(lead.comment)"
                class="mt-1 text-xs text-gray-700 max-h-[150px] overflow-auto whitespace-pre-wrap break-words"
              ></p>
            </div>
            <div>
              <h2 class="block text-xs font-semibold text-gray-600 mb-1">
                Date and Time
              </h2>
              <input
                type="datetime-local"
                v-model="lead.appointmentDateTime"
                class="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-48 sm:w-60"
              />
            </div>
          </div>
          <!-- Editable Fields -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div v-if="(userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('su') ) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned')"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <!-- Job Status -->
              <div>
                <label class="block text-xs font-semibold text-gray-600">Job Status</label>
                <select
                  v-model="lead.tempStatus"
                  class="mt-1 w-full p-2 text-xs border rounded-md bg-white focus:ring-2 focus:ring-indigo-400"
                >
                  <option disabled value="">Select Status</option>
                  <option
                    v-for="status in leadStore.InitLeads.listStatus"
                    :key="status"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>
            </div>
            
            <div v-if="(userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('su') || userStore.loggedUser.granted?.includes('sso')) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned')"
              class="w-full sm:w-1/2"
            >
              <h2 class="block text-xs font-semibold text-gray-600">Comment</h2>
              <textarea
                v-model="lead.newComment"
                class="w-full p-2 text-xs border rounded-md bg-white mt-1 focus:ring-2 focus:ring-indigo-400 resize-none"
                rows="3"
                placeholder="Add a comment..."
              />
              <p v-if="err.newComment" class="mt-2 text-sm text-red-600">
                {{ err.newComment }}
              </p>
            </div>
          </div>
       
          <!-- Action Buttons -->
          <div
            v-if="(userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('su') || userStore.loggedUser.granted?.includes('sso')) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned')"
            class="flex justify-end pt-2"
          >
            <LinkBtn
              class="px-5 py-2 text-xs font-semibold transition bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
              variant="primary"
              label="Update"
              @click="SetUpdateVendorLead(lead)"
            />
          </div>
        </section>
      </div>
    </div>
    <AddLeads v-if="isAddLeads" @close="isAddLeads = false" />
    <AddRso
      v-if="isAddRso"
      :comment="newComment"
      :leadId="selectedLeadId"
      @close="
        isAddRso = false;
        currentRsoLead = null;
      "
    />
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
import AddRso from "~/components/qms/vendor/assignSalesEx.vue";
import { useLeadStore } from "~/stores/modules/qms/leadStore";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {
    FilterTab,
    SearchComp,
    LinkBtn,
    selectinput2,
    AddLeads,
    Button,
    AddRso,
  },
  props: [""],
  data() {
    return {
     
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
      err: { status: "", newComment: "" },
      vendorFields: [
        { label: "Company Name", key: "companyName" },
        { label: "Address ", key: "address" },
        { label: "Company Contact Number", key: "companyPhone" },
        { label: "CSO Number", key: "csoNo" },
        // { label: "City", key: "city" },
        { label: "Status", key: "status" },
      ],
    };
  },
  async mounted() {},
  async created() {
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;

    await this.leadStore.GetInitLeads(this.showLoading);

    await this.leadStore.loadInitVendor(this.showLoading);

    await this.leadStore.loadListLeads(
      { keyword: "", searchBy: this.searchBy },
      this.showLoading
    );

    this.leadStore.listLeads.forEach((lead) => {
      lead.tempStatus = lead.status; // for select input
    });


    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
  },
  watch: {},
  computed: {
  //   arrFilter() {
  //   const counts = this.leadStore.leadsCount || {};
  //   return [
  //     { itemName: "All", itemCount: counts || 0 },
  //     { itemName: "Pending", itemCount: counts || 0 },
  //     { itemName: "Completed", itemCount: counts || 0 },
  //     { itemName: "Cancelled", itemCount: counts || 0 },
  //     { itemName: "Hold", itemCount: counts || 0 },
  //     { itemName: "CSO Assigned", itemCount: counts || 0 },
  //   ];
  // },
  },
  methods: {
      GoToOrder(vendorId){         
          this.$router.push('/qms/vendor?p='+vendorId)
      },
    
    async GetSearch(searchVal) {
      if (searchVal) {
        this.keyword = searchVal;
      } else {
        this.keyword = "";
      }
      // console.log("keyword, searchBy", searchVal, this.searchBy);
      await this.leadStore.GetInitLeads(this.showLoading);
      await this.leadStore.loadListLeads(
        { keyword: this.keyword, searchBy: this.searchBy },
        this.showLoading
      );

      this.searchBy = "";
      this.keyword = "";
    },

    formatComment(comment) {
      return comment ? comment.replace(/\n/g, "<br><br>") : "No Data";
    },

    async SetSelectedFilter(type) {
      this.searchBy = type;
      await this.GetSearch();
    },

    SetUpdateVendorLead(lead) {
      var request = {
        Id: lead.id,
        Comment: lead.newComment || '' ,
        Status: lead.tempStatus,
        AppointmentDateTime: lead.appointmentDateTime || '',
        isExisitngVisit: lead.blindNewVisit === true || 'false',
        isBlindNewVisit: lead.exisitngVisit === true || 'false',
      };
      this.newComment = lead.newComment;

      if (this.IsValidate(lead.status)) {
        if (lead.tempStatus === "CSOAssigned") {
          this.selectedLeadId = lead.id;
          this.isAddRso = true;
          // console.log(this.selectedLeadId);
          return;
        }
        console.log(request);
        this.$showConfirm(
          "Are you sure to update this lead?",
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

    IsValidate(status) {
      this.clearErr();

      let IsValidate = true;

      if (!status) {
        this.err.status = "Please Select Lead Status!";
        IsValidate = false;
      }

      return IsValidate;
    }

  },

  

  // async beforeMount() {
  //   const granted = this.userStore.loggeduser?.granted || [];

  //   if (granted.includes('su')) {
  //     this.$router.push('/user/login');
  //     this.$showToast('Not allowed to access this page');
  //   }
  // },


  
 	
  async beforeMount() {
    const granted = this.userStore.loggedUser?.granted || [];

    if (granted.includes('dtp') || granted.includes('dtp')) {
      this.$router.push('/user/login');
      this.$showToast('Not Allowed to access this page');
    }
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
