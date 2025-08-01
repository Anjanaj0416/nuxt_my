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
    },
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
    initData: {
      // initEmployee: {},
      initAbsence: {},
      initMovement: {},
    },
    authToken: "",
    isLoading: true,
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
        // console.log("response:",response.data.data.data);
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

    async getWorkLoadCount() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadCount`
        );

        console.log("response:",response);

        if (response.data.isSuccess) {
          this.dashboard.workgroupjobcount = response.data.data.data[0].assignedUser.jobArr.length || 0;
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

    //Attendence//
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

    async getOTApprovals(req, showLoading) {
      console.log('API-getOTApprovals');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
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
          // this.showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error("Loading error:", error);
        this.showToast(error.response.data.Message, "error");
      }
      loadingAlert.close();
    },
    









    async setOTManual(req, showLoading) {
      console.log('API-setOTManual');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTManual`,
          { params: { Id: req.id, otHours: req.otHours } }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.empdetails = response.data.data.data || {};
          this.showToast("OT apply successful!", "success");
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

    async otCancel() {
      this.OTApllyDetails.ot_hours = 0;
    },

    async setManualRectification(req, showLoading) {
      console.log('API-setManualRectification');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        console.log("req:", req);
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/hr/Attendance/SetManualRectification`,
          {
            params: {
              Id: req.attendance_id,
              InTime: req.intime,
              OutTime: req.outtime,
            },
          }
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          // this.empdetails = response.data.data.data || {};
          // this.showToast('Rectify apply successful!', 'success');

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
          // this.empdetails = response.data.data.data || {};
          this.showToast(response.data.message, 'success');
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
          { params: { Id: req.absendce_id } }
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
        // this.showToast(error.response.data.Message, 'error');
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
          { params: { Id: req.movement_id } }
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
