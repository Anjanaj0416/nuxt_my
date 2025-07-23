import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useQmsReportsStore = defineStore("qmsReportsStore", {
  state: () => ({
  }),

  actions: {
    async GetPrintInvoiceReports(req, showLoading) {
      const loading = showLoading?.('');

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Report/GetInvoiceDataSummeryReport?dateFrom=${req.from}&dateTo=${req.to}`,
          { responseType: 'blob' }
        );

        const url = URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
        const link = Object.assign(document.createElement('a'), {
          href: url,
          download: `Invoice_Summary_${req.from}_to_${req.to}.pdf`
        });
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load Invoice Summary Report", "error");
      } finally {
        loading?.close();
      }
    }
  }


});
