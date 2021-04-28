import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';


const routes: Routes = [
	{ path: '', component: PostListComponent },
	{ path: 'create', component: PostCreateComponent },
	{ path: 'edit/:id', component: PostCreateComponent },
	{ path: '**', component: PostListComponent, redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
