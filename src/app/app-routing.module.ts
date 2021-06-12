import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloader } from './app-custom-preloader';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'posts', loadChildren: () => import("./posts/posts.module").then(mod => mod.PostsModule), data: { preload: true } },
	{ path: '**', redirectTo: 'posts' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })],
	exports: [RouterModule],
	providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
