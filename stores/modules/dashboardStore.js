import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useDashboardStore  = defineStore('dashboard', {
  state: () => ({
    // hr

    hrDashboardList: {
      loggedUserName: "",
      todayAttendance: {},
      leaveBalance: {},
      todayEmployeeSummary: {},
      todayManagers: [],
      upcommingBirthdays: [],
      approvalStatus: {},
      monthNoOfNoPays: {},
      monthTotalOverTimes: {},
      monthTotalLeave: {},
      monthTotalMovement: {},
      monthTotalRectification: {},
      monthTotalWorkedHours: {}
    },
     attendanceOverview: {
      totalEmployees: 50,
      present: 14,
      absent: 12,
      onLeave: 7,
    },
     todaysManagers: [
      { id: 1, name: 'Mr. Nimal Perera', status: 'Present' },
      { id: 2, name: 'Ms. Shanika Silva', status: 'Present' },
      { id: 3, name: 'Mr. Dinesh Fernando', status: 'Present' },
    ],
    pendingLeaves: [
      { name: 'Madushani R.', duration: '3 Days' },
      { name: 'Thilina G.', duration: '1 Day' },
    ],
    upcomingBirthdays: [
      { name: 'Nimesha Jayasinghe', date: 'June 25' },
      { name: 'Tharindu Perera', date: 'June 28' },
      { name: 'Roshan Silva', date: 'July 01' },
    ],
    satisfactionScore: 87, // In percentage
    // Finance
    financialSummary: {
      totalRevenueMTD : 50000.00,
      totalRevenueYTD : 40000.00,
      totalExpensesMTD : 70000.00,
      profitMonthly : 81100.00
    },
    claimsSummary: {
      expenseClaims : 50000.00,
      pendingApproval : 40000.00,
      approved : 70000.00,
      rejected : 81100.00,
      reimbursed : 52000.00,
    },
    invoices : {
      issuedToday : 12,
      issuedThisWeek : 45,
      paid : 45,
      overdue : 452,
    },
    // sales
    todaySalesSummary :{
      totalSales: 50,
      pendingSales : 40,
      completedSales : 70,
    },
    monthlySalesSummary : {
      totalSales: 50,
      pendingSales : 40,
      completedSales : 70,
      rejectedSales : 2,
      refundedSales : 20,
      inProgress : 40,
    },

    attendance: {
      present: 45,
      absent: 5,
      onLeave: 3,
    },
    projectStatus: {
      completed: 12,
      inProgress: 7,
      pendingApproval: 3,
      overdue: 1,
      cancelled: 0,
      onHold: 2,
    },
    teamPerformance: {
      avgProductivity: 88,
      tasksCompleted: 320,
      pendingTasks: 15,
      overdueTasks: 3,
    },
    pendingApprovals: {
      count: 4,
    },

  }),

  actions: {

  async hrDashboard(showLoading) {
    const loadingAlert = showLoading('') 

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/hr/HRCommon/GetEmployeeDashBoardDetails`);

      console.log('response:', response);

      if (response.data.isSuccess) {
        const hrData = response.data.data.data;


        this.hrDashboardList = {
          loggedUserName: hrData.loggedUserName,
          todayAttendance: hrData.todayAttendance,
          leaveBalance: hrData.leaveBalance,
          todayEmployeeSummary: hrData.todayEmployeeSummary,
          todayManagers: hrData.todayManagers,
          upcommingBirthdays: hrData.upcommingBirthdays, 
          approvalStatus: hrData.approvalStatus,
          monthNoOfNoPays: hrData.monthNoOfNoPays,
          monthTotalOverTimes: hrData.monthTotalOverTimes,
          monthTotalLeave: hrData.monthTotalLeave,
          monthTotalMovement: hrData.monthTotalMovement,
          monthTotalRectification: hrData.monthTotalRectification,
          monthTotalWorkedHours: hrData.monthTotalWorkedHours,
        };
      } else {
        console.log("error:",error);
        
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load Employee data", "error");
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
  }
});
