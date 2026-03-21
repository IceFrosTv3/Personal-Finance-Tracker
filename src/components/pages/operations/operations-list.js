import { OperationsService } from "../../../services/operations-service";
import { ModalUtils } from "../../../utils/modal-utils";
import { Layout } from "../../layout";
import { BaseFiltersPage } from "../base-filters-page";

export class OperationsList extends BaseFiltersPage {
    constructor (openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        this.tbody = document.getElementById('tbody-table');
        this.pagination = document.getElementById('pagination');
        this.allOperations = [];
        this.currentPage = 1;
        this.perPage = 10;

        this.buttonCreateListener();
        this.loadOperations().then();
        this.initPeriodFilter(() => this.loadOperations());

        this.tbody.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-id]');
            if ( !button ) return false;

            const id = button.dataset.id;

            ModalUtils.confirm('operation', async () => {
                const result = await OperationsService.deleteOperation(id);
                if ( result ) {
                    this.allOperations = this.allOperations.filter(op => String(op.id) !== String(id));
                    const totalPages = Math.ceil(this.allOperations.length / this.perPage);
                    if ( this.currentPage > totalPages && totalPages > 0 ) this.currentPage = totalPages;
                    this.renderPage();
                    await Layout.getBalance();
                }
            });
        });
    }

    buttonCreateListener () {
        document.getElementById('create-income').addEventListener('click',
            () => this.openNewRoute('/operations/create?operation=income'));
        document.getElementById('create-expense').addEventListener('click',
            () => this.openNewRoute('/operations/create?operation=expense'));
    }

    async loadOperations () {
        let result;
        if ( this.dateFrom && this.dateTo ) {
            result = await OperationsService.getOperationsWithFilter(this.dateFrom, this.dateTo);
        } else if ( this.period === 'all' ) {
            result = await OperationsService.getAllOperations();
        } else {
            result = await OperationsService.getTodayOperations();
        }
        if ( result ) {
            this.allOperations = result;
            this.currentPage = 1;
            this.renderPage();
        }
    }

    renderPage () {
        const start = (this.currentPage - 1) * this.perPage;
        const slice = this.allOperations.slice(start, start + this.perPage);
        this.renderOperationsList(slice, start);
        this.renderPagination();
    }

    renderOperationsList (operations, offset = 0) {
        this.tbody.innerHTML = '';
        for ( const [index, operation] of operations.entries() ) {
            const typeClass = operation.type === 'income' ? 'type--income' : 'type--expense';
            const formatDate = new Date(operation.date).toLocaleDateString();
            const tr = document.createElement('tr');
            tr.id = operation.id;
            tr.innerHTML = `
                <th class="col-hidden" scope="row">${offset + index + 1}</th>
                <td class="${typeClass}">${operation.type}</td>
                <td>${operation.category}</td>
                <td>$${operation.amount}</td>
                <td>${formatDate}</td>
                <td class="col-hidden">${operation.comment}</td>
                <td class="table__options">
                    <button type="button" class="btn" data-id="${operation.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <a href="/operations/edit?id=${operation.id}" class="btn">
                        <i class="bi bi-pencil"></i>
                    </a>
                </td>
            `;
            this.tbody.appendChild(tr);
        }
    }

    renderPagination () {
        const total = this.allOperations.length;
        const totalPages = Math.ceil(total / this.perPage);

        if ( totalPages <= 1 ) {
            this.pagination.innerHTML = '';
            return;
        }

        const start = (this.currentPage - 1) * this.perPage + 1;
        const end = Math.min(this.currentPage * this.perPage, total);

        this.pagination.innerHTML = `
            <span class="pagination__info">${start}–${end} of ${total}</span>
            <ul class="pagination">
                <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                    <button class="page-link" data-page="${this.currentPage - 1}">&#8249;</button>
                </li>
                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                        <button class="page-link" data-page="${page}">${page}</button>
                    </li>
                `).join('')}
                <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                    <button class="page-link" data-page="${this.currentPage + 1}">&#8250;</button>
                </li>
            </ul>
        `;

        this.pagination.querySelectorAll('button[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentPage = Number(btn.dataset.page);
                this.renderPage();
            });
        });
    }
}
