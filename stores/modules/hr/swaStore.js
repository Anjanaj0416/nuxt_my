import { defineStore } from "pinia";
import axios from "axios";

export const useSwaStore = defineStore("swaStore", {
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
      async setSpecialWorkArrangement(req, showLoading) {
      console.log('API-setSpecialWorkArrangement');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetSpecialWorkArrangement`,
          req
        );
        console.log("setSpecialWorkArrangement response:", response);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          // if (response.data.statusCode === 400) {
          //   this.movement.arrmovements = [];
          // }
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getSpecialWorkArrangement(req, showLoading) {
      console.log('API-getSpecialWorkArrangement',req);
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetSpecialWorkArrangement`,{params:{Month: req.month, Year: req.year}});

        console.log("GetSpecialWorkArrangement response:", response.data.data.data);
        if (response.data.isSuccess) {
          this.arrSWA = response.data.data.data
;
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          // if (response.data.statusCode === 400) {
            this.holiday.arrholidays = [];
          // }
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async deleteSpecialWorkArrangement(req, showLoading) {
      console.log('API-deleteSpecialWorkArrangement',req);
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetDeleteSpecialWorkArrangement`,{params:{id: req.id}});

        console.log("GetDeleteSpecialWorkArrangement response:", response.data.data.data);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          // if (response.data.statusCode === 400) {
          // }
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, 'error');
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
