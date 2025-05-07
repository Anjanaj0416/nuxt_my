import { defineStore } from 'pinia';
import axios from 'axios';

export const useHrStore = defineStore('hrStore', {
  state: () => ({
    loggeduser: {},
    dashboard: {
      workgroupjobcount: null,
    },
    alempdetails: [],
    empdetails: {
      isresigned : false,
      empId : "173",
      image : "abc.png",
      empname : "Thilini",
      empno : "B00253",
      epfNo : "253",
      callingname : "Thilini",
      nic : "975063780V",
      address : "No. 82/1, St.Rita's Road, Mt.lavinia",
      contact1 : "0767585568",
      email1 : "thili@abc.com",
      email2 : "thili2@abc.com",
      homePhoneNo : "0112410503",
      emergencyContact : "0112410503",
      gender : "Female",
      dob : "01/06/97",
      deptNo : "Digital Service",
      staffType : "SLTDS",
      empType : "Post-Contract",
      dateOfJoin : "02/01/23",
      category : "Employee",
      isExecutive : "No",
      isExecutive : "No",
      supervisor : "Thushara Premathilake",
      annualLeave : "14",
      casualLeave : "7",
      sickLeave : "7",
      otherLeave : "0",
      isOTAllow : "Yes",
      onTime : "08:30:00",
      offTime : "17:00:00",
      username : "B00253",
      isResign : "No",
      dateOfResign : "01/01/00",
      reasonForResign : "",
      signature : "signature.png",
    },
    attendence: {
      tot_normal_overtime: null,
      tot_sunday_overtime: null,
      isTheTimeCardApproved: null,
      alattendences: []
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
      ]
    },
    OTApllyDetails: {
      ot_hours: 0,
    },
    absense: {
      arrabsences: [],
      arrLeaveBalances:[]
    },
    movement:{
      arrmovements: [],
    },
    timecard:{
      arrtimecard: [],
    },
    workgroup:{
      arrJobCardDetails: [],
    },
    initData: {
      initEmployee: {},
      initAbsence: {},
      initMovement: {},
    },
    authToken: "",
    isLoading: true,
  }),

  persist: true,

   //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info

  actions: {
    async clearAll(){
      this.attendence = {};
      this.absense.arrabsences = [];
      this.movement.arrmovements = [];
      this.timecard.arrtimecard = [];
    },

    async otCancel(){
      this.OTApllyDetails.ot_hours = 0;
    },

    async getWorkLoadCount() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadCount`);   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.dashboard.workgroupjobcount = response.data.data.count || 0;
       }
       else{
        console.error('Loading error:', response.data.message);       
       }
        
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
    },

    async getWorkLoadDetails(showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadDetails`);   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.workgroup.arrJobCardDetails =  [];//response.data.data.data ||
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
       }
        
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getInitEmployee() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Employee/GetInitEmployee`);   
        // console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.initData.initEmployee = response.data.data.data || [];
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
    },

    async searchEmployees(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Employee/SearchEmployees`, req);   
       
        if (response.data.isSuccess) {    
          this.alempdetails = response.data.data.data.alpagedetails[0].alempdetails || [];
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getEmployeeByID(id,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Employee/GetEmployeeByID`, {params: { id: id.empid}});   
        // console.log("response:",response.data.data.data);   
        if (response.data.isSuccess) {    
          this.empdetails = response.data.data.data || {};
          // this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getAttendenceByEmp(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Attendance/GetAttendenceByEmp`,req); 
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.attendence.tot_normal_overtime = response.data.data.data.totNormalOvertime || null;
          this.attendence.tot_sunday_overtime = response.data.data.data.totSundayOvertime || null;
          this.attendence.isTheTimeCardApproved= response.data.data.data.isTheTimeCardApproved || null;
          this.attendence.alattendences = response.data.data.data.alAttendences|| [];
          // this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async setOTManual(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTManual`, {params: { Id: req.id, otHours: req.otHours}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          // this.empdetails = response.data.data.data || {};
          this.showToast('OT apply successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async setOTApproval(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Attendance/SetOTApproval`, req);   
        console.log("response:",response);   
        if (response.data.isSuccess) { 

          const attendenceReq = {
            EmpNo: req.EmpNo,
            FromDate: req.FromDate,
            ToDate: req.ToDate
          };
          await this.getAttendenceByEmp(attendenceReq, showLoading);
          
          // this.showToast('OT apply successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async setManualRectification(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Attendance/SetManualRectification`, {params: { Id: req.attendance_id, InTime: req.intime, OutTime: req.outtime}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          // this.empdetails = response.data.data.data || {};
          // this.showToast('Rectify apply successful!', 'success'); 

          const attendenceReq = {
            EmpNo: req.EmpNo,
            FromDate: req.FromDate,
            ToDate: req.ToDate
          };
          await this.getAttendenceByEmp(attendenceReq, showLoading);
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getOTHours(req) {
      // const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Attendance/GetOTHours`, req);   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.OTApllyDetails.ot_hours = response.data.data.data;
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      // loadingAlert.close();
    },

    async getAbsenceInitData() {
      // const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Absence/GetAbsenceInitData`);   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.initData.initAbsence = response.data.data.data;
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      // loadingAlert.close();
    },

    async getViewAbsences(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);  
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Absence/GetViewAbsences`,{params: {empNo: req.empNo, fromDate: req.fromDate, toDate: req.toDate}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.absense.arrabsences = response.data.data.data.arrAbsences || [];
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        if (error.response && error.response.status === 400) {
          this.absense.arrabsences = [];
        } 
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getLeaveBalance(req,showLoading ) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req,showLoading);   
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Absence/GetLeaveBalance`,{params: { empNo: req.empNo, year: req.leaveYear}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.absense.arrLeaveBalances = response.data.data.data.arrLeaveBalances;
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async setLeave(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req,showLoading);   
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Absence/SetLeave`,req);   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.showToast(response.data.message, 'success');  
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getDeleteAbsence(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);   
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Absence/GetDeleteAbsence`,{params: {Id: req.absendce_id}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.showToast("Leave removed successfully!", 'success');  
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getMovementInitData(showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Movement/GetMovementInitData`);   
        console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.initData.initMovement = response.data.data.data;
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getViewMovement(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);  
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Movement/GetViewMovement`,{params: {empNo: req.empNo, fromDate: req.fromDate, toDate: req.toDate}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.movement.arrmovements = response.data.data.data.arrMovements || [];
       }
       else{
        console.error('Loading error:', response.data.message);  
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        if (error.response && error.response.status === 400) {
          this.movement.arrmovements = [];
        } 
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async setMovement(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);  
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Movement/SetMovement`,req);   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.showToast(response.data.message, 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);  
        if (response.data.statusCode === 400) {
          this.movement.arrmovements = [];
        }     
        // this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getDeleteMovement(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);  
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Movement/GetDeleteMovement`,{params: {Id: req.movement_id}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.showToast(response.data.message, 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);  
        if (response.data.statusCode === 400) {
        }     
        this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },

    async getTimeCards(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        console.log("req:",req);  
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetTimeCards`,{params: {empNo: req.empNo}});   
        console.log("response:",response);   
        if (response.data.isSuccess) {   
          this.timecard.arrtimecard = response.data.data.data || []
          this.showToast(response.data.message, 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);  
        this.showToast(response.data.message, 'error'); 
       }
      } catch (error) {
        console.error('Loading error:', error);
        if (error.response && error.response.status === 400) {
          this.timecard.arrtimecard = [];
        } 
        // this.showToast(error.response.data.Message, 'error'); 
      }
      loadingAlert.close();
    },
    
    async showToast(message,type) {
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    },
   
  },
});
