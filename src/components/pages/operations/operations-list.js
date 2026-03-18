import { DatePicker } from "../../../utils/date-picker";
import { SelectPeriod } from "../../../utils/select-period";

export class OperationsList {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute;
        DatePicker.getDate('fromDate');
        DatePicker.getDate('toDate');
        new SelectPeriod();
    }
}
