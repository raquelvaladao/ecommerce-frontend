import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../model/Pedido';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-realizado',
  templateUrl: './pedido-realizado.component.html',
  styleUrls: ['./pedido.css']
})
export class PedidoRealizadoComponent implements OnInit {

  pedido$: Observable<Pedido>;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedido$ = this.pedidoService.verPedido();
   
  }

}
