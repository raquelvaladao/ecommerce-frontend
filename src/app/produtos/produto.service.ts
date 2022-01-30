import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Compra } from "./model/Compra";
import { Produto } from "./model/Produto";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  CRIAR_URL: string = "http://localhost:8080/api/produtos";
  LISTAR_URL: string = "http://localhost:8080/api/produtos";

  ADD_URL: string = "http://localhost:8080/api/comprar";


  VER_CARRINHO_URL: string = "http://localhost:8080/api/comprar/carrinho";
  compra: Compra;

  constructor(private http: HttpClient) {
     
  }

  criarProduto(produto: any) {
    this.http.post(this.CRIAR_URL, produto).subscribe((response: any) => {
      alert("Produto criado");
    });
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.LISTAR_URL);
  }

  adicionarAoCarrinho(form: any){
    return this.http.post(this.ADD_URL, form);
  }

  getCarrinho(): Observable<Compra>{
    return this.http.get<Compra>(this.VER_CARRINHO_URL);
  }

  getNumeroCarrinho(): number{

    let qtd: number = 0;

    this.http.get<Compra>(this.VER_CARRINHO_URL).subscribe((response: any) => {
      this.compra = response;
      qtd = this.compra.itensCompra.length;
    });
    return qtd;
  }
  
}
