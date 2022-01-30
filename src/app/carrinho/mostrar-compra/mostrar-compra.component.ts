import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Compra } from "src/app/produtos/model/Compra";
import { CarrinhoService } from "../carrinho.service";

@Component({
  selector: "app-mostrar-compra",
  templateUrl: "./mostrar-compra.component.html",
  styles: [
    `
    .fa-cog {
      color: blue;
    }

    .delete-color {
      color: red;
    }
    `
  ],
})
export class MostrarCompraComponent implements OnInit {
  compra: Compra = new Compra();
  subtotal: number = 0;
  form: FormGroup;

  URL_FOTO: string = "http://localhost:8080/produtos-photos/";
  constructor(
    private carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carrinhoService.getCarrinho().subscribe((compra) => {
      this.compra = compra;
      this.calcularSubtotal();
    });

    this.form = this.formBuilder.group({
      produtoId: "",
      quantidade: "",
    });
  }

  subtotalRecalcular(novaQuantidade: any, produtoId: any) {
    this.form.get("produtoId")?.setValue(produtoId);
    this.form.get("quantidade")?.setValue(novaQuantidade);
    

    this.carrinhoService
      .incrementarQtde(this.form.getRawValue())
      .subscribe((compraResponse) => {
        this.compra = compraResponse;
        this.calcularSubtotal();
      });
  }
  
   deletar(prdutoId: any) {
    this.carrinhoService.removerItem(prdutoId).subscribe((compraResponse) => {
      this.compra = compraResponse;
      this.calcularSubtotal();
    });
  }

  private calcularSubtotal() {
    this.subtotal = 0;

    this.compra.itensCompra.forEach((item) => {
      let valor: number = +item.valorTotal;
      this.subtotal = this.subtotal + valor;
    });
  }
}
