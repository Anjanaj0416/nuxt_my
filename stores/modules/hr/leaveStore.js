import { defineStore } from "pinia";
import axios from "axios";

export const useLeaveStore = defineStore("leaveStore", {
  state: () => ({
    initEmployee: {},
    initHRDetails: {
      urlEmployeeDetailsXlsx: "",
    },
    loggeduser: {},
    dashboard: {
      workgroupjobcount: '',
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
    attendence: {
      tot_normal_overtime: 0,
      tot_sunday_overtime: 0,
      isTheTimeCardApproved: false,
      alattendences: [],
      manualAttendance: {},
    },
    dayInfo : {},
    timecard: {
      arrtimecard: [
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
      ],
    },
    OTApllyDetails: {
      arrOTApply: [],
      ot_hours: 0,
    },
    absense: {
      arrabsences: [],
      arrLeaveBalances: [],
    },
    movement: {
      arrmovements: [],
    },
    timecard: {
      arrtimecard: [],
    },
    workgroup: {
      arrJobCardDetails: [],
    },
    holiday: {
      arrholidays: [],
    },
    arrSWA:[],
    initData: {
      // initEmployee: {},
      initAbsence: {},
      initMovement: {},
      initReport: {},
    },
    authToken: "",
    isLoading: true,
    isModalOpen:true,
  }),

  persist: true,

  actions: {
     async getAbsenceInitData() {
      // const loadingAlert = showLoading('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Absence/GetAbsenceInitData`
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.initData.initAbsence = response.data.data.data;
        } else {
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      // loadingAlert.close();
    },

    async getViewAbsences(req, showLoading) {
      console.log('API-getViewAbsences');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Absence/GetViewAbsences`,
          {
            params: {
              empNo: req.empNo,
              fromDate: req.fromDate,
              toDate: req.toDate,
            },
          }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.absense.arrabsences = response.data.data.data.arrAbsences || [];
        } else {
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        if (error.response && error.response.status === 400) {
          this.absense.arrabsences = [];
        }
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getLeaveBalance(req, showLoading) {
      console.log('API-getLeaveBalance');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req, showLoading);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Absence/GetLeaveBalance`,
          { params: { empNo: req.empNo, year: req.leaveYear } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.absense.arrLeaveBalances =
            response.data.data.data.arrLeaveBalances;
        } else {
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async setLeave(req, showLoading) {
      console.log('API-setLeave:',req);

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Absence/SetLeave`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
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

    async getDeleteAbsence(req, showLoading) {
      console.log('API-getDeleteAbsence');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Absence/GetDeleteAbsence`,
          { params: { Id: req.id } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.showToast("Leave removed successfully!", "success");
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
