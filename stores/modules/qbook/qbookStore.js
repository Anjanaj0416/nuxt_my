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
        chartOfAccountList:[],
        detailTypeList:[],
        CalculateInvoiceList:[],

        // ── Sales Orders ──────────────────────────────
        salesOrderList:   [],
        salesOrderCount:  0,
        salesOrderDetail: null,
    }),
    persist: true,

    actions: {
        async loadInitInvoice() {     
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/Qbook/invoice/GetInvoiceInitAsync`
                );
                console.log(response);
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
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBook/Invoice/GetNextInvoiceNoAsync`
                );
                console.log(response);
                if (response.data.isSuccess) {
                    this.InvoiceNumber = response.data.data.data;
                } else {
                    this.showToast(response.data.data.message, "error");
                }
            } catch (error) {
                this.showToast(response.data.data.message, "error");
            }
        },

        async setCalculateLine(req, QbookshowLoading) {     
            console.log('API-SetInvoiceAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/Invoice/GetCalculateLineTotal`, req,
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                    this.CalculateInvoiceList = response.data.data.data;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async setInvoice(formData, QbookshowLoading) {     
            console.log('API-SetInvoiceAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/Invoice/SetInvoiceAsync`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
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

        async setChartOfAccount(formData, QbookshowLoading) {     
            console.log('API-SetChartOfAccountAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/ChartOfAccount/SetChartOfAccountAsync`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
            }
        },

        async setDeleteChartOfAccount(req, QbookshowLoading) {     
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/`,
                    { params: { id: req.id, cancelReason: req.cancelReason } }
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
            }
        },

        async setDeleteInvoice(req, QbookshowLoading) {     
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/`,
                    { params: { invoiceId: req.invoiceId, cancelReason: req.cancelReason } }
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
            }
        },

        async getChartOfAccountList(req, QbookshowLoading) {     
            console.log('API-GetChartOfAccountViewAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBook/ChartOfAccount/GetChartOfAccountViewAsync`,
                    { params: { keyword: req.keyword, searchBy: req.searchBy } }
                );
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

        async detailTypeInit() {     
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/Qbook/DetailType/GetDetailTypeInitAsync`
                );
                console.log(response);
                if (response.data.isSuccess) {
                    this.accountTypes = response.data.data.data.accountTypes;
                } else {
                    this.showToast(response.data.data.message, "error");
                }
            } catch (error) {
                this.showToast(response.data.data.message, "error");
            }
        },

        async getDetailTypeList(req, QbookshowLoading) {     
            console.log('API-GetDetailTypeViewAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBook/DetailType/GetDetailTypeViewAsync`,
                    { params: { keyword: req.keyword, searchBy: req.searchBy } }
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                    this.detailTypeList = response.data.data.data;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async setDetailType(req, QbookshowLoading) {     
            console.log('API-SetDetailTypeAsync');
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/DetailType/SetDetailTypeAsync`, req,
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async setDeleteDetailType(req, QbookshowLoading) {     
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/DetailType/DeleteDetailTypeAsync`,
                    { params: { id: req.id, cancelReason: req.cancelReason } }
                );
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
            }
        },

        // ── Sales Orders ──────────────────────────────────────────
        async getSalesOrderList(req, QbookshowLoading) {
            console.log('API-GetOrderViewAsync', req);
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBSales/Order/GetOrderViewAsync`,
                    { params: { keyword: req.keyword, searchBy: req.searchBy } }
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.salesOrderList  = response.data.data.data;
                    this.salesOrderCount = response.data.data.count;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async getSalesOrderDetailById(req, QbookshowLoading) {
            console.log('API-GetSalesOrderDetailsByIdAsync', req);
            const loadingAlert = QbookshowLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/QBSales/Order/GetSalesOrderDetailsByIdAsync`,
                    { params: { SalesOrderId: req.SalesOrderId } }
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.salesOrderDetail = response.data.data.data;
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
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