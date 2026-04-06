<template>
    <div class="p-3 card h-100 shadow-sm h-100">
        <h5> Applications: </h5>
        <div class="d-flex justify-content-center my-3 h-100 ">
            <div v-if="chartData.labels.length > 1" class="w-100 job-chart">
                <canvas ref="canvasRef"></canvas>
            </div>
            <div v-else class="job-chart-empty d-flex align-items-center">
                <div class="text-center">
                    <h1>📈</h1>
                    <h5 class="mb-0 mt-3">{{ Number(chartData.data) }} job{{ Number(chartData.data) > 1 ? 's' : '' }}
                        applied on {{ String(chartData.labels) }}</h5>
                    <p class="mt-3"> Not enough data yet. Start adding more jobs to see trends</p>
                </div>
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
let chartData = useChartData()
function renderChart() {
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
<style>
@media (min-width:1277px) {
    .job-chart-empty, .job-chart {
        min-height: 350px;
    }
}
@media (min-width:756px) and (max-width:1276px) {
    .job-chart-empty, .job-chart {
        min-height: 375px;
    }
}
</style>