import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Compra } from "../produtos/model/Compra";
import { ItemCompra } from "../produtos/model/ItemCompra";

@Injectable({
  providedIn: "root",
})
export class CarrinhoService {
 
  VER_CARRINHO_URL: string = "http://localhost:8080/api/comprar/carrinho";
  INCREMENTAR_CARRINHO_URL: string = "http://localhost:8080/api/comprar";
  REMOVER_CARRINHO_URL: string = "http://localhost:8080/api/comprar/carrinho/remover";


  constructor(private http: HttpClient) {}

  getCarrinho(): Observable<Compra> {
    return this.http.get<Compra>(this.VER_CARRINHO_URL);
  }

  
  getCarrinhoS(): Observable<ItemCompra[]> {
    return this.http.get<ItemCompra[]>(this.VER_CARRINHO_URL);
  }
  
  incrementarQtde(form: any): Observable<Compra> {
    return this.http
      .post<Compra>(this.INCREMENTAR_CARRINHO_URL, form);
  }

  removerItem(prdutoId: any): Observable<Compra> {
    return this.http
    .delete<Compra>(this.REMOVER_CARRINHO_URL, {body: prdutoId});
  }
}
