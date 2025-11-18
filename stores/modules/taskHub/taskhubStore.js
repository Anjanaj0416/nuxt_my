import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useTaskhubStore = defineStore("taskhubStore", {
    state: () => ({
        listMainCategory: [],
        listSubCategory: [],
        listSubSubCategory: [],
        listSubSubSubCategory: [],
        listDTP: [],
        listSuperUser: [],
        InitNext: [],
        demoProductMaterialList: []

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
                this.listDTP = response.data.data.data.listDTP;
                this.listSuperUser = response.data.data.data.listSuperUser;



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

        async AddNewCategoryApproval(request, showLoading) {     
            console.log('API-AddtasknewCategoryApproval', request);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddtasknewCategoryApproval`,
                    request
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

        async AddMainBanner(formData, showLoading) {     
            console.log('API-AddtasknewCategoryApproval');

            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddTaskMainBanner`,
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

        async AddCategoryBanner(formData, showLoading) {
            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddTaskCategoryBanner`,
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
                loadingAlert.close();
                console.error("API Error:", error);
                this.showToast("Server error. Please try again.", "error");
            }
        },

        
        async SetVendorBanner(formData, showLoading) {     
            console.log('API-AddtasknewCategoryApproval');

            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddTaskVendorBanner`,
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

        async SetProduct(formData, showLoading) {     
            console.log('API-AddtasknewCategoryApproval');

            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddTaskProductCreation`,
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

        async TaskInit(vendorId, showLoading) {     
            console.log('API-GetTaskInit',vendorId);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetTaskInit?clientId=${vendorId}`,
                );
                console.log(response);
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.nextPendingDTPId = response.data.data.data.nextPendingDTPId || [];
                    this.nextPendingSupperAdminId = response.data.data.data.nextPendingSupperAdminId || [];
                    this.nextSupervsorId = response.data.data.data.nextSupervsorId || [];

                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async SampaleProducAssign(formData, showLoading) {     
            console.log('API-AddtasknewCategoryApproval',formData);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/AddTaskProductBoxCreation`,
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

        async DemoProductMaterial(vendorId, showLoading) {     
            console.log('API-GetTaskHubDetails',vendorId);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetDemoProductMaterialTasksByVendor?clientId=${vendorId}`,
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    // this.showToast(response.data.message, "success");
                    this.demoProductMaterialList = response.data.data.data
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

         async StoreMaterialTasks(clientId, showLoading) {     
            console.log('API-GetStoreMaterialTasksByVendor');

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/DTL/DTLBannerMgt/GetStoreMaterialTasksByVendor?clientId=${clientId}`,
                );
                loadingAlert.close();
                if (response.data.isSuccess) {
                    // this.showToast(response.data.message, "success");
                    this.storeMateriallList = response.data.data.data
                } else {
                    this.showToast(response.data.message, "error");
                }
            } catch (error) {
                this.showToast(error.message || "Something went wrong!", "error");
                loadingAlert.close();
            }
        },

        async TaskDetailsList(req, showLoading) {     
            console.log('API-GetTaskHubDetails',req);

            const loadingAlert = showLoading("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/TaskHub/Task/GetTaskHubDetails`,
                     {
                        params: {
                        taskType: req.taskType,
                        searchValue: req.searchValue,
                        searchBy: req.searchBy
                        }
                    }
                );
                console.log(response);
                loadingAlert.close();
                if (response.data.isSuccess) {
                    this.showToast(response.data.message, "success");
                    this.taskDetailsList = response.data.data.data
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