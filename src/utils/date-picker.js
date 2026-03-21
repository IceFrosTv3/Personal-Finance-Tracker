import { TempusDominus } from "@eonasdan/tempus-dominus";
import { biOneIcons } from '@eonasdan/tempus-dominus/dist/plugins/bi-one'

export class DatePicker {
    static datePickerOptions = {
        display:
            {
                icons: biOneIcons,
                toolbarPlacement: 'bottom',
                buttons: {
                    today: true,
                    clear: true,
                },
                components: {
                    clock: false,
                },
            },
        localization: {
            startOfTheWeek: 1,
            dayViewHeaderFormat: { month: 'long', year: 'numeric' },
        },
    }

    static getDate (id, onChange) {
        const datePickerElement = document.getElementById(id);

        datePickerElement.addEventListener('change.td', (e) => {
            const date = e.detail.date;
            const formatedDate = date.toLocaleDateString();
            const span = datePickerElement.querySelector('span');
            if ( span ) {
                span.textContent = formatedDate;
            } else {
                datePickerElement.value = formatedDate;
            }
            if ( onChange ) onChange(date);
        })
        return new TempusDominus(datePickerElement, this.datePickerOptions);
    }
}
