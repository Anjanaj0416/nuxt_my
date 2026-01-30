import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useQbookStore = defineStore("qbookStore", {
    state: () => ({
        listCustomers: [],
        listItemDetails: [],
        listItems:[]
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
        async getInvoice(formData, B2BshowLoading) {     
            console.log('API-SetInvoiceAsync');
            const loadingAlert = B2BshowLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/QBook/SetInvoiceAsync`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }

                );
                //console.log(response);
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