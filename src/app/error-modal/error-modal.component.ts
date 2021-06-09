import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogdata } from './dialog-data.interface';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
    title: string;
    message: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: IDialogdata) {
        this.title = data?.title || 'Dialog';
        this.message = data?.message || 'No Message';
    }
}
