import { BaseCategories } from "../base-categories";

export class ExpenseCategories extends BaseCategories {
    constructor (openNewRoute) {
        super(openNewRoute, 'expense');
    }
}
