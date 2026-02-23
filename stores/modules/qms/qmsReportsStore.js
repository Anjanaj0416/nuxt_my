import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useQmsReportsStore = defineStore("qmsReportsStore", {
  state: () => ({}),

  actions: {
    async GetPrintInvoiceReports(req, showLoading) {
      console.log("GetInvoiceDataSummeryReport");
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetInvoiceDataSummeryReport`,{
            params: {
              fromDate:req.from, 
              toDate: req.to, 
            },
            responseType: 'blob' 
          }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Invoice_Summary_${req.from}_to_${req.to}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Invoice Summary Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetReceiptDataSummaryReports(req, showLoading) {
      console.log(req);
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetReceiptDataSummaryReport`,{
           params: {
              dateFrom:req.from, 
              dateTo: req.to, 
              receiptType: req.receiptType, 
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Receipt_Data_Summary_${req.from}_to_${req.to}_to_${req.receiptType}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Receipt Data Summary Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetUnsettledAdvancesReports(req, showLoading) {
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetUnsettledAdvancesReport`,{
            params: {
              asAtDate: req.asAtDate, 
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Unsettled_Advances_${req.asAtDate}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Unsettled Advances Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetDebtorOSReports(req, showLoading) {
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetDebtorOSReport`,{
            params: {
              asAtDate: req.asAtDate, 
              isWithAdvance: req.isWithAdvance,
              isCustomerWise: req.isCustomerWise,
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Debtor_OS_Report_${req.asAtDate}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Debtor OS Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetCommissionCalculationReport(req, showLoading) {
      // console.log(req);
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetCommissionCalculationReport`,{
            params: {
              from: req.from, 
              to: req.to, 
              csoNo: req.csoNo,
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Commission_Calculation_Report_${req.from}_to_${req.to}_cso_${req.csoNo}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data?.message || "Failed to load report";
        this.showToast(errorMessage, "error");
      } finally {
        loading?.close();
      }
    },

    async GetCollectionSheetReports(req, showLoading) {
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetCollectionSheetReport`,{
            params: {
              from: req.from, 
              to: req.to, 
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Collection_Sheet_${req.from}_to_${req.to}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Collection Sheet Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetSalesKPIReport(req, showLoading) {
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetSalesKPIReport`,{
            params: {
              from: req.from, 
              to: req.to, 
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Sales_KPI_Report_${req.from}_to_${req.to}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Collection Sheet Report", "error");
      } finally {
        loading?.close();
      }
    },

    async GetCommisionPaymentReport(req, showLoading) {
      const loading = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetCommisionPaymentReport`,{
            params: {
              dtFrom: req.dtFrom,
              dtTo: req.dtTo,
              keyword: req.keyword,
              csoNo: req.csoNo
            },
            responseType: 'blob' 
        }); 
        console.log("response:", response);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: `Commision_Payment_Report_${req.dtFrom}_to_${req.dtTo}.pdf`,
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Collection Sheet Report", "error");
      } finally {
        loading?.close();
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
    },
  },
});
