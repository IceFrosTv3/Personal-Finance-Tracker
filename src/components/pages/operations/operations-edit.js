import Choices from "choices.js";

export class OperationsEdit {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute

        new Choices('.js-choice-type', {
            searchEnabled: false,
            placeholderValue: "Type...",
            classNames: {
                containerOuter: ['choices', 'form-control']
            }
        });
        new Choices('.js-choice-category', {
            searchEnabled: false,
            placeholderValue: "Category...",
            classNames: {
                containerOuter: ['choices', 'form-control']
            }
        });
        // const id = new URLSearchParams(location.search).get('id');
    }
}
