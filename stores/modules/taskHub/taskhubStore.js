import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useTaskhubStore = defineStore("taskhubStore", {
    state: () => ({
        listMainCategory: [],
        listSubCategory: [],
        listSubSubCategory: [],
        listSubSubSubCategory: []

    }),
    persist: true,

    actions: {

        async loadInitBanner(showLoading) {     
            console.log('API-InitBannerMgt');
            const loadingAlert = showLoading("");
            try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/InitBannerMgt`
            );
            console.log(response);
            
            loadingAlert.close();
            if (response.data.isSuccess) {
                this.listMainCategory = response.data.data.data.listMainCategory;
                this.listSubCategory = response.data.data.data.listSubCategory;
                this.listSubSubCategory = response.data.data.data.listSubSubCategory;
                this.listSubSubSubCategory = response.data.data.data.listSubSubSubCategory;


            } else {
                this.showToast(response.data.message, "error");
            }
            } catch (error) {
            this.showToast(response.data.message, "error");
            }
        },
        async GetSubMainCategory(id, showLoading) {     
            console.log('API-GetSubCategoryByMainCategory', id);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetSubCategoryByMainCategory?mainCategoryId=${id}`
                );
                console.log(response);

                loadingAlert.close();

                if (response.data.isSuccess) {
                    // Ensure data is always an array
                    this.listSubCategory = response.data.data.data.listSubCategory || [];
                    this.listSubSubCategory = response.data.data.data.listSubSubCategory || [];
                    this.listSubSubSubCategory = response.data.data.data.listSubSubSubCategory || [];

                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async GetSubCategory(id, showLoading) {     
            console.log('API-GetSubSubCategoryBySubCategory', id);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetSubSubCategoryBySubCategory?subCategoryId=${id}`
                );
                console.log(response);

                loadingAlert.close();

                if (response.data.isSuccess) {
                    // Ensure data is always an array
                    // this.listSubCategory = response.data.data.data.listSubCategory || [];
                    this.listSubSubCategory = response.data.data.data.listSubSubCategory || [];
                    this.listSubSubSubCategory = response.data.data.data.listSubSubSubCategory || [];

                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async GetSelectSubSubCategory(id, showLoading) {     
            console.log('API-GetSubSubSubCategoryBySubSubCategory', id);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetSubSubSubCategoryBySubSubCategory?subSubCategoryId=${id}`
                );
                console.log(response);

                loadingAlert.close();

                if (response.data.isSuccess) {
                    // Ensure data is always an array
                    // this.listSubCategory = response.data.data.data.listSubCategory || [];
                    // this.listSubSubCategory = response.data.data.data.listSubSubCategory || [];
                    this.listSubSubSubCategory = response.data.data.data.listSubSubSubCategory || [];

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