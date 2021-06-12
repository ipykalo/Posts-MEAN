import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    ErrorModalComponent
  ]
})
export class SharedModule { }
