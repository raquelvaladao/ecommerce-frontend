import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppComponent } from "./app.component";
import { rootRouterConfig } from "./app.routes";
import { AutenticacaoInterceptorService } from "./autenticacao/autenticacao-interceptor.service";
import { AutenticacaoService } from "./autenticacao/autenticacao.service";
import { LoginComponent } from "./autenticacao/login/login.component";
import { LogoutComponent } from "./autenticacao/logout/logout.component";
import { RegistrarComponent } from './autenticacao/registrar/registrar.component';
import { FooterComponent } from "./navegacao/footer/footer.component";
import { HomeComponent } from "./navegacao/home/home.component";
import { MenuComponent } from "./navegacao/menu/menu.component";
import { CriarProdutoComponent } from './produtos/criar-produto/criar-produto.component';
import { ListarProdutosComponent } from './produtos/listar-produtos/listar-produtos.component';
import { ProdutoService } from "./produtos/produto.service";
import { FinalizarCompraComponent } from './carrinho/finalizar-compra/finalizar-compra.component';
import { MostrarCompraComponent } from './carrinho/mostrar-compra/mostrar-compra.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PedidoRealizadoComponent } from './pedido/pedido-realizado/pedido-realizado.component';



registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegistrarComponent,
    CriarProdutoComponent,
    ListarProdutosComponent,
    FinalizarCompraComponent,
    MostrarCompraComponent,
    PedidoRealizadoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    [RouterModule.forRoot(rootRouterConfig, { useHash: false })],
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptorService,
      multi: true,
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    AutenticacaoService,
    ProdutoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
