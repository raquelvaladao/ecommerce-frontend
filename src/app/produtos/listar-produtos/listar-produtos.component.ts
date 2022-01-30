import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CarrinhoService } from "src/app/carrinho/carrinho.service";
import { Compra } from "../model/Compra";
import { Produto } from "../model/Produto";
import { ProdutoService } from "../produto.service";

@Component({
  selector: "app-listar-produtos",
  templateUrl: "./listar-produtos.component.html",
  styleUrls: ["./produtos.css"],
})
export class ListarProdutosComponent implements OnInit {
  URL_FOTO: string = "http://localhost:8080/produtos-photos/";
  produtos: Produto[];
  form: FormGroup;
  compra: Compra;
  private jaAdd: boolean;

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.produtos = [];
    this.jaAdd = false;

    this.produtoService.getProdutos().subscribe((response: any) => {
      this.produtos = response;
    });

    this.form = this.formBuilder.group({
      produtoId: "",
      quantidade: "",
    });
  }

  submit(produtoId: any) {
    this.form.get("produtoId")?.setValue(produtoId);
    this.form.get("quantidade")?.setValue("1");

    this.seProdutoJaAdicionadoAlerta(this.form);

    if (!this.jaAdd) {
      this.produtoService
        .adicionarAoCarrinho(this.form.getRawValue())
        .subscribe((response: any) => {
          let compra: Compra;
          compra = response;
          alert("Adicionado ao carrinho!");
        });
    }
  }

  private seProdutoJaAdicionadoAlerta(form: FormGroup): boolean {
    this.produtoService.getCarrinho().subscribe((response: any) => {
      this.compra = response;
      this.compra.itensCompra.forEach((item) => {
        console.log(
          `O ID DO PRODUTO ::${item.produto.id} O ID DO FORM :: ${
            form.get("produtoId")?.value
          }`
        );

        if (item.produto.id == form.get("produtoId")?.value) {
          this.jaAdd = true;
        }
      });
    });
    if (this.jaAdd == true) alert("Produto já foi adicionado");

    return this.jaAdd;
  }
}
