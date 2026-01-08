import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    availablePin: '',
    getWorkFlow: [],
    initOrder: [],
    listoPackagesDetails: [],
    listOrder : [],
    PaymentDetails: [],
    piSigned : [],
    listProposal : {},
    InstalllmentDetails: [],
    CommisionDetails: [],
    RatesDetailsList: {},
  }),
  persist: true,

actions: {
  async loadAvailablePin(vendorId, showLoading) {
    console.log(JSON.stringify(vendorId));

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetNextAvaialblePINumber?clientId=${vendorId}`,
      );

      if (response.data.isSuccess) {
        this.availablePin = response.data.data;
        console.log("PI Response:", response.data.data);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load Available PI Number", "error");
    }
  },

  async GetIssuePINumber(request, showLoading) {
    console.log('API-GetIssuePINumber');
    console.log(JSON.stringify(request));
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetIssuePINumber`,
        {
            params: {
            clientId: request.vendorId,
            PINo: request.PINo,
            },
        }
      );

      if (response.data.isSuccess) {
        this.showToast(response.data.message, "success");
         this.availablePin='';
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load Available PI Number", "error");
    }
  },

  async loadWorkFLow(vendorId, showLoading) {
    console.log(JSON.stringify(vendorId));

    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/WorkFLow/GetWFs`,
        { params: { vendorId } }
      );

      if (response.data.isSuccess) {
        this.getWorkFlow = response.data.data;
        console.log("Work Flow:", response.data.data);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load WorkFLow", "error");
    }
  },

  //loadInitOrder
  async loadInitOrderPlace(showLoading) {     
    console.log('API-InitOrderPlace');
    const loadingAlert = showLoading("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/InitOrderPlace`
      );
      loadingAlert.close();
      if (response.data.isSuccess) {
        this.initOrder = response.data.data.data;
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast(response.data.message, "error");
    }
  },


  async setSelectedCategoryId(id, showLoading) {
    console.log('API-GetItemsByCategory');
    console.log("Category ID:", JSON.stringify(id));

    const loadingAlert = showLoading("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetItemsByCategory?id=${id}`
      );

      loadingAlert.close();

      if (response.data.isSuccess) {
        const items = response.data.data.data;
        
        // Log the full nested data
  
        console.log("items:", items);

        this.listoPackagesDetails = items;

        this.showToast(response.data.message);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      loadingAlert.close();
      console.error("API error:", error);
      this.showToast("Failed to fetch category items", "error");
    }
  },

  async GetAddorder(payload, showLoading) {
    console.log('API-GetCreateOrder');
    console.log(JSON.stringify(payload, null, 2));

    const loadingAlert = showLoading('Loading...');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetCreateOrder`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      loadingAlert.close();

      console.log(response);
      if (response.data.isSuccess) {
        this.showToast(response.data.message, 'success');
        this.listOrder = response.data.data.data;
        
      } else {
        console.error('Backend error:', response.data.message);
        this.showToast(response.data.message || 'Unknown error', 'error');
      }
    } catch (error) {
      loadingAlert.close();
      console.error('API call failed:', error);
      this.showToast('Error in server call', 'error');
    }
  },

  async loadListOrder(req, showLoading) {
    console.log('API-GetOrderDetails');
    console.log(JSON.stringify(req));
    
    const loadingAlert = showLoading("");
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetOrderDetails?keyword=${
          req.keyword
        }&searchBy=${req.searchBy}`
      );
      loadingAlert.close();       
        
      if (response.data.isSuccess) {         
          this.listOrder = response.data.data.data;   
          this.showToast(response.data.message, "success");
      } else {        
          this.listOrder = [];          
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast(error.message, "error");
    }
  },

   async deleteOrder(orderId, showLoading) {
       console.log('API-CancelOrder')
      console.log(JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/CancelOrder?orderId=${orderId}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.listOrder = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    // orderStore.js
    async GetQuotationApprove(formData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetUploadSignedImage`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.isSuccess) {
         this.showToast?.(response.data.message, "success"); 
          const uploadedPath = response.data.data.data;
          const orderNo = formData.get("orderNo");

          const order = this.listOrder.find(o => o.orderNo === orderNo);
          if (order) {
            order.isSignedPIUploaded = true;
            order.piSignedScanUrl = uploadedPath;
          }
          

          return { success: true, message: response.data.message };
        } else {
          return { success: false, message: response.data.message };
        }
      } catch (error) {
        console.error("GetQuotationApprove failed:", error);
        return { success: false, message: "An error occurred during approval" };
      }
    },

    async loadProposal(orderId, showLoading) {
       console.log('API-ListProposal')
      console.log(JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/GetUploadedQuotations?orderId=${orderId}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.listProposal = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    async GetPraposalDocument(formData, showLoading) {
      console.log('API-SetUploadQuotation')
      console.log(JSON.stringify(formData));

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Quotation/SetUploadQuotation`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
       loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.listProposal = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    //GetInitPayment
    async GetInitPayment(orderId, showLoading) {
       console.log('API-PaymentInit')
      console.log('PaymentInit,',JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/PaymentInit?orderId=${orderId}`
        );
        console.log(response);
        
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.initPaymentDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    // async GetPraposalDocument(formData) {
    //   try {
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_API_URL}/qms/Order/GetUploadScanedProposal`,
    //       formData,
    //       { headers: { "Content-Type": "multipart/form-data" } }
    //     );
    //     if (response.data.isSuccess) {
    //       const uploadedPath = response.data.data.data;
    //       const orderNo = formData.get("orderNo");

    //       const order = this.listOrder.find(o => o.orderNo === orderNo);
    //       if (order) {
    //         order.isScanedProposalUploaded = true;
    //         order.scanedProposalUrl = uploadedPath;
    //       }

    //       return { success: true, message: response.data.message };
    //     } else {
    //       return { success: false, message: response.data.message };
    //     }
    //   } catch (error) {
    //     console.error("GetProposal failed:", error);
    //     return { success: false, message: "An error occurred during approval" };
    //   }
    // },

    async GettPaymentDetails(orderId, showLoading) {
       console.log('API-GetPaymentDetails')
      console.log('getPayment,',JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetPaymentDetails?orderId=${orderId}`
        );
        console.log(response);
        
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.PaymentDetails = response.data.data.data;
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    //GetPayment
    async getDoPay(formData, showLoading) {
      console.log('API-DoPayment');

      //   for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/DoPayment`,
          formData
        );
        console.log(response);
        
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.PaymentDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast(error.message || "Error during payment", "error");
      }
    },


    async PrintInvoice(req, showLoading) {
      console.log('API-GetGenerateInvoicePdf');
      console.log(JSON.stringify(req));

      const loading = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetGenerateInvoicePdf?orderNo=${req.orderNo}&receiptNo=${req.receiptNo}&amountPaid=${req.amountPaid}&isTax=${req.isTax}`,
          { responseType: 'blob' }
        );

        // Open PDF in new tab
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");

        // ✅ Update reactive UI (like you did in GetQuotationApprove)
        const orderNo = req.orderNo;
        const receiptNo = req.receiptNo;

        // Find related payment item
        for (const inst of this.PaymentDetails.listInstallment) {
          const payment = inst.listPayment.find(p => p.receiptNo === receiptNo);
          if (payment) {
            payment.isInvoicePrinted = true;
            payment.invoiceURL = `/qms/Order/Invoices/${receiptNo}.pdf`;
          }
        }

        this.showToast?.('Invoice generated successfully', 'success');
      } catch (error) {
        console.error('PrintInvoice error:', error);
        this.showToast('Failed to generate invoice', 'error');
      } finally {
        loading?.close();
      }
    },


    //Installment
    async GetInstallmentDetails(orderId, showLoading) {
      console.log('API-CancelOrder')
      console.log('getPayment,',JSON.stringify(orderId));
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetInstallmentDetails?orderId=${orderId}`
        );
        console.log(response);
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.InstalllmentDetails = response.data.data.data;
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Installment Details", "error");
      }
    },

    //CommisionList
    async GetCommisionList(orderId, showLoading) {
      console.log('API-CommisionPaymentDetails', orderId);
      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetCommisionPaymentDetails?orderId=${orderId}`
        );
        loadingAlert.close();

        if (response.data.isSuccess) {
          const result = response.data.data.data;

          this.CommisionDetails = result.listCommisionPayment || [];
          this.PaybleAmount = result.paybleAmount || "0.00";
          this.PaidAmount = result.paidAmount || "0.00";
          console.log();
          
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Commision Details", "error");
      }
    },

    
    //GetDoCommisionPay
    async getDoCommisionPay(request, showLoading) {
      console.log('API-DoCommisionPayment');
      for (let [key, value] of request.entries()) {
        console.log(`${key}: ${value}`);
      }
      const loadingAlert = showLoading();

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/DoCommisionPayment`,
          {
            params: {
              orderId: request.OrderId,
              PaymentAmount: request.PaymentAmount,
            },
          }
        );
        loadingAlert.close();

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");

          const result = response.data.data?.data || {};

          this.CommisionDetails = result.listCommisionPayment || [];
          this.PaybleAmount = result.paybleAmount || "0.00";
          this.PaidAmount = result.paidAmount || "0.00";
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("DoCommisionPayment Error:", error);
        this.showToast(error.message || "Error during payment", "error");
      }
    },


    //GetNotifications
    async GetNotifications(userName, showLoading) {
      // console.log( userName);
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `https://mcleapi.dtl.lk/api/WorkFlowNotification/GetNotifications?empNo=${userName}`
        );
        loadingAlert.close();
        // console.log(response);

        if (response.data.isSuccess) {
          // Update notifications array
          this.notifications = response.data.data.data || [];
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast("Error while fetching notifications", "error");
        // console.error(error);
      }
    },

    //AddCommissionRate
    async AddCommissionRate(request, showLoading) {
      // console.log('API-SetCommissionRates');
      // console.log(JSON.stringify(request, null, 2));
      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Admin/SetCommissionRates`,
          request,
        );

        loadingAlert.close();

        console.log(response);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, 'success');
          this.RatesDetailsList = response.data.data.data;
          
        } else {
          console.error('Backend error:', response.data.message);
          this.showToast(response.data.message || 'Unknown error', 'error');
        }
      } catch (error) {
        loadingAlert.close();
        console.error('API call failed:', error);
        this.showToast('Error in server call', 'error');
      }
    },

    //GetCommissionRateDetails
    async GetCommissionRatesDetails(showLoading) {
      console.log('API-GetCommissionRates')

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Admin/GetCommissionRates`
        );
        console.log(response);
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.RatesDetailsList = response.data.data.data;
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Installment Details", "error");
      }
    },

    //AllCommisionPaymentDetails
    async GetAllCommisionPaymentDetails(req,showLoading) {
      console.log('API-GetCommissionRates')
      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetAllCommisionPaymentDetails?dtFrom=${req.dtFrom}&dtTo=${req.dtTo}&keyword=${req.keyword}&isTax=${req.csoNo}`,
        );
        console.log("EE,:",response);
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.CommisionPaymentDetails = response.data.data.data;
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Installment Details", "error");
      }
    },

    
    //InitCommisionPaid
    async GetCommissionRatesDetails(showLoading) {
      console.log('API-GetCommissionRates')

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/InitCommisionPaid`
        );
        console.log(response);
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.InitCommision = response.data.data.data;
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Installment Details", "error");
      }
    },

    //UpdateAsCommisionPaid
    async AddCommissionPayment(formData, showLoading) {
      console.log('API-updateAsCommisionPaid');
        for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/updateAsCommisionPaid`,
          formData
        );
        console.log(response);
        
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.PaymentDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast(error.message || "Error during payment", "error");
      }
    },

    async GetAllManuaPI(subData,showLoading) {
      // console.log('API-GetCommissioGetIssuePINumberByCustomerRefnRates')
      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetIssuePINumberByCustomerRef?customerRef=${subData.customerRef}&PINo=${subData.PINo}`,
        );
        console.log("EE,:",response);
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while Installment Details", "error");
      }
    },




  showToast(message, type) {
    Swal.fire({
      icon: type,
      title: type,
      text: message,
      timer: 5000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
}

});

