import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "../auth/authorization.guard";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";

const routes: Routes = [
    { path: 'list', component: PostListComponent, canActivate: [AuthorizationGuard] },
    { path: 'create', component: PostCreateComponent, canActivate: [AuthorizationGuard] },
    { path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthorizationGuard] },
    { path: '**', redirectTo: 'list' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }