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
                    clock: false
                },
            },
        localization: {
            locale: 'en-GB',
            startOfTheWeek: 1,
            dayViewHeaderFormat: { month: 'long', year: 'numeric' },
        },
    }

    static getDate (id) {
        const datePickerElement = document.getElementById(id);
        datePickerElement.addEventListener('change.td', (e) => {
            datePickerElement.querySelector('span').textContent = e.detail.date.toLocaleDateString('en-GB')
        })
        return new TempusDominus(datePickerElement, this.datePickerOptions);
    }
}
