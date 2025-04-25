<template>
    <section>
    <div class="bg-white p-6 shadow-md rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Revenue Trend (Last 6 Months)</h3>
    
      <Line :data="chartData" :options="chartOptions" />
    </div>
</section>
  </template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'
  
  // Register Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [4000, 3200, 4500, 5000, 4700, 5300],
        borderColor: '#1E40AF',
        backgroundColor: 'rgba(30, 64, 175, 0.2)',
        pointBackgroundColor: '#1E40AF',  // Blue points on the line
      pointBorderColor: '#ffffff',  // White border for points
      pointBorderWidth: 2,  // Border width of the points
      pointRadius: 5,  // Size of the points
      fill: true,  // Fill under the line
      tension: 0.4  // Curve smoothness of the line
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue Trend'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  