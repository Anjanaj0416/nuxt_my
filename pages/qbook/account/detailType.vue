<template>
  <section >
    <div class="text-2xl text-bolt">Detail Type</div>
      <div class="mt-6 mb-2 flex flex-col gap-4 rounded-xl order bg-white  md:flex-row md:items-center md:justify-between">
        <!-- Left Content -->
        <div class="flex items-center gap-3">
        </div>
        <div>
            <button
                @click="GoToAddNew"
                type="button"
                class="group inline-flex items-center gap-2 rounded-lg bg-[#bbd151] px-3 py-2 text-sm font-medium text-black" 
            >
            <svg class="h-4 w-4 transition group-hover:rotate-90" fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Detail Type
            </button>
        </div>
      </div>
      <div v-if="qbookStore.detailTypeList?.length === 0">
        <p class="text-center text-gray-500 py-6">
          No Detail Types Found...
        </p>
      </div>
      <div v-else class="my-8">
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-default">
            <table class="w-full text-sm text-left rtl:text-right text-body">
                <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Name
                      </th>

                      <th scope="col" class="px-6 py-3">
                          AccountType Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedList" :key="item.id" class="bg-neutral-primary-soft border-b text border-default hover:bg-neutral-secondary-medium">
                        <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            {{ item.name || '-' }}
                        </th> 
                        <td class="px-6 py-4">
                            {{ item.accountTypeName || '-' }}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-fg-brand hover:underline">View /</a>
                            <a href="#" class="font-medium text-fg-brand hover:underline"> Edit /</a>
                            <button @click="DeleteDetailType"  class="font-medium text-fg-brand hover:underline"> Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav
                class="flex items-center justify-end px-4 py-2"
                aria-label="Table navigation"
            >
            <Smallpagination
                :total="qbookStore.detailTypeList.length"
                :perPage="perPage"
                :currentPage="currentPage"
                :color="color"
                @update:page="currentPage = $event"
            />
            </nav>

        </div>
      </div>
      <AddDetailType v-if="isAddDetailType" @close="isAddDetailType = false"  />
  </section>
</template>

  
<script>

  import selectinput2 from "~/components/customcontrol/selectinput2";
  import AddDetailType from "~/components/Q-Book/account/addDetailType.vue";
  import { useUserStore } from "~/stores/modules/userStore";
  import { useQbookStore } from "~/stores/modules/qbook/qbookStore";
  import Smallpagination from "~/components/customcontrol/smallpagination.vue"

  definePageMeta({
    layout: 'qbooklogin',   
    middleware: 'auth-ebook',
   });
   
  export default {
    
    components: {selectinput2,AddDetailType,Smallpagination},
    props:{
      color: {
        type: String,
        default: '#bbd151'
    }
    },
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddDetailType: false,
        currentPage: 1,
        perPage: 6,
      }
    },
    async mounted() {
     
    },
    async created() {
      this.useStore = useUserStore();
      this.qbookStore = useQbookStore();
      this.QbookshowLoading = this.$QbookshowLoading;
     
      await this.qbookStore.getDetailTypeList({ keyword: "", searchBy: ""}, this.QbookshowLoading)
      
    },
    watch: {},
    computed: {
        paginatedList() {
            const start = (this.currentPage - 1) * this.perPage
            return this.qbookStore.detailTypeList.slice(start, start + this.perPage)
        }
    },
    methods: {
      GoToAddNew() {
        this.isAddDetailType = true;
      },

      async DeleteDetailType() {
        const result = await this.$showDeteleConfirmbqbook(
          "Are you sure to delete this Chart Of Account?",
          "Please provide a delete reason",
          "warning"
        );

        if (!result.isConfirmed) return;

        const deleteReason = result.value;

        // const formData = new FormData();
        // formData.append("invoiceId", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
        // formData.append("cancelReason", deleteReason);

        const req = {
            id : "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            cancelReason : deleteReason,
        };

        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        await this.qbookStore.setDeleteDetailType(req, this.QbookshowLoading)

        this.closeModalAfterSubmit();
      },

     
    },
    async beforeMount() {
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }
    
</script>


  
  <style scoped>

  </style>
  
  
  