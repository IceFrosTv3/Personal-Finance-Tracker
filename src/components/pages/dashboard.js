import { Chart } from "chart.js/auto";
import { TempusDominus } from '@eonasdan/tempus-dominus';
import { biOneIcons } from '@eonasdan/tempus-dominus/dist/plugins/bi-one'
import { DatePicker } from "../../utils/date-picker";

export class Dashboard {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.chartRender();

        this.activePeriodButton = document.querySelector('.btn-secondary');
        DatePicker.getDate('fromDate');
        DatePicker.getDate('toDate');
        this.selectPeriod();
    }

    selectPeriod(period = null) {
        const periods = document.getElementById('period');
        periods.addEventListener('click', (e) => {
            const button = e.target.closest("[data-period]");
            if ( !button ) return false;

            if ( button === this.activePeriodButton ) return false;
            this.activePeriodButton.classList.remove('btn-secondary');
            this.activePeriodButton.classList.add('btn-outline-secondary');
            button.classList.add('btn-secondary');
            button.classList.remove('btn-outline-secondary');
            this.activePeriodButton = button;
        })
    }

    chartRender () {
        const data = {
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [200, 50, 100, 100, 145],
                hoverOffset: 4
            }]
        };
        const incomesChart = document.getElementById('chart__incomes');
        const expensesChart = document.getElementById('chart__expenses');

        const chartConfig = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                            }
                        }
                    },
                }
            },
        }
        new Chart(incomesChart, chartConfig);
        new Chart(expensesChart, chartConfig);
    };

}
