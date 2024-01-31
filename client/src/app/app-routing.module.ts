import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {AuthorComponent} from "./author/author.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {AuthorDetailComponent} from "./author-detail/author-detail.component";
import {AddAuthorComponent} from "./add-author/add-author.component";
import { authGuard } from './guards/auth.guard';
import { LeaveGuard } from './guards/leaveguard.guard';

const routes: Routes = [

  { path: 'books/edit', component: EditBookComponent ,canActivate: [authGuard]},
  { path: 'books/add', component: AddBookComponent ,canActivate: [authGuard]},
  { path: 'authors/add', component: AddAuthorComponent ,canActivate: [authGuard]},
  { path: 'authors/:id', component: AuthorDetailComponent,canActivate: [authGuard] },
  { path: 'books/:id', component: BookDetailsComponent,canActivate: [authGuard] },
  { path: 'books', component: BookComponent,canActivate: [authGuard] },
  { path: 'authors', component: AuthorComponent,canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,canDeactivate: [LeaveGuard] },


  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
