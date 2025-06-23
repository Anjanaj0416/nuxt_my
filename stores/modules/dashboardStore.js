
import { defineStore } from 'pinia';

export const useDashboardStore  = defineStore('dashboard', {
  state: () => ({
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
  }),
});
