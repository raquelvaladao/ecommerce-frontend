import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AutenticacaoInterceptorService } from "src/app/autenticacao/autenticacao-interceptor.service";
import { CarrinhoService } from "src/app/carrinho/carrinho.service";
import { Compra } from "src/app/produtos/model/Compra";
import { Produto } from "src/app/produtos/model/Produto";
import { ProdutoService } from "src/app/produtos/produto.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styles: [
    `
      .btn-margin-left {
        margin-left: 8px;
      }
      .btn-margin-right {
        margin-right: 8px;
      }
    `,
  ],
})
export class MenuComponent implements OnInit {
  isToken: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      this.isToken = localStorage.getItem("tokenrldj");
    });
    this.isToken = localStorage.getItem("tokenrldj");
  }
}
