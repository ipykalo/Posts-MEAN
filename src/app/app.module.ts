import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PostCreateComponent } from './post-create/post-create.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        PostCreateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
