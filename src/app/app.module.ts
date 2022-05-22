import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {InterceptorProvider} from './Providers/Interceptor/interceptor';
import {ComponentsModule} from './Components/components.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios'
  }), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule,
    ComponentsModule, NgxPaginationModule],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
