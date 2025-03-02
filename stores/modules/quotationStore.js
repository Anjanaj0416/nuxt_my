import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useQuotationStore = defineStore("QuotationStore", {
  state: () => ({
    listQuotation: [
      {isApproved:true, quotationNo:'Q1254254',company:'Abans Group Pvt Ltd',contact:'0715321122',salesExec:'Rasika [A0001]',total:'LKR 253,225',status:'Approved',items:['Links 120-Hardware','Banner Home Page-HomePage','Stock Clearence-Nut & Bolts']},
      {isApproved:false,quotationNo:'Q1254252',company:'Lotus Group Pvt Ltd',contact:'0715321122',salesExec:'Rasika [A0001]',total:'LKR 253,225',status:'Pending',items:['Links 120-Hardware','Banner Home Page-HomePage','Stock Clearence-Nut & Bolts']},
      {isApproved:false,quotationNo:'Q1254253',company:'Nilkamal Group Pvt Ltd',contact:'0715321122',salesExec:'Rasika [A0001]',total:'LKR 253,225',status:'Pending',items:['Links 120-Hardware','Banner Home Page-HomePage','Stock Clearence-Nut & Bolts']},
    ],
    listQuotationVerions: [],
    curQuotation: {},
    initQuotation: {},
    testParam:{id:21}
  }),
  //this.showToast('Login successful!', 'success'); //success ,error ,warning,info
  actions: {
    async loadInitQuotation() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/InitQuotation`
        );

        if (response.data.isSuccess) {
          this.initQuotation = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    async loadListQuotations(req) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/QuotationList?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
  
        if ( response.data.isSuccess) {     
          if (response.data.data.count == 0) {           
            this.listQuotation = [];           
          } else {
            this.listQuotation = response.data.data.data;
          }
          

          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    ResetQuotation() {
      this.curQuotation.id = "00000000-0000-0000-0000-000000000000";
      this.curQuotation.firstName = "xxx";
      this.curQuotation.lastName = "";
      this.curQuotation.customerRef = "";
      this.curQuotation.phone = "";
      this.curQuotation.QuotationImage = "";
      this.curQuotation.email = "";
      this.curQuotation.shopName = "";
      this.curQuotation.shopContactNo = "";
      this.curQuotation.shopAddress1 = "";
      this.curQuotation.shopAddress2 = "";
      this.curQuotation.city = "";
      this.curQuotation.shopLogo = "";
      this.curQuotation.shopCoverImage = "";
      this.curQuotation.brCopy = "";
      this.curQuotation.description = "";
      this.curQuotation.bankName = "";
      this.curQuotation.branch = "";
      this.curQuotation.holderName = "";
      this.curQuotation.accountNumber = "";
      this.curQuotation.isActive = true;
    },
    showToast(message, type) {
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    },
  },
});
