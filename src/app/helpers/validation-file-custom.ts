import { FormControl } from '@angular/forms';


export function requiredFileType(type: Array<string>) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (type.indexOf(extension) < 0) {
                return {
                    requiredFileType: true
                };
            }
            return null;
        }
        return null;
    };
}


export function sizeFileValidator(sizeLength: string) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const size = file.size;
            let calcSize = 0;
            const k = 1024;
            const sizeType = sizeLength.substring(sizeLength.length - 2, sizeLength.length)
            const multiply = Number(sizeLength.replace(sizeType, ''))
            switch (sizeType.toLowerCase()) {
                case 'mb':
                    calcSize = (k * k) * multiply
                    break;
                case 'gb':
                    calcSize = (k * k * k) * multiply
                    break;
            }
            if (size > calcSize) {
                return {
                    sizeFileValidator: true
                }
            }
            // const extension = file.name.split('.')[1].toLowerCase();
            // if (type.indexOf(extension) < 0) {
            //     return {
            //         sizeFileValidator: true
            //     };
            // }
            return null;
        }
        return null;
    };
}