import * as bootstrap from 'bootstrap';

export class Layout {
    static initCategoryLayout () {
        const button = document.getElementById("category-button");
        if ( !button ) return false;

        const wrapper = button.closest('.category-toggle-wrapper');
        const collapseElement = document.getElementById('category-collapse');
        if ( !wrapper || !collapseElement ) return false;

        if ( button.dataset.inited === '1' ) return;
        button.dataset.inited = '1';

        collapseElement.addEventListener('show.bs.collapse', () => {
            wrapper.classList.add('active')
        });

        collapseElement.addEventListener('hide.bs.collapse', () => {
            wrapper.classList.remove('active')
        })

        if ( location.pathname.includes('/categories') ) {
            wrapper.classList.add('active');
            new bootstrap.Collapse(collapseElement, { toggle: false }).show();
        }

    }

    static activateMenuItem (route) {
        document.querySelectorAll('.list-group-item[href]').forEach(link => {
            const href = link.getAttribute('href');
            if ( (route.route.includes(href) && href !== '/') || (route.route === href && href === '/') ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        })
    }

    // static getBalance() {
    //     const balanceAmount = document.getElementById('balance-amount');
    //     if ( !balanceAmount ) return false;
    // }

    // static initLinks(openNewRoute) {
    //     this.openNewRoute = openNewRoute;
    // }
}
