
import { defineStore } from 'pinia';
import Finance from '~/components/dashboard/finance.vue';

export const useDashboardStore  = defineStore('dashboard', {
  state: () => ({
    // hr
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
    }

  }),
});
