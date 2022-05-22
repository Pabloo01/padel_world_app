import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'app/tabs/products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('../../Products/products-list/products-list.module').then(m => m.ProductsListPageModule)
      },
      {
        path: 'families',
        loadChildren: () => import('../../Families/families-list/families-list.module').then(m => m.FamiliesListPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../User/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../../Cart/cart/cart.module').then( m => m.CartPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/tabs/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
