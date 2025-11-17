import { defineStore } from "pinia";
import axios from "axios";

export const useReportStore = defineStore("reportStore", {
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
     async getReportInitData() {
      console.log('API-getReportInitData');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Report/GetReportInitData`
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.initData.initReport = response.data.data.data;
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

    async getOTPeriodSummeryIndividual(req, showLoading) {
        console.log('API-getOTPeriodSummeryIndividual:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetOTPeriodSummeryIndividual`,req,{ responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
            // this.absense.arrabsences = response.data.data.data.arrAbsences || [];
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getOTPeriodSummeryMonthEnd(req, showLoading) {
        console.log('API-GetOTPeriodSummeryMonthEnd:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetOTPeriodSummeryMonthEnd`,req,{ responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
            // this.absense.arrabsences = response.data.data.data.arrAbsences || [];
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

   async getDailyAttendanceReport(req, showLoading) {
        console.log('API-getDailyAttendanceReport:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetDailyAttendanceSheet`,
            {params: {
              date:req.date
            },
            responseType: 'blob' 
          }); 
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getRectificationReport(req, showLoading) {
        console.log('API-GetRectificationReport:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetRectificationReport`,
            {params: {
              empNo:req.empNo, 
              dateFrom: req.dateFrom, 
              dateTo:req.dateTo 
            },
            responseType: 'blob' 
          }); 
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getEmployeeLeaveAnnualReport(req, showLoading) {
        console.log('API-getEmployeeLeaveAnnualReport:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetEmployeeLeave_AnnualReport`,{params: {departmentId:req.departmentId, year: req.year}, responseType: 'blob' });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getTimeCardSummery(req, showLoading) {
        console.log('API-getTimeCardSummery:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetTimeCardSummery`,req,{ responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

          console.log("response:", response);
          if (response.data.isSuccess) {
            // this.absense.arrabsences = response.data.data.data.arrAbsences || [];
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getNoPayMonthlyReport(req, showLoading) {
        console.log('API-getNoPayMonthlyReport:',req);

        const loadingAlert = showLoading("");
        try {

          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetNoPayMonthlyReport`,
            {params: {
              dateFrom: req.dateFrom, 
              dateTo:req.dateTo 
            },
            responseType: 'blob' 
          }); 
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');


          console.log("response:", response);
          if (response.data.isSuccess) {
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
        }
        loadingAlert.close();
    },

    async getMonthEndAttendanceSheet(req, showLoading) {
        console.log('API-getMonthEndAttendanceSheet:',req);

        const loadingAlert = showLoading("");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/hr/Report/GetMonthEndAttendanceSheets`,
            {params: {
              EmpNo: req.EmpNo,
              year:req.Year,
              monthNo:req.Month
            },
            responseType: 'blob' 
          }); 

            const blob = new Blob([response.data], {
              type: 'application/x-rar-compressed',
            });

            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `DailyAttendance_${req.EmpNo}_${req.Year}_${req.Month}.rar`;
            document.body.appendChild(link);
            link.click();

            // Clean-up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

          console.log("response:", response);
          if (response.data.isSuccess) {
          } else {
            console.error("Loading error:", response.data.message);
            // this.showToast(response.data.message, 'error');
          }
        } catch (error) {
          console.error("Loading error:", error);
          if (error.response && error.response.status == 400) {
          }
          // this.showToast(error.response.data.Message, 'error');
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
