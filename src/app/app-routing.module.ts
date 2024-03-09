import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductsDbComponent } from './admin/products-db/products-db.component';
import { AddProdComponent } from './admin/add-prod/add-prod.component';
import { EditProdComponent } from './admin/edit-prod/edit-prod.component';
import { AuthGuard } from './auth.guard';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { IntroductionComponent } from './introduction/introduction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'product/:id', component: ProductsPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: ProductsDbComponent, canActivate: [AuthGuard] },
  { path: 'admin/add', component: AddProdComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit/:id', component: EditProdComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'introduction', component: IntroductionComponent },

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
