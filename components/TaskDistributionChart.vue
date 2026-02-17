<template>
  <div class="relative h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  pendingCount: number
  completedCount: number
}>()

const chartData = computed(() => ({
  labels: ['Pending', 'Completed'],
  datasets: [
    {
      label: 'Tasks',
      data: [props.pendingCount, props.completedCount],
      backgroundColor: ['#FBBF24', '#10B981'],
      borderRadius: 6,
      barThickness: 50
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1F2937',
      padding: 12,
      cornerRadius: 8,
      displayColors: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#E5E7EB',
        borderDash: [5, 5]
      },
      ticks: {
        stepSize: 1,
        font: {
          family: "'Inter', sans-serif"
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          weight: 'bold'
        }
      }
    }
  }
}
</script>
