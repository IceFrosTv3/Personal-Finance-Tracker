import { Chart } from "chart.js/auto";
import { BaseFiltersPage } from "./base-filters-page";
import { CategoriesService } from "../../services/categories-service";
import { OperationsService } from "../../services/operations-service";

export class Dashboard extends BaseFiltersPage {
    constructor (openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        this.incomeChart = null;
        this.expenseChart = null;
        this.initPeriodFilter(() => this.renderCharts());
        this.renderCharts().then();
    }

    async renderCharts () {
        await this.chartRender('income', document.getElementById('chart__incomes'));
        await this.chartRender('expense', document.getElementById('chart__expenses'));
    }

    async chartRender (type, chartElement) {
        // Получаем массив объектов [{ id: 1, title: 'Зарплата' }, { id: 2, title: 'Депозиты' }, ...]
        const categories = await CategoriesService.getCategories(type);

        // Получаем все операции [{ type: 'income', category: 'Зарплата', amount: 500 }, ...]
        let operations;
        if ( this.dateFrom && this.dateTo ) {
            operations = await OperationsService.getOperationsWithFilter(this.dateFrom, this.dateTo)
        } else if ( this.period === 'all' ) {
            operations = await OperationsService.getAllOperations()
        } else {
            operations = await OperationsService.getTodayOperations();
        }

        // Оставляем только операции нужного типа переданной в type
        // filter создаёт новый массив, оставляя только элементы, где условие true
        const filteredOperations = operations.filter(operation => operation.type === type);

        // map перебирает каждую категорию и возвращает число — сумму по ней
        // для каждой категории:
        //   1. filter оставляет только операции этой категории
        //   2. reduce суммирует их amount
        //      reduce(колбэк, начальное_значение)
        //      sum — накопитель (начинается с 0)
        //      operation — текущий элемент массива
        //      sum + operation.amount — добавляем amount к накопителю
        // В итоге amounts = [1500, 300, 800, ...] — по одному числу на каждую категорию
        const data = categories.map(category => {
            return filteredOperations
                .filter(operation => operation.category === category.title)
                .reduce((sum, operation) => sum + operation.amount, 0);
        });

        // map вытаскивает только title из каждого объекта категорий
        // ['Зарплата', 'Депозиты', 'Фриланс', ...]
        const labels = categories.map(category => category.title);

        // Ищем операции у которых category пустой или null (удалённая категория)
        const uncategorizedAmount = filteredOperations
            .filter(operation => !operation.category)
            .reduce((sum, operation) => sum + operation.amount, 0);

        // Добавляем "Other" только если такие операции реально есть
        if ( uncategorizedAmount > 0 ) {
            labels.push('Other');  // добавляем строку в конец массива лейблов
            data.push(uncategorizedAmount);  // добавляем сумму в конец массива данных
        }

        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        const saturation = isDark ? 40 : 70;
        const lightness = isDark ? 50 : 60;
        const colors = labels.map((_, i) =>
            `hsl(${(i * 360 / labels.length)}, ${saturation}%, ${lightness}%)`
        );

        // Проверяем тип графика
        const chartInstance = type === 'income' ? this.incomeChart : this.expenseChart;

        const chartConfig = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    hoverOffset: 8,
                    backgroundColor: colors,
                }]
            },
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
                    colors: {
                        enabled: false
                    }
                }
            },
        }
        if ( chartInstance ) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data;
            chartInstance.data.datasets[0].backgroundColor = colors
            chartInstance.update();
        } else {
            const newChart = new Chart(chartElement, chartConfig);
            if ( type === 'income' ) this.incomeChart = newChart;
            else this.expenseChart = newChart;
        }
    };

}
