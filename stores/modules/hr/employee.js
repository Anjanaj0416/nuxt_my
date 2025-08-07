import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLeadStore = defineStore("leadStore",{
    state: () => ({
        initEmployee: {},

    }),
    persist: true,

actions: {

    //loadInitEmployee
async loadInitEmployee(showLoading) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/hr/Employee/GetInitEmployee`
    );

    if (response.data.isSuccess) {
      // Assign the nested data object here:
      this.initEmployee = response.data.data.data;
    } else {
      this.showToast(response.data.message, "error");
    }
  } catch (error) {
    this.showToast("Failed to load Employee data", "error");
  }
},


}
});