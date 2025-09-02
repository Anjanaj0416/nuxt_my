import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import HoldPayment from "~/components/pos/holdPayment.vue";

export const useposStore = defineStore("posStore",{
    state: () => ({
        initPosData:{},
        listMainCategries: [],
        listSubCategories: [],
        listItems: [],
        holdPayments: [],
        selectedCategory: null,
        selectedSubCategory: null,

         selectedPayment: null,
    }),
    persist: true,

actions: {

    //loadInitVendor
    async loadInitPosData(showLoading) {      
  
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/InitPOS`
        );   

        if (response.data.isSuccess) {          
           this.initPosData = response.data.data.data;               
            this.listMainCategries =  this.initPosData.listMainCategries;        
            this.listSubCategories =  this.initPosData.listSubCategories;
            this.listItems =  this.initPosData.listItems;
            this.listClients = this.initPosData.listClients
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
      }
    },

    async setSelectedCategory(id, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Category ID:", JSON.stringify(id));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/GetSubCategoriesByMainCategories?id=${id}`
        );

        loadingAlert.close();

        // console.log(response);
        if (response.data.isSuccess) {          
           this.initPosData = response.data.data.data;               
          //  this.listMainCategries =  this.initPosData.listMainCategries;        
            this.listSubCategories =  this.initPosData.listSubCategories;
             this.listItems =  this.initPosData.listPOSItems;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Failed to fetch category items", "error");
      }
    },

    async setSelectedSubCategory(id, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Category ID:", JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/GetItemsBySubCategories?id=${id}`
        );
        loadingAlert.close();
        console.log(response.data.data.data);
        if (response.data.isSuccess) {          
          //  this.initPosData = response.data.data.data;               
            this.listItems =  response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Failed to fetch category items", "error");
      }
    },

    async makePayment(payload, showLoading) {

      
      console.log('API-GetItemsByCategory');
      console.log("Payload:", JSON.stringify(payload));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/POS/GetCreateReceipt`,
          payload
        );

        loadingAlert.close();

        if (response.data.isSuccess) {     
          this.showToast(response.data.message, "success");
          
        } else {
          this.showToast(response.data.message, "error");
        }

        // Return response for further handling in submitPayment
        return response.data;
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Payment Failed", "error");
        throw error; // rethrow so submitPayment can catch it
      }
    },


    async holdPayments(showLoading) {
      try {
        // if (showLoading) showLoading(true);

        // Simulate API response or use your static data
        const data = [
          {
            billNo: '001',
            date: '2025/09/20',
            time: '12.58 pm',
            items: [
              { id: "34bfe4d7-dd5d-477e-b38e-fa12e9d470f3", itemName: "Cheesecake", price: "500", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/187qAZ24PnDwhkzYD8qMcG0z0JDlHCqu3=s1000", qty:"1" },
              { id: "12199aba-300c-40a6-9c7e-e49d4fc20dd4", itemName: "Croissant", price: "200", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/1IAt9Zxw8J_XjHJ8rhnd3CHaybwWpJc3p=s1000", qty:"2" },
              { id: "50421e49-6961-4483-9884-c87db07de6b1", itemName: "Pepperoni Pizza", price: "1200", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/1_w3MvPl9XCdqzq4NsobMrl7hEddXn_So=s1000", qty:"13" },
            ]
          },
          {
            billNo: '002',
            date: '2025/08/10',
            time: '15.18 pm',
            items: [
              { id: "490a41f8-92c6-464b-8013-202ea7f6055e", itemName: "Mango Smoothie", price: "350", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/1XzgVjMb4MG1VxMp0yoYVCTvFtrAhhnde=s1000", qty:"12" },
              { id: "12199aba-300c-40a6-9c7e-e49d4fc20dd4", itemName: "Croissant", price: "200", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/1IAt9Zxw8J_XjHJ8rhnd3CHaybwWpJc3p=s1000", qty:"1" },
              { id: "5e229987-acb5-40e7-92ef-e2e29eb2bc39", itemName: "Fish Burger", price: "600", discount: 0, itemImage:"https://lh3.googleusercontent.com/d/199E4Ujt8atKWMDwZXBL97k1b_nuMfEmD=s1000", qty:"1" },
            ]
          },
        ];

        this.holdPayments = data;

      } catch (error) {
        console.error("Error loading held payments:", error);
      } finally {
        // if (showLoading) showLoading(false);
      }
    },

    setSelectedPayment(payment) {
      this.selectedPayment = payment;
    },
    clearSelectedPayment() {
      this.selectedPayment = null;
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