<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 z-30 bg-black bg-opacity-50" @click="$emit('close-sidebar')"></div>
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]" role="navigation" :aria-hidden="!isOpen">
      <!-- Top Navbar -->
      <div class="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-2">
            <!-- hide Img -->
          <img src="/assets/img/LogoDigitalTechLab.png" alt="Logo" class="h-auto rounded-full w-28" />
        </router-link>
        <!-- Close Button -->
        <button @click="$emit('close-sidebar')"
          class="p-2 text-white transition duration-200 rounded-full hover:bg-gray-700 focus:outline-none"
          aria-label="Close Sidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Subheader -->
      <div class="flex items-center justify-between px-6 py-3 text-white bg-gradient-to-r from-gray-800 to-gray-700">
        <h1 class="text-xl font-semibold tracking-wide">INTRANET</h1>
      </div>
      <nav class="p-4">
        <div v-for="link in filteredLinks" :key="link.name">


          <!-- Top-level link or menu -->
          <div v-if="link.submenu">
            <div @click="toggleSubmenu(link.name)"
              class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path :d="link.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
                <span>{{ link.name }}</span>
              </div>
              <svg :class="{ 'rotate-90': isSubmenuOpen(link.name) }" class="w-4 h-4 transition-transform duration-200"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen(link.name)" class="pl-4 mt-1 space-y-1">
              <div v-for="submenu in link.submenu" :key="submenu.name">
                <div v-if="submenu.submenu">
                  <div @click="
                    toggleSubmenu(submenu.name);
                  // $emit('close-sidebar');
                  "
                    class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                    <span>{{ submenu.name }}</span>
                    <svg :class="{ 'rotate-90': isSubmenuOpen(submenu.name) }"
                      class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>

                  <!-- Level 3 submenu -->
                  <div v-show="isSubmenuOpen(submenu.name)" class="pl-4 space-y-1">
                    <router-link v-for="child in submenu.submenu" :key="child.name" :to="child.to"
                      class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                      @click.native="$emit('close-sidebar')">
                      {{ child.name }}
                    </router-link>
                  </div>
                </div>

                <!-- No child submenu -->
                <router-link v-else :to="submenu.to"
                  class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                  @click.native="$emit('close-sidebar')">

                  <span v-if="submenu.name === 'Upload Document'" @click="GetOpenRegistryFtp(submenu.to)">{{
                    submenu.name
                  }} </span>
                  <span v-else>{{ submenu.name }}</span>

                </router-link>
              </div>
            </div>
          </div>

          <!-- Regular link -->
          <router-link v-else :to="link.to" class="flex items-center px-4 py-2 rounded hover:bg-blue-800"
            @click.native="$emit('close-sidebar')">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path :d="link.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <span>{{ link.name }}</span>
          </router-link>
        </div>

      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from '~/stores/modules/userStore';

const userStore = useUserStore();

const granted = computed(() => userStore.loggedUser?.granted || []);

const props = defineProps({
  isOpen: Boolean,
  loggedUser: {},
});

const filteredLinks = computed(() => {
  return links.filter(link => {
    if (!link || !link.name) return false;

    // Only show CRM if user has sso or flo
    if (link.name === 'CRM') {
      return granted.value.includes('sso') || granted.value.includes('flo') || granted.value.includes('su') || granted.value.includes('cso');
    }

    return true; // Show all other links
  });
});


const emit = defineEmits(["close-sidebar"]);

const openSubmenus = ref([]);

const toggleSubmenu = (name) => {
  if (openSubmenus.value.includes(name)) {
    openSubmenus.value = openSubmenus.value.filter((n) => n !== name);
  } else {
    openSubmenus.value.push(name);
  }
};

const GetOpenRegistryFtp = () => {
  // alert(this.loggedUser.granted.includes('doc_Registry'))
  if (this.loggedUser.granted.includes('doc_Registry')) {
    window.open('ftp://149.102.129.195/documentregistry', '_blank');
  }
  // else {alert('No include')}
};

const isSubmenuOpen = (name) => openSubmenus.value.includes(name);

const links = [
  {
    name: "CRM",
    icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z",
    submenu: [
      {
        name: "Leads",
        to: "/qms/vendor/leads",
        icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z",
      },
      {
        name: "Vendors",
        to: "/qms/vendor",
        icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z",
      },

      {
        name: "Reports",
        to: "",
        icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z",
        submenu: [
          { name: "Invoice Data Summary Report", to: "/qms/reports/?ps=901", },

          { name: "Receipt Data Summary Report ", to: "/qms/reports?ps=902", },
          { name: "Unsettled Advances", to: "/qms/reports?ps=904" },
          { name: "Debtor OS report", to: "/qms/reports?ps=903" },
          { name: "Commission Calculation report", to: "/qms/reports?ps=905" },
        ],
      },
    ],
  },
  {
    name: "HR System",
    to: "#",
    icon: "M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z",
    submenu: [
      {
        name: "Employee",
        to: "/hr",
      },
      {
        name: "Manual Attendance",
        to: "/hr/manualAttendance",
      },
      {
        name: "Reports",
        to: "#",
        submenu: [
          { name: "All Staff OT Reports for the Duration", to: "/hr/reports?p=R1001" },
          { name: "OT Month End Summery Report", to: "#" },

          { name: "Daily Presence Report", to: "#" },
          { name: "Employee Rectification Report", to: "#" },
          { name: "Employee leave Annual Report", to: "#" },
          { name: "Annual Summery Report", to: "#" },
          { name: "TimeCard Summery Report", to: "#" },
          { name: "No Pay Summery Report", to: "#" },
          { name: "No Pay Monthly Report", to: "#" },
          { name: "Supervisor Approval Pending Summery", to: "#" },
          { name: "HR - Month End Report Summery", to: "#" },
        ],
      },
    ],
  },

  {
    name: "Settings",
    icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z",
    submenu: [
      {
        name: "QMS",
        submenu: [
          { name: "Add Packages", to: "/qms/system?ps=801" },
          { name: "Add Cities", to: "/qms/system?ps=802" },
        ],
      },
      {
        name: "HR",
        submenu: [
          { name: "Upload Employee Details", to: "/hr/system?ps=701" },
          { name: "Set Holidays", to: "/hr/system?ps=702" },
          { name: "Set Special Work Arrangement", to: "/hr/system?ps=703" },
        ],
      },
    ],
  },

  {
    name: "Document Registry",

    icon: "M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z",
    submenu: [
      { name: "View Registry", to: "/forms" },
      { name: "Upload Documents" },
    ]
  },

];
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
