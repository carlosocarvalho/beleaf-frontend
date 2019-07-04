import { Injectable, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class DialogOptions {
    message: string
    status: string
}

@Injectable()
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }

    openDialog(data: DialogOptions | {}) {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: data
        });

        return dialogRef;
    }
}



@Component({
    selector: 'app-root',
    template: `
    <div>
    <div>
        <p>
            <strong>Notificação: </strong> {{data?.message}}
        </p>
        <p>
            Status: {{data?.status}}
        </p>
    </div>
</div>
    `
})
export class ErrorDialogComponent {
    title = 'Angular-Interceptor';
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOptions) { }
}