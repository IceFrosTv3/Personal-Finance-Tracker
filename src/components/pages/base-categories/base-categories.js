import { CategoriesService } from "../../../services/categories-service";
import { ModalUtils } from "../../../utils/modal-utils";

export class BaseCategories {
    constructor (openNewRoute, type) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        this.init().then();
    }

    async init () {
        this.renderLayout();

        // Находим карточки товаров, чтобы повесить ОДНУ прослушку на всё
        this.categories = document.getElementById("categories");

        const result = await CategoriesService.getCategories(this.type);
        if ( result ) this.renderCategories(result);

        this.initEventListeners();
    }

    renderLayout () {
        document.getElementById('content__main').innerHTML = `
        <section class="container">
            <header class="page-title">${this.type.toUpperCase()}</header>
            <div id="categories" class="categories"></div>
        </section>`;
    }

    renderCategories (categories) {
        for ( const category of categories ) {
            this.categories.appendChild(this.createCategoryCard(category));
        }
        this.categories.insertAdjacentHTML('beforeend', '<button id="category-add-button" class="category-card" type="button">+</button>');
    }

    createCategoryCard (category) {
        const article = document.createElement("article");
        article.id = category.id;
        article.className = "category-card";

        const h3 = document.createElement("h3");
        h3.className = "category-card__title";
        h3.textContent = category.title;
        article.appendChild(h3);

        article.insertAdjacentHTML('beforeend', `
            <div class="category-card__actions">
                <a href="/categories/${this.type}/edit?id=${category.id}" class="btn btn-primary">Edit</a>
                <button class="btn btn-danger" type="button" data-action="delete">Delete</button>
            </div>
        `);

        return article;
    }

    initEventListeners () {
        document.getElementById('category-add-button').addEventListener('click',
            () => this.openNewRoute(`/categories/${this.type}/create`));

        this.categories.addEventListener("click", (e) => {
            const button = e.target.closest('button');
            if ( !button || button.textContent.trim().toLowerCase() !== 'delete' ) return;

            const card = button.closest('.category-card');
            if ( !card ) return;

            ModalUtils.confirm('category', async () => {
                const result = await CategoriesService.deleteCategory(this.type, card.id);
                if ( result ) {
                    document.getElementById(card.id).remove();
                }
            })
        });
    }
}
