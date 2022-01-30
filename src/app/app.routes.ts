import { Routes } from "@angular/router";
import { LoginComponent } from "./autenticacao/login/login.component";
import { LogoutComponent } from "./autenticacao/logout/logout.component";
import { RegistrarComponent } from "./autenticacao/registrar/registrar.component";
import { FinalizarCompraComponent } from "./carrinho/finalizar-compra/finalizar-compra.component";
import { MostrarCompraComponent } from "./carrinho/mostrar-compra/mostrar-compra.component";
import { HomeComponent } from "./navegacao/home/home.component";
import { PedidoRealizadoComponent } from "./pedido/pedido-realizado/pedido-realizado.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";
import { ListarProdutosComponent } from "./produtos/listar-produtos/listar-produtos.component";

export const rootRouterConfig: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent, data: { title: "Login" } },
  { path: "logout", component: LogoutComponent },
  { path: "registrar", component: RegistrarComponent },
  {
    path: "produtos",
    redirectTo: "produtos/listar",
  },
  {
    path: "produtos",
    children: [
      {
        path: "criar",
        component: CriarProdutoComponent,
      },
      {
        path: "listar",
        component: ListarProdutosComponent,
      },
    ],
  },
  {
    path: "carrinho",
    redirectTo: "carrinho/ver",
  },
  {
    path: "carrinho",
    children: [
      {
        path: "ver",
        component: MostrarCompraComponent,
      },
      {
        path: "finalizar",
        component: FinalizarCompraComponent,
      },
    ],
  },
  { path: "pedido", component: PedidoRealizadoComponent },
];
