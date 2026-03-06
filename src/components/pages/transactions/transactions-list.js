import { DatePicker } from "../../../utils/date-picker";

export class TransactionsList {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.activePeriodButton = document.querySelector('.btn-secondary');
        DatePicker.getDate('fromDate');
        DatePicker.getDate('toDate');
        this.selectPeriod();
    }

    selectPeriod (period = null) {
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
}
