import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useTenderStore = defineStore("tenderStore", {
    state: () => ({
        listTenderCategory: [],
        listTenderSource: [],
        listDistrict: [],
        TenderList:[],
        moreDetails:[],
        listTenderType:[],
        listBanners:[]
    }),
    persist: true,

    actions: {
        async loadInitTender(showLoading) {     
            console.log('API-GetTenderInit');
                  const loadingAlert = showLoading("");

            try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/TenderNProcument/Tender/GetTenderInit`
            );
            // console.log(response);
            
            loadingAlert.close();
            if (response.data.isSuccess) {
                this.listTenderCategory = response.data.data.data.listTenderCategory;
                this.listTenderSource = response.data.data.data.listTenderSource;
                this.listDistrict = response.data.data.data.listDistrict;
                this.listTenderType = response.data.data.data.listTenderType;
                this.listBanners = response.data.data.data.listBanners;
            } else {
                this.showToast(response.data.message, "error");
            }
            } catch (error) {
            this.showToast(response.data.message, "error");
            }
        },
        async AddTender(formData, showLoading) {     
            console.log('API-SetTender');
            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TenderNProcument/Tender/SetTender`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }

                );
                console.log(response);
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
        async fetcTender(req,showLoading) {
            console.log('list:',req);

 
            const loadingAlert = showLoading ? showLoading('Loading Tender...') : null;

            try {
                const userStoreData = JSON.parse(localStorage.getItem("userStore"));
                const token = userStoreData?.token;

                const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/TenderNProcument/Tender/GetSearchTenders`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    },
                    params: {
                        SearchText: req.SearchText, 
                        CategoryId: req.CategoryId,
                        TenderTypeId: req.TenderTypeId,
                        Days: req.Days,
                    }
                }
                );

                loadingAlert?.close();
                console.log(response.data);

                if (response.data.isSuccess) {
                this.TenderList = response.data.data.data;
                }
            } catch (err) {
                loadingAlert?.close();
                console.error(err);
            }
        },
        async tenderDetails(tenderId,showLoading) {
            const loadingAlert = showLoading ? showLoading('Loading Tender...') : null;
            console.log(tenderId);

            try {
                const userStoreData = JSON.parse(localStorage.getItem("userStore"));
                const token = userStoreData?.token;

                const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/TenderNProcument/Tender/GetTenderById`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    },
                    params: {
                        id: tenderId, 
                    }
                }
                );

                loadingAlert?.close();
                console.log(response.data.data.data);

                if (response.data.isSuccess) {
                this.moreDetails = response.data.data.data;
                }
            } catch (err) {
                loadingAlert?.close();
                console.error(err);
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