import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './Providers/Routes/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./Pages/Auth/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/Auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/Auth/register/register.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'list-payments',
    loadChildren: () => import('./Pages/Payments/list-payments/list-pay.module').then(m => m.PayPageModule)
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./Pages/Core/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'products-list',
        loadChildren: () => import('./Pages/Products/products-list/products-list.module').then(m => m.ProductsListPageModule)
      },
      {
        path: 'families-list',
        loadChildren: () => import('./Pages/Families/families-list/families-list.module').then(m => m.FamiliesListPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./Pages/User/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./Pages/Cart/cart/cart.module').then(m => m.CartPageModule)
      }
    ]
  },
  {
    path: 'add-products',
    loadChildren: () => import('./Pages/Products/add-products/add-products.module').then(m => m.AddProductsPageModule)
  },
  {
    path: 'add-families',
    loadChildren: () => import('./Pages/Families/add-families/add-families.module').then(m => m.AddFamiliesPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./Pages/User/update-user/update-user.module').then(m => m.UpdateUserPageModule)
  },
  {
    path: 'consult-products',
    loadChildren: () => import('./Pages/Products/consult-products/consult-products.module').then(m => m.ConsultProductsPageModule)
  },
  {
    path: 'set-payments',
    loadChildren: () => import('./Pages/Payments/set-payments/set-payments.module').then(m => m.SetPaymentsPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./Pages/Cart/order/order.module').then(m => m.OrderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


