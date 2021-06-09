import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './auth/authorization.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';


const routes: Routes = [
	{ path: '', component: PostListComponent, canActivate: [AuthorizationGuard] },
	{ path: 'posts', component: PostListComponent, canActivate: [AuthorizationGuard] },
	{ path: 'create', component: PostCreateComponent, canActivate: [AuthorizationGuard] },
	{ path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthorizationGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: '**', component: PostListComponent, redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
