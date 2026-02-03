<template>
    <section>
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-default">
            <table class="w-full text-sm text-left rtl:text-right text-body">
                <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Partner
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedList" :key="item.id" class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                        <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            {{ item.date }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.no }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.partner }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.amount }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.status }}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-fg-brand hover:underline">View /</a>
                            <a href="#" class="font-medium text-fg-brand hover:underline"> Edit /</a>
                            <a href="#" class="font-medium text-fg-brand hover:underline"> Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav
                class="flex items-center justify-end px-4 py-2"
                aria-label="Table navigation"
            >
            <Smallpagination
                :total="dataList.length"
                :perPage="perPage"
                :currentPage="currentPage"
                :color="color"
                @update:page="currentPage = $event"
            />
            </nav>

        </div>

    </section>

</template>
  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import LinkBtn from "~/components/customcontrol/Link";
 import Button from "~/components/customcontrol/Button";
 import selectinput2 from "~/components/customcontrol/selectinput2";
 import Smallpagination from './smallpagination.vue';

 definePageMeta({
    layout: 'default',   
    //middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,Smallpagination},
    props:{
        dataList: {
            type: Array,
            required: true
        },
          color: {
            type: String,
            default: '#bbd151' // default color if not provided
        }
    },
    data() {
      return {
        imageroot: "",
        showLoading: null,
        currentPage: 1,
        perPage: 6,
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      
    },
    watch: {},
    computed: {
        paginatedList() {
            const start = (this.currentPage - 1) * this.perPage
            return this.dataList.slice(start, start + this.perPage)
        }
    },

    methods: {
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
  
  
  