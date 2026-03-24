import { CategoriesService } from "../../../services/categories-service";
import { OperationsService } from "../../../services/operations-service";
import { DatePicker } from "../../../utils/date-picker";
import { Layout } from "../../layout";

export class OperationsForm {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute
        this.operationId = new URLSearchParams(location.search).get('id');
        this.operationType = new URLSearchParams(location.search).get('operation');
        this.init().then();
    }

    async init () {
        document.getElementById('content__main').innerHTML = `
        <section class="container">
            <header class="page-title">${this.operationId ? 'Edit' : 'Create'} operation</header>
            <div class="operation">
                <form class="form-group">
                    <select id="operation__type" class="form-select" aria-label="Type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select id="operation__category" class="form-select" aria-label="Category">
                    </select>
                    <input id="operation__amount" type="number" class="form-control" placeholder="Amount in $..." aria-label="Amount">
                    <input id="operation__date" class="form-control" placeholder="Date..." aria-label="Date">
                    <input id="operation__comment" class="form-control" placeholder="Comment..." aria-label="Note">
                </form>
                <div class="actions-group">
                    <button id="operation__save" class="btn btn-success" type="button">
                        ${this.operationId ? 'Save' : 'Create'}
                    </button>
                    <a href="/operations" class="btn btn-danger">Cancel</a>
                </div>
            </div>
        </section>
        `;

        this.typeSelect = document.getElementById('operation__type');
        this.categorySelect = document.getElementById('operation__category');
        this.amountInput = document.getElementById('operation__amount');
        this.dateInput = document.getElementById('operation__date');
        this.commentInput = document.getElementById('operation__comment');


        if ( this.operationId ) {
            await this.fillEditFields();
        } else {
            this.typeSelect.value = this.operationType;
            await this.loadCategories(this.operationType);
        }

        DatePicker.getDate('operation__date', (date) => {
            this.selectedDate = date;
        });

        this.typeSelect.addEventListener('change',
            async () => await this.loadCategories(this.typeSelect.value));
        document.getElementById('operation__save').addEventListener('click', () => this.save())
    }

    async loadCategories (operationType) {
        const categories = await CategoriesService.getCategories(operationType);
        if ( categories ) {
            this.categorySelect.innerHTML = categories
                .map(category => `<option value="${category.id}">${category.title}</option>`)
                .join('');
        }
    }

    async fillEditFields () {
        const operation = await OperationsService.getOperationByName(this.operationId);
        if ( !operation ) return false;

        this.typeSelect.value = operation.type;
        await this.loadCategories(operation.type);

        const match = Array.from(this.categorySelect.options)
            .find(option => option.text === operation.category);
        if ( match ) this.categorySelect.value = match.value;

        this.amountInput.value = operation.amount;
        this.dateInput.value = operation.date;
        this.commentInput.value = operation.comment;
    }

    async save () {
        const data = {
            type: this.typeSelect.value,
            category_id: Number(this.categorySelect.value),
            amount: Number(this.amountInput.value),
            date: this.selectedDate
                ? new Date(this.selectedDate).toISOString().split('T')[0]
                : this.dateInput.value,
            comment: this.commentInput.value,
        };
        const result = this.operationId
            ? await OperationsService.updateOperation(this.operationId, data)
            : await OperationsService.createOperation(data);
        if ( result ) {
            await Layout.getBalance();
            this.openNewRoute('/operations')
        }
    }
}
