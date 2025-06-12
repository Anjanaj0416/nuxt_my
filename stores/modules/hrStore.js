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
      workgroupjobcount: null,
    },
    curEmployee:{},
    alempdetails: [],
    empdetails: {
      id: "",
      empNo: "",
      csoNo: "",
      epfNo: "",
      empName: "",
      callingName: "",
      nic: "",
      nicImage: null,
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
      image: null,
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
      signature: null,
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
      tot_normal_overtime: null,
      tot_sunday_overtime: null,
      isTheTimeCardApproved: null,
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

  //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info

  actions: {

    //addEditEmployee
    async AddEdiEmployee(formData, showLoading) {    
     
     
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
        console.error("Error in server call:", error);
        this.showToast("Error in server call", "error");
      }
    },



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

    //GetUpdateEmployeeDetails
    async GetUpdateEmployeeDetails(formData, showLoading) {
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

    //loadInitHRDetails
    async loadInitHRDetails(showLoading) {
      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/HRCommon/GetInitHRDetails`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.initHRDetails = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
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
        nicImage: null,
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
        image: null,
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
        signature: null,
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

    async otCancel() {
      this.OTApllyDetails.ot_hours = 0;
    },

    async getWorkLoadCount() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadCount`
        );

        if (response.data.isSuccess) {
          this.dashboard.workgroupjobcount = response.data.data.count || 0;
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

        if (response.data.isSuccess) {
          this.workgroup.arrJobCardDetails =
            response.data.data.data.jobArr || [];
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

    async getAttendenceByEmp(req, showLoading) {
      const loadingAlert = showLoading("");
      try {
      
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/Attendance/GetAttendenceByEmp`,
          req
        );
        console.log("response:", response);
        if (response.data.isSuccess) {
          this.attendence.tot_normal_overtime =
            response.data.data.data.totNormalOvertime || null;
          this.attendence.tot_sunday_overtime =
            response.data.data.data.totSundayOvertime || null;
          this.attendence.isTheTimeCardApproved =
            response.data.data.data.isTheTimeCardApproved || null;
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

    async setOTManual(req, showLoading) {
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

    async setManualRectification(req, showLoading) {
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

    async getOTHours(req) {
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

    async getMovementInitData(showLoading) {
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

    async getTimeCards(req, showLoading) {
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
