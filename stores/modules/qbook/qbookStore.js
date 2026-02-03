import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useQbookStore = defineStore("qbookStore", {
    state: () => ({
        listCustomers: [],
        listItemDetails: [],
        listItems:[],
        invoiveList:[],
        InvoiceNumber:[],
        chartOfAccountList:[]
    }),
    persist: true,

    actions: {
        async loadInitInvoice() {     
           // console.log('API-GetTenderInit');
            
            try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/Qbook/invoice/GetInvoiceInitAsync`
            );
            console.log(response);
            // loadingAlert.close();
            if (response.data.isSuccess) {
                this.listCustomers = response.data.data.data.listCustomers;
                this.listItemDetails = response.data.data.data.listItemDetails;
                this.listItems = response.data.data.data.listItems;
            } else {
                this.showToast(response.data.data.message, "error");
            }
            } catch (error) {
                this.showToast(response.data.data.message, "error");
            }
        },
        async nextInvoiceNo() {     
           // console.log('API-GetNextInvoiceNoAsync');
            
            try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/QBook/Invoice/GetNextInvoiceNoAsync`
            );
            console.log(response);
            // loadingAlert.close();
            if (response.data.isSuccess) {
                this.InvoiceNumber = response.data.data.data;
            } else {
                this.showToast(response.data.data.message, "error");
            }
            } catch (error) {
                this.showToast(response.data.data.message, "error");
            }
        },
        async setInvoice(formData, QbookshowLoading) {     
            console.log('API-SetInvoiceAsync');
            console.log('data:',formData);
            
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/Invoice/SetInvoiceAsync`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }

                );
                //console.log(response);
                // loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                // loadingAlert.close();
            }
        },
        async getInvoiveList(req, QbookshowLoading) {     
            console.log('API-GetInvoiceViewAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBook/Invoice/GetInvoiceViewAsync`,
                    {
                        params: {
                            keyword: req.keyword, 
                            searchBy: req.searchBy,
                        }
                    }

                );
                //console.log(response);
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                    this.invoiveList = response.data.data.data;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },
        async setDeleteInvoice(req, QbookshowLoading) {     
            console.log('API-SetChartOfAccountAsync');
            console.log('data:',req);
            
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/`,
                    {
                        params: {
                            invoiceId: req.invoiceId, 
                            cancelReason: req.cancelReason,
                        }
                    }
                );
                //console.log(response);
                // loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                // loadingAlert.close();
            }
        },

        async getChartOfAccountList(req, QbookshowLoading) {     
            console.log('API-GetInvoiceViewAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBook/ChartOfAccount/GetChartOfAccountViewAsync`,
                    {
                        params: {
                            keyword: req.keyword, 
                            searchBy: req.searchBy,
                        }
                    }

                );
                //console.log(response);
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                    this.chartOfAccountList = response.data.data.data;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },
        async setChartOfAccount(formData, QbookshowLoading) {     
            console.log('API-SetChartOfAccountAsync');
            console.log('data:',formData);
            
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/ChartOfAccount/SetChartOfAccountAsync`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }

                );
                //console.log(response);
                // loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                // loadingAlert.close();
            }
        },
        async setDeleteChartOfAccount(req, QbookshowLoading) {     
            console.log('API-SetChartOfAccountAsync');
            console.log('data:',req);
            
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/`,
                    {
                        params: {
                            id: req.id, 
                            cancelReason: req.cancelReason,
                        }
                    }
                );
                //console.log(response);
                // loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                // loadingAlert.close();
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