<template>
    <div class="p-3 card h-100 shadow-sm">
        <h5>Applications: </h5>
        <div class="d-flex justify-content-center my-3">
            <div style="height: 351px;" class="w-100">
                <canvas ref="canvasRef"></canvas>
            </div>
        </div>
    </div>
</template> 
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useJobStore } from '@/stores/useJobStore'
import { useChartData } from '@/composables/useChartData'

const jobStore = useJobStore()
const canvasRef = ref(null)
let chartInstance: any = null

function renderChart() {
    let chartData = useChartData()
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Applications',
                data: chartData.data,
                tension: 0.4,
                fill: true,
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.15)',
                pointRadius: 0
            }
        ]
    }

    if (chartInstance)
        chartInstance.destroy()

    if (canvasRef.value) {
        chartInstance = new Chart(canvasRef.value, {
            type: 'line',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0, 
                            stepSize: 1   
                        }
                    }
                }
            }
        })
    }
}

onMounted(renderChart)

watch(() => jobStore.total, renderChart, { deep: true })

</script>