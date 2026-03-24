export class SelectPeriod {
    constructor (onPeriodChange) {
        this.onPeriodChange = onPeriodChange;
        this.activePeriodButton = document.querySelector('#periods .btn-secondary');

        document.getElementById('periods').addEventListener('click', (e) => {
            const button = e.target.closest("[data-period]");
            if ( !button || button === this.activePeriodButton ) return false;

            this.setActivateButton(button);
            const { dateFrom, dateTo } = this.calculateDates(button.dataset.period);
            this.onPeriodChange(dateFrom, dateTo, button.dataset.period);
        })
    }

    setActivateButton (button) {
        this.activePeriodButton.classList.replace('btn-secondary', 'btn-outline-secondary');
        button.classList.replace('btn-outline-secondary', 'btn-secondary');
        this.activePeriodButton = button;
    }

    calculateDates (period) {
        let dateFrom = new Date();
        const dateTo = new Date();

        switch (period) {
            case 'week':
                dateFrom.setDate(dateTo.getDate() - 7);
                break;
            case 'month':
                dateFrom.setMonth(dateTo.getMonth() - 1);
                break;
            case 'year':
                dateFrom.setFullYear(dateTo.getFullYear() - 1);
                break;
            case 'all':
                dateFrom = null;
        }
        return { dateFrom, dateTo };
    }
}
