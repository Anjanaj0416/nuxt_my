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

    <FilterTab  @selected="SetSelectedFilter" :arrFilter="leadStore.InitLeads.leadViewItemCount" />
     
    <div
      v-if="leadStore.listLeads.length === 0"
      class="text-center text-gray-900 mt-5 text-sm font-medium"
    >
      <p>No leads available...</p>
    </div>
    <div
      class="flex flex-col gap-2 p-4 mt-3 bg-white border rounded-xl shadow-sm hover:shadow-md "
      v-for="(lead, index) in paginatedLeads"
      :key="index"
    >
    
          {{ leadStore.listLeads.status}}
          <div class="flex justify-between">
      <span
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold"
      >
        ⏳ {{ lead.noofDaysPending }} Days Pending
      </span>
      <span
        :class="{
          'bg-blue-500 text-white font-semibold': lead.status === 'CSOAssigned',
          'bg-amber-500 text-white font-semibold': lead.status === 'Pending',
          'bg-rose-500 text-white font-semibold': lead.status === 'Cancelled',
          'bg-orange-500 text-white font-semibold': lead.status === 'Hold',
          'bg-emerald-500 text-white font-semibold': lead.status === 'Completed',
          'bg-sky-500 text-white font-semibold': lead.status === 'CallLater',
          'bg-violet-500 text-white font-semibold': lead.status === 'Called',
          'bg-lime-600 text-white font-semibold': lead.status === 'Visited',
          'bg-fuchsia-500 text-white font-semibold': lead.status === 'QuotaionSubmited'
        }"
        class="inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full md:hidden"
      >
        {{ lead.status || '—' }}
      </span>
    </div>
      <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between">
        <!-- Vendor Name -->
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Company  Name</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="lead.companyName">{{ lead.companyName }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Address</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="lead.address">{{ lead.address }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Company Phone Number</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="lead.companyPhone">{{ lead.companyPhone }}</span>
            <span v-else class="flex items-center text-sm text-gray-400 ">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">CSO Number</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="lead.csoNo">{{ lead.csoNo }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Reported By</h1>

          <span
            v-if="lead.reportedBy === 'facebook'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700"
          >
          Facebook
          </span>

          <span
            v-else-if="lead.reportedBy === 'linkedin'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700"
          >
          LinkedIn
          </span>

          <span
            v-else-if="lead.reportedBy === 'instagram'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-700"
          >
          Instagram
          </span>

          <span
            v-else-if="lead.reportedBy === 'whatsapp'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-green-100 text-green-700"
          >
          WhatsApp
          </span>

          <span
            v-else-if="lead.reportedBy === 'tiktok'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800"
          >
          TikTok
          </span>

          <span
            v-else-if="lead.reportedBy === 'office'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800"
          >
          Office
          </span>

          <span
            v-else-if="lead.reportedBy === 'my_email'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
          >
          Email
          </span>

          <span
            v-else-if="lead.reportedBy === 'mymobile'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800"
          >
          SMS 
          </span>

          <span
            v-else-if="lead.reportedBy === 'Other'"
            class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800"
          >
          Other
          </span>

          <span v-else-if="lead.reportedBy"
            class="badge bg-gray-200 text-gray-800">
            {{ lead.reportedBy }}
          </span>
        </div>

        <!-- Status -->
       <div class="flex flex-col text-center sm:text-left hidden sm:flex">
          <h1 class="text-xs font-semibold text-gray-600">Status</h1>
          <span
            :class="{
              'bg-blue-500 text-white font-semibold': lead.status === 'CSOAssigned',
              'bg-amber-500 text-white font-semibold': lead.status === 'Pending',
              'bg-rose-500 text-white font-semibold': lead.status === 'Cancelled',
              'bg-orange-500 text-white font-semibold': lead.status === 'Hold',
              'bg-emerald-500 text-white font-semibold': lead.status === 'Completed',
              'bg-sky-500 text-white font-semibold': lead.status === 'CallLater',
              'bg-violet-800 text-white font-semibold': lead.status === 'Called',
              'bg-red-500 text-white font-semibold': lead.status === 'VisitLater',
              'bg-lime-600 text-white font-semibold': lead.status === 'Visited',
              'bg-indigo-700 text-white font-semibold': lead.status === 'Presented',
              'bg-fuchsia-500 text-white font-semibold': lead.status === 'ProposalSubmited'
            }"
            class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
          >
            {{ lead.status || '—' }}
          </span>
        </div>
      </div>

      <div
        class="flex flex-row items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3"
      >
       <LinkBtn  v-if=" (lead.status === 'ProposalSubmited')"
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
      <div v-if="isMore && rowIndex === index">
        <!-- <pre>{{ JSON.stringify(lead, null, 2) }}</pre> -->
        <section class="flex flex-col gap-5 p-4 mt-0 bg-white sm:p-6">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Company Phone Number</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.companyPhone || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 1 Name</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson1Name || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 1 Designation</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson1Designation || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 1 Number</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson1Number || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 1 WhatsAppNo</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson1WhatsApp || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 2 Name</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson2Name || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 2 Designation</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson2Designation || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 2 Number</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.contactPerson2Number || "No Data" }}
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600">Contact Person 2 WhatsAppNo</h2>
              <p class="mt-1 text-xs text-gray-700">
                {{ lead.ContactPerson2WhatsAppNo || "No Data" }}
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
            <div class="">
              <!-- Comment -->
              <h2 class="block text-xs font-semibold text-gray-600">Comment</h2>
              <p
                v-html="formatComment(lead.comment)"
                class="mt-1 text-xs text-gray-700 max-h-[150px] overflow-auto whitespace-pre-wrap break-words"
              ></p>
            </div>
            <div v-if="(lead.tempStatus == 'CallLater'|| lead.tempStatus == 'VisitLater')">
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
            <div v-if="(userStore.loggedUser.granted?.includes('sso') || userStore.loggedUser.granted?.includes('su') || userStore.loggedUser.granted?.includes('cso') || userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('accdept')) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned' || lead.status == 'CallLater' || lead.status == 'Called' || lead.status == 'Visited' || lead.status == 'VisitLater' || lead.status == 'Presented')"
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
            
            <div v-if="(userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('su') || userStore.loggedUser.granted?.includes('sso') || userStore.loggedUser.granted?.includes('cso') || userStore.loggedUser.granted?.includes('accdept')) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned' || lead.status == 'CallLater' || lead.status == 'Called' || lead.status == 'Visited' || lead.status == 'VisitLater' || lead.status == 'Presented')"
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
            v-if="(userStore.loggedUser.granted?.includes('flo') || userStore.loggedUser.granted?.includes('su') || userStore.loggedUser.granted?.includes('sso') || userStore.loggedUser.granted?.includes('cso') || userStore.loggedUser.granted?.includes('accdept')) 
              && (lead.status === 'Pending' || lead.status === 'Hold' || lead.status === 'Cancelled' || lead.status == 'Completed' || lead.status == 'CSOAssigned' || lead.status == 'CallLater' || lead.status == 'Called' || lead.status == 'Visited' || lead.status == 'VisitLater' || lead.status == 'Presented')"
            class="flex justify-end pt-2"
          >
            <button
              class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"
              @click="SetUpdateVendorLead(lead)"
            >
              Update
            </button>
          </div>
        </section>
      </div>
    </div>

     <Pagination
      :total-items="leadStore.listLeads?.length || 0"
      :items-per-page="itemsPerPage"
      :current-page="page"
      @update:currentPage="page = $event"
    />
    

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
import Pagination from "~/components/customcontrol/Pagination.vue";

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
    Pagination
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
      page: 1,
      itemsPerPage: 5, 
      err: { status: "", newComment: "" },
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
    paginatedLeads() {
      if (!this.leadStore.loadListLeads) return [];
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.leadStore.listLeads.slice(start, end);
    },
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
        DateTime: lead.appointmentDateTime || '',
        // isExisitngVisit: lead.blindNewVisit === true || 'false',
        // isBlindNewVisit: lead.exisitngVisit === true || 'false',
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
          if (result.isConfirmed) {
            await this.leadStore.SetUpdateVendorLead(request, this.showLoading);
            this.$emit("close");
          } else {
            console.log("Action canceled");
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
