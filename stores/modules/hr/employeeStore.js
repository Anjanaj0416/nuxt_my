import { defineStore } from "pinia";
import axios from "axios";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    initEmployee: {},
    initHRDetails: {
      urlEmployeeDetailsXlsx: "",
    },
    curEmployee: {},
    alempdetails: [],
    hrReport:{},
    empdetails: {
      id: "",
      empNo: "",
      csoNo: "",
      epfNo: "",
      empName: "",
      callingName: "",
      nic: "",
      nicImage: '',
      nicUrl: "",
      address: "",
      contact1: "",
      contact2: "",
      email1: "",
      email2: "",
      emergencyContact: "",
      department: { id: "", value: "" },
      designation: "",
      gender: "",
      staffType: { id: "", value: "" },
      dobDisplay: "",
      dob: "",
      empType: { id: "", value: "" },
      dateOfJoinDisplay: "",
      dateOfJoin: "",
      isResign: false,
      dateOfResignDisplay: "",
      dateOfResign: "",
      reasonForResign: "",
      imageUrl: "",
      image: '',
      category: { id: "", value: "" },
      privilegeLevel: "",
      managerEmployee: { id: "", value: "" },
      annualLeave: 0,
      casualLeave: 0,
      sickLeave: 0,
      otherLeave: 0,
      isOtAllow: false,
      homePhoneNo: "",
      signatureUrl: "",
      signature: '',
      onTimeDisplay: "00:00",
      onTime: "",
      offTimeDisplay: "00:00",
      offTime: "",
      isExecutive: false,
      isActive: false,
      employeeStatus: "",
      granted: "",
      isMorningOtAllowed: false,
      isTransport: false,
      role: { id: "", value: "" },
      secretCode: "",
      userCode: "",
      userGroup: "",
      username: "",
      userType: "",
    },
    authToken: "",
    isLoading: true,
    isModalOpen:true,
  }),

  persist: true,

  //this.showToast('Loading successful!', 'warning'); //success ,error ,warning,info

  actions: {
    RestAttendance() {
      this.attendence = {
        tot_normal_overtime: 0,
        tot_sunday_overtime: 0,
        isTheTimeCardApproved: false,
        alattendences: [],
      };
    },

    //Employee//

    async AddEdiEmployee(formData, showLoading) {
      console.log('API-AddEdiEmployee');
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Employee/SetAddEdit`,
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
          this.alempdetails = response.data.data.data;
          this.closeModal();
          // You can also update other state values if needed
        } else {
          console.error("Server error:", response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast("Error in server call", "error");
      }
    },

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

    async getInitEmployee() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Employee/GetInitEmployee`
        );

        if (response.data.isSuccess) {
          this.initData.initEmployee = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
    },

    async searchEmployees(req, showLoading) {
      console.log('API-searchEmployees');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Employee/SearchEmployees`,
          req
        );

        console.log("response:",response);
        

        if (response.data.isSuccess) {
          this.alempdetails =
            response.data.data.data.alpagedetails[0].alempdetails || [];
          // this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },

    async getEmployeeByID(id, showLoading) {
      console.log('API-getEmployeeByID');
      console.log(JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Employee/GetEmployeeByID`,
          { params: { id: id.empid } }
        );
        console.log("response:",response.data.data.data);
        if (response.data.isSuccess) {
          this.curEmployee = response.data.data.data || {};
          this.empdetails = this.curEmployee;
          // this.showToast('Loading successful!', 'success');
        } else {
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },

    async GetUpdateEmployeeDetails(formData, showLoading) {
      console.log('API-GetUpdateEmployeeDetails');
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Employee/GetUploadEmployees`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast("Employee Details Updated successful!", "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

    async loadInitHRDetails(showLoading) {
      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/HRCommon/GetInitHRDetails`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.hrReport = response;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
    },

     async GetPrintHrReports(req, showLoading) {
      console.log('API-GetPrintHrReports');
      console.log(JSON.stringify(req));

      const loading = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetALLEmployeePrintAttendanceSheetByDateRange?dateFrom=${req.dateFrom}&dateTo=${req.dateTo}`,
          { responseType: 'blob' }
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error(error);
        this.showToast("Failed to load Employee data", "error");
      } finally {
        loading?.close();
      }
    },

    async clearEmployee() {
      this.empdetails = {
        id: "00000000-0000-0000-0000-000000000000",
        empNo: "",
        csoNo: "",
        epfNo: "",
        empName: "",
        callingName: "",
        nic: "",
        nicImage: '',
        nicUrl: "",
        address: "",
        contact1: "",
        contact2: "",
        email1: "",
        email2: "",
        emergencyContact: "",
        department: { id: "", value: "" },
        designation: "",
        gender: "",
        staffType: { id: "", value: "" },
        dobDisplay: "",
        dob: "",
        empType: { id: "", value: "" },
        dateOfJoinDisplay: "",
        dateOfJoin: "",
        isResign: false,
        dateOfResignDisplay: "",
        dateOfResign: "",
        reasonForResign: "",
        imageUrl: "/HR/dev/avator/default.png",
        image: '',
        category: { id: "", value: "" },
        privilegeLevel: "",
        managerEmployee: { id: "", value: "" },
        annualLeave: 0,
        casualLeave: 0,
        sickLeave: 0,
        otherLeave: 0,
        isOtAllow: false,
        homePhoneNo: "",
        signatureUrl: "",
        signature: '',
        onTimeDisplay: "00:00",
        onTime: "",
        offTimeDisplay: "00:00",
        offTime: "",
        isExecutive: false,
        isActive: false,
        employeeStatus: "",
        granted: "",
        isMorningOtAllowed: false,
        isTransport: false,
        role: { id: "", value: "" },
        secretCode: "",
        userCode: "",
        userGroup: "",
        username: "",
        userType: "",
      };
    },

    async clearAll() {
      this.attendence = {};
      this.absense.arrabsences = [];
      this.movement.arrmovements = [];
      this.timecard.arrtimecard = [];
      this.OTApllyDetails.arrOTApply = [];
    },

    async closeModal() {
      this.isModalOpen = !this.isModalOpen;
    },

  async showToast(message, type) {
    const Swal = (await import("sweetalert2")).default;
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
