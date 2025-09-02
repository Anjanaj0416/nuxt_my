<template>
    <div class="m-4 mt-20 lg:m-12 lg:mt-20">

     
    </div>
  </template>
  
  <script>
 // import headercomp from '~/components/header';
 // import footercomp from '~/components/footer';
 // import viewInvoice from '~/pages/Invoicing/viewInvoice.vue'
import { useUserStore } from '~/stores/modules/userStore';

 definePageMeta({
  layout: "society",
  middleware: "",
});
  
  export default {
    components: {  },//headercomp, footercomp
    data() {
      return {
        searchQuery: '',
        bankData: [
          { label: 'Bank Name', value: 'ABC Bank' },
          { label: 'Bank Branch', value: 'Kottawa' },
          { label: 'Bank Branch Code', value: 'ABC12345' },
          { label: 'Bank Account No', value: '58741269' },
          { label: 'Bank Swift Code', value: 'ABC12345' },
          { label: 'Sales officer No', value: 'rso21' }
        ],
        personalData: [
          { label: 'Contact Person Name', value: 'Perera' },
          { label: 'Contact Person Mobile', value: '074158769' },
          { label: 'Owner First Name', value: 'Nimal' },
          { label: 'Owner Contact', value: '072587459' },
          { label: 'Owner Birth Date', value: '1988.05.28' }
        ],
        departmentData: [
          { label: 'Nimal', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: true   },
          { label: 'Rusiru', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: false    },
          { label: 'Kaml', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: false    },

        ],
      };
    },
     async created() {
    try {
      this.userStore = useUserStore();
    }
    catch { }
  },
    computed: {
      // filteredBankData() {
      //   return this.bankData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // },
      // filteredPersonalData() {
      //   return this.personalData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // },
      // filteredDepartmentDataData() {
      //   return this.departmentData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // }
    },
    methods: {
      // handleSearch() {
      //   // You can further handle the search action if needed.
      //   console.log('Searching for:', this.searchQuery);
      // }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    background-color: #072556;
  }
  /* common */
.ribbon {

 
  
}

.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  right: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}
.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}

/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}




  </style>
  