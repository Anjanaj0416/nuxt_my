import { defineStore } from "pinia";
import axios from "axios";

export const useHrStore = defineStore("hrStore", {
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
          this.showToast("Loading successful!", "success");
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


    // WorkLoad

    async getWorkLoadCount() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadCount`
        );
        console.log("getWorkLoadCount response:",response);

        if (response.data.isSuccess) {
          if (response.data.data.data.length > 0) {
            const jobArr = response.data.data.data[0].assignedUser.jobArr;

            const totalJobCount = jobArr.reduce((sum, jobType) => {
              return sum + jobType.jobDetails.length;
            }, 0);

            this.dashboard.workgroupjobcount = totalJobCount;
          }else{
             this.dashboard.workgroupjobcount = 0;
          }
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
    },

    async getWorkLoadDetails(showLoading) {
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadDetails`
        );

        console.log("response:",response.data.data.data);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getWorkLoadApprove(req,showLoading) {
      console.log('API-getWorkLoadApprove');
      console.log(JSON.stringify(req));


      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadApprove`,req);

        console.log("response:",response.data.data.data);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          // this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getWorkLoadReject(req,showLoading) {
      console.log('API-getWorkLoadReject');
      console.log(JSON.stringify(req));


      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadReject`,req);

        console.log("response:",response.data.data.data);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          // this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },


    //Attendence//

    async getRefreshAttendance(req, showLoading) {
      console.log('API-getRefreshAttendance');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetRefreshAttendance`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.showToast('Loading successful!', 'success');
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

    async GetPrintAttendanceSheet(req, showLoading) {
      console.log('API-GetPrintAttendanceSheet');
      console.log(JSON.stringify(req));

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/hr/Attendance/GetPrintAttendanceSheet?empNo=${req.empNo}&dateFrom=${
            req.dateFrom
          }&dateTo=${req.dateTo}`,
          {
            responseType: "blob", 
          }
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        this.showToast("Failed to load Employee data", "error");
      }
    },

    async getAttendenceByEmp(req, showLoading) {
      console.log('API-getAttendenceByEmp');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetAttendenceByEmp`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.attendence.tot_normal_overtime =
            response.data.data.data.totNormalOvertime || '';
          this.attendence.tot_sunday_overtime =
            response.data.data.data.totSundayOvertime || '';
          this.attendence.isTheTimeCardApproved =
            response.data.data.data.isTheTimeCardApproved || '';
          this.attendence.alattendences =
            response.data.data.data.alAttendences || [];
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

    async getDayAppliedRecords(req, showLoading) {
      console.log('API-getDayAppliedRecords',req);

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetDayAppliedRecords`,
          req
        );
        console.log("response:", response.data.data.data);
        if (response.data.isSuccess) {
          this.dayInfo = response.data.data.data || {}
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

    async getOTApprovals(req, showLoading) {
      console.log('API-getOTApprovals');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetOTApprovals`,
          {
            params: {
              EmpNo: req.empNo,
              DtFrom: req.fromDate,
              DtTo: req.toDate,
            },
          }
        );

        console.log("response:", response);
      
        if (response.data.isSuccess) {
          this.OTApllyDetails.arrOTApply = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
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

    async setManualInOut(req, showLoading) {
      console.log('API-setManualInOut');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetManualInOut`,req);
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.empdetails = response.data.data.data || {};
          this.showToast("In-Out change successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
          this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },

    async setOTManual(req, showLoading) {
      console.log('API-SetOTManual');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTManual`,req);
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.empdetails = response.data.data.data || {};
          this.showToast("In-Out change successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
          this.showToast(response.data.message, 'warning');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },

    // async setOTManual(req, showLoading) {
    //   console.log('API-setOTManual');
    //   console.log(JSON.stringify(req));

    //   const loadingAlert = showLoading("");
    //   try {
    //     console.log("req:", req);
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTManual`,
    //       { params: { Id: req.id, otHours: req.otHours } }
    //     );
    //     console.log("response:", response);
    //     if (response.data.isSuccess) {
    //       // this.empdetails = response.data.data.data || {};
    //       this.showToast("OT apply successful!", "success");
    //     } else {
    //       console.error("Loading error:", response.data.message);
    //       // this.showToast(response.data.message, 'error');
    //     }
    //   } catch (error) {
    //     console.error("Loading error:", error);
    //     this.showToast(error.response.data.Message, "error");
    //   }
    //   loadingAlert.close();
    // },

    async setOTApproval(req, showLoading) {
      console.log('API-setOTApproval');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTApproval`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          if (req.Note) {
            const reqGetOTApprovals = {
              empNo: req.EmpNo,
              fromDate: req.FromDate,
              toDate: req.ToDate,
            };

            this.OTApllyDetails.ot_hours = 0;
            await this.getOTApprovals(reqGetOTApprovals, showLoading);
          } else {
            const attendenceReq = {
              EmpNo: req.EmpNo,
              FromDate: req.OTFrom,
              ToDate: req.OTTo,
            };
            await this.getAttendenceByEmp(attendenceReq, showLoading);
          }
          // this.showToast('OT apply successful!', 'success');
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

    async setDeleteOTApproval(req, showLoading) {
      console.log('API-setDeleteOTApproval');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetDeleteOTApproval`,
          { params: { Id: req.id } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.showToast(response.data.message, 'success');
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


    async getReCalcOT(req, showLoading) {
      console.log('API-getReCalcOT');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetRecalcOT`,
          { params: { Id: req.Id } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.OTApllyDetails.ot_hours = response.data.data.data;
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

    async getRecalcOTByHR(req, showLoading) {
      console.log('API-getRecalcOTByHR');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetRecalcOTByHR`,
          { params: { id: req } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.OTApllyDetails.ot_hours = response.data.data.data;
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

    async otCancel() {
      this.OTApllyDetails.ot_hours = 0;
    },

    async setRectifyAttendance(req, showLoading) {
      console.log('API-setRectifyAttendance',req);

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);

        const setRectifyAttendanceReq = {
          AttendanceId: req.attendance_id,
          InTime: req.intime,
          OutTime: req.outtime,
          Comment: req.comment,
        }

        console.log("setRectifyAttendanceReq:",setRectifyAttendanceReq);
        

        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/hr/Attendance/SetRectifyAttendance`,setRectifyAttendanceReq );
          
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.empdetails = response.data.data.data || {};
          this.showToast('Rectify apply successful!', 'success');

          const attendenceReq = {
            EmpNo: req.EmpNo,
            FromDate: req.FromDate,
            ToDate: req.ToDate,
          };
          await this.getAttendenceByEmp(attendenceReq, showLoading);
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

    async setManualAttendenceRecord(req, showLoading) {
      console.log('API-SetManualAttendenceRecord');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/hr/Attendance/SetManualAttendenceRecord`,
          {
            params: {
              empNo: req.empNo,
              date: req.date,
              inTime: req.inTime,
              outTime: req.outTime,
              dayType: req.dayType,
            },
          }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.attendence.manualAttendance = response.data.data.data || {};
          this.showToast(response.data.message, 'success');
        } else {
          console.error("Loading error:", response.data.message);
          this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },

    async getOTHours(req) {
      console.log('API-getOTHours');
      console.log(JSON.stringify(req));

      // const loadingAlert = showLoading('');
      try {
        console.log("req:", req);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetOTHours`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.OTApllyDetails.ot_hours = response.data.data.data;
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

    // Leave //

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
      console.log('API-setLeave');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req, showLoading);
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

    // Movement //

    async getMovementInitData(showLoading) {
      // console.log('API-getMovementInitData');
      // console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Movement/GetMovementInitData`
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.initData.initMovement = response.data.data.data;
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

    async getViewMovement(req, showLoading) {
      console.log('API-getViewMovement');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Movement/GetViewMovement`,
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
          this.movement.arrmovements =
            response.data.data.data.arrMovements || [];
        } else {
          this.movement.arrmovements = [];
          console.error("Loading error:", response.data.message);
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        // if (error.response && error.response.status === 400) {
        //   this.movement.arrmovements = [];
        // }
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async setMovement(req, showLoading) {
      console.log('API-setMovement');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Movement/SetMovement`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          if (response.data.statusCode === 400) {
            this.movement.arrmovements = [];
          }
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getDeleteMovement(req, showLoading) {
      console.log('API-getDeleteMovement');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Movement/GetDeleteMovement`,
          { params: { Id: req.id } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          if (response.data.statusCode === 400) {
          }
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    // TimeCard //

    async getTimeCards(req, showLoading) {
      console.log('API-getTimeCards');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetTimeCards`,
          { params: { empNo: req.empNo } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.timecard.arrtimecard = response.data.data.data || [];
          this.showToast(response.data.message, "success");
        } else {
          console.error("Loading error:", response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("Loading error:", error);
        if (error.response && error.response.status === 400) {
          this.timecard.arrtimecard = [];
        }
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getCreateTimeCard(req, showLoading) {
      console.log('API-getCreateTimeCard');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/SetTimeCardWorkLoad`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.showToast(response.data.message, 'success');
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

    // Holidays

    async setAssignedHolidays(req, showLoading) {
      console.log('API-setAssignedHolidays');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetAssignedHolidays`,
          req
        );
        console.log("response:", response);
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

    async getAssignedHolidays(req, showLoading) {
      console.log('API-getAssignedHolidays',req);
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetAssignedHolidays`,{params:{Month: req.month, Year: req.year}});

        console.log("getAssignedHolidays response:", response.data.data.data);
        if (response.data.isSuccess) {
          this.holiday.arrholidays = response.data.data.data
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

    async getDeleteHoliday(req, showLoading) {
      console.log('API-getDeleteHoliday',req);
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetDeleteHoliday`,{params:{Id: req.id}});

        console.log("getAssignedHolidays response:", response.data.data.data);
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

    // Special Work Arrangement

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

  // Report

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

        // const response = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/hr/Report/GetRectificationReport`,{params: {empNo:req.empNo, dateFrom: req.dateFrom, dateTo:req.dateTo }},{ responseType: 'blob' });
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');

        console.log("response:", respurlnse);
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

  async getEmployeeLeaveAnnualReport(req, showLoading) {
      console.log('API-getEmployeeLeaveAnnualReport:',req);

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Report/GetEmployeeLeave_AnnualReport`,{params: {departmentId:req.departmentId, year: req.year}},{ responseType: 'blob' });
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
          `${import.meta.env.VITE_API_URL}/hr/Report/GetNoPayMonthlyReport`,{params:{dateFrom: req.dateFrom, dateTo: req.dateTo}},{ responseType: 'blob' });
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
