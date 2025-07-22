import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useQuotationStore = defineStore("QuotationStore", {
  state: () => ({
    initPackageDetails: {     
    },
    curVendorId:'',
    proposalDetails:{},
    listQuotation: [],
    listQuotationVerions: [],
    curQuotation: {},
    initQuotation: [],
    testParam: { id: 21 },
    quotation:{},
    orderList: [],
    initPaymentDetails:{},
    invoiceDetails: null,
    PaymentDetails: [],

    // curQuotation: {},

    
  }),

  actions: {
    //loadInitPackages
    async loadInitPackages(showLoading) {

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/InitPackages`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.initPackageDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

     //GetUploadHybridLinks
    async GetUploadHybridLinks(formData,showLoading) {
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Admin/GetUploadHybridLinks`,
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GetUploadHybridLinks
    async GetUploadBundleLinks(formData,showLoading) {
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Admin/GetUploadBundleLinks`,
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GetUploadServiceLinks
    async GetUploadServiceLinks(formData,showLoading) {
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Admin/GetUploadServiceLinks`,
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GetUploadProductLinks
    async GetUploadProductLinks(formData,showLoading) {
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Admin/GetUploadProductLinks`,         
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //loadInitQuotation
    async loadInitQuotation(showLoading) {     
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/InitQuotation`
        );
        loadingAlert.close();
       if (response.data.isSuccess) {
          this.initQuotation = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //loadListQuotations
    async loadListQuotations(req, showLoading) {
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/qms/Quotation/QuotationList?keyword=${req.keyword}&searchBy=${
            req.searchBy
          }`
        );
        // console.log(response);
        loadingAlert.close();
        if (response.data.isSuccess) {
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

 //QuotationByVendorId  
    async QuotationByVendorId(id, showLoading) {
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/qms/Quotation/QuotationByVendorId?id=${id}`
        );
        // console.log(response);
        loadingAlert.close();
        if (response.data.isSuccess) {
          if (response.data.data.count == 0) {
            this.proposalDetails = {};
          } else {
            this.proposalDetails = response.data.data.data;
          }
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },


    //LoadQuotationVersions
    async LoadQuotationVersions(id, showLoading) {
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/qms/Quotation/GetLoadQuotationVersions?id=${id}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          if (response.data.data.count == 0) {
            this.listQuotationVerions = [];
          } else {
            this.listQuotationVerions = response.data.data.data;
          }

          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GetAprrovingTheQuotation
    async GetAprrovingTheQuotation(id, imgfile, showLoading) {
      console.log(JSON.stringify(id));
      console.log(JSON.stringify(imgfile));

      const loadingAlert = showLoading("");
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("ApprovalMemoFile", imgfile);

        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/qms/Quotation/GetAprrovingTheQuotation`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Make sure to set the correct content type for file uploads
            },
          }
        );
        loadingAlert.close();
        if (response?.data?.IsSuccess) {
          this.showAlert(response.data.Message, "error");
        } else {
          this.showAlert(response.data.Message, "error");
        }
      } catch (error) {
        this.showAlert(response.data.message, "error");
      }
    },

    //GetAddQuotation
    async GetAddQuotation(quotation, showLoading) {
      console.log(JSON.stringify(quotation));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/GetAddQuotation`,
          quotation,
          { headers: { 'Content-Type': 'application/json' } }
        );
        loadingAlert.close();

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");

          const { quotationUrl_WithLetterHead, quotationUrl_WithOutLetterHead } = response.data.data.data;
          window.open(quotationUrl_WithLetterHead, "_blank", "noopener,noreferrer");
          window.open(quotationUrl_WithOutLetterHead, "_blank", "noopener,noreferrer");

          // Clear modal data here!
          this.ResetQuotation();

        } else {
          this.showToast(response.data.message, "error");
          console.log("Error message:", response.data.message);
        }
      } catch (error) {
        loadingAlert.close();
        if (error.response) {
          this.showToast(error.response.data.message || "Error occurred", "error");
        } else {
          this.showToast(error.message || "Error occurred", "error");
        }
      }
    },

    // Update Quotation ID
    async GetEditQuotationById(id, showLoading) {
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/QuotationById?id=${id}`
        );
        loadingAlert.close();

        if (response.data.isSuccess) {
          // The actual quotation data is in response.data.data.data
          const quotationData = response.data.data.data;
          console.log("Fetched Quotation Data:", quotationData);

          // Assign to editQuotation
          this.quotation = quotationData;

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        this.showToast("An error occurred while fetching quotation data.", "error");
      }
    },

    //GetQuotationApprove
    async GetQuotationApprove(formData, showLoading) {
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/GetAprrovingTheQuotation`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        loadingAlert.close();

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast("An error occurred during approval", "error");
        console.error(error);
      }
    },

    //GetOrders
    async LoadOrders(id, showLoading) {
      console.log(JSON.stringify(id));
      
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetOrderDetails?approvedQuotationId=${id}`,
        );

        loadingAlert.close();
        if (response.data.isSuccess) {
          this.orderList = response.data.data.data; 
          // console.log("Order List:", this.orderList);
          this.showToast(response.data.message, "success");

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast("An error occurred during approval", "error");
        console.error(error);
      }
    },

    //GetPaymentInit
    async loadInitPayment(showLoading) {

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/PaymentInit`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.initPaymentDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GettInvoiceDetails
    async GettInvoiceDetails(id,showLoading) {
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");
     
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetInvoiceDetails?orderId=${id}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.invoiceDetails = response.data.data.data;
          // console.log("invoice List:", this.invoiceDetails);
          this.showToast(response.data.message, "success")
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    //GetPayment
    async GetDoPayment(formData, showLoading) {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/DoPayment`,
          formData
        );

        loadingAlert.close();

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast(error.message || "Error during payment", "error");
      }
    },

    //CancelOrder
    async deleteOrder(orderId, showLoading) {
      console.log(JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/CancelOrder?orderId=${orderId}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },


    //GetPaymenteDetails
    async GetPaymentDetails(id, showLoading) {
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetPaymentDetails?orderId=${id}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.PaymentDetails = response.data.data.data;
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Something went wrong", "error");
      }
    },


    async GetPrintInvoiceReports(req, showLoading) {
      console.log(JSON.stringify(req));

      const loading = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetInvoiceDataSummeryReport?dateFrom=${req.from}&dateTo=${req.to}`,
          { responseType: 'blob' }
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error(error);
        this.showToast("Failed to load Employee data", "error");
      } finally {
        loading?.close();
      }
    },



    





    //ResetQuotation
    ResetQuotation() {
      this.quotation = { 
        id: "00000000-0000-0000-0000-000000000000",
        firstName: "xxx",
        lastName: "",
        customerRef: "",
        phone: "",
        QuotationImage: "",
        email: "",
        shopName: "",
        shopContactNo: "",
        shopAddress1: "",
        shopAddress2: "",
        city: "",
        shopLogo: "",
        shopCoverImage: "",
        brCopy: "",
        description: "",
        bankName: "",
        branch: "",
        holderName: "",
        accountNumber: "",
        isActive: true,
      };
    },


    //showToast
    showToast(message, type) {
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer:5000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    },

    //showAlert
    showAlert(message, type) {
      console.log(type);
      Swal.fire({
        title: "Hello!",
        text: "This is a SweetAlert2 alert.",
        icon: "success", // Can be 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: "Cool",
      });
    },
  },
});
