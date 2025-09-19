import { defineStore } from "pinia";
import axios from "axios";

export const useAttendanceStore = defineStore("attendanceStore", {
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
      console.log('API-getAttendenceByEmp:',req);

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
          // this.showToast("Loading successful!", "success");
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
          this.showToast(response.data.message, 'error');
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
