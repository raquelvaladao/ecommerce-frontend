import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pedido } from "./model/Pedido";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  ENVIAR_PEDIDO_URL: string = "http://localhost:8080/api/pedido";
  VER_PEDIDO_URL: string = "http://localhost:8080/api/pedido";

  constructor(private http: HttpClient, private router: Router) {}

  enviarPedido(pedido: any) {
    this.http
      .post(this.ENVIAR_PEDIDO_URL, pedido)
      .subscribe((response: any) => {
        this.router.navigate(["/pedido"]);
      });
  }

  verPedido(): Observable<Pedido> {
    return this.http.get<Pedido>(this.VER_PEDIDO_URL);
  }
}
