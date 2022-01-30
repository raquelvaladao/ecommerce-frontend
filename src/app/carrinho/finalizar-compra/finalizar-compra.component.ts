import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Compra } from "src/app/produtos/model/Compra";
import { CarrinhoService } from "../carrinho.service";

@Component({
  selector: "app-finalizar-compra",
  templateUrl: "./finalizar-compra.component.html",
  styles: [
    `
      .full-width-field {
        width: 100%;
      }
    `,
  ],
})
export class FinalizarCompraComponent implements OnInit {
  form: FormGroup;
  enderecoSucesso: boolean | null;
  compra: Compra;
  subtotal: number = 0;

  CEP_URL: string = "https://api.invertexto.com/v1/cep/";
  FIM_CEP_URL: string = "?token=333%7Ctb08rjo5vlly8JLk3qJbMkE1y4PKuoIZ";

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        cep: new FormControl("", {
          validators: [this.cepValidator()],
        }),
        estado: new FormControl("Estado"),
        cidade: new FormControl("Cidade"),
        rua: new FormControl("Rua"),
        bairro: new FormControl("Bairro"),
      },
      { valdators: [Validators.required], updateOn: "submit" }
    );

    this.carrinhoService.getCarrinho().subscribe((response: any) => {
      this.subtotal = 0;
      this.compra = response;
      this.compra.itensCompra.forEach((item) => {
        let valor: number = +item.valorTotal;
        this.subtotal = this.subtotal + valor;
      });
    });
  }

  cepValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isCEPInvalido = false;

      if (control.value) {
        this.http
          .get(this.CEP_URL + control.value + this.FIM_CEP_URL)
          .subscribe({
            next: (isValido) => {
              this.setNovosValoresForm(isValido);
              this.enderecoSucesso = true;
            },
            error: (error) => {
              this.form.get("cep")?.setErrors({ cepInvalido: "true" });
              this.enderecoSucesso = false;
              this.setValoresDefaultForm();
            },
          });
      }
      return isCEPInvalido ? { cepInvalido: true } : null;
    };
  }

  errosInput(propNome: string) {
    if (this.form.get(propNome)?.getError("cepInvalido") == "true") {
      return "CEP INVÁLIDO";
    }
    if (this.form.get(propNome)?.hasError("required")) {
      return "Preenchimento obrigatório";
    }
    return null;
  }

  submit(botao: any) {
    if (botao == "pedido") {
      if (this.form.invalid) {
        alert("O formulário deve estar válido!");
      } else {
        this.pedidoService.enviarPedido(this.form.getRawValue());
      }
    }
  }

  private setValoresDefaultForm() {
    this.form.get("cidade")?.setValue("Cidade");
    this.form.get("estado")?.setValue("Estado");
    this.form.get("rua")?.setValue("Rua");
    this.form.get("bairro")?.setValue("Bairro");
  }

  private setNovosValoresForm(isValido: any) {
    this.form.get("cidade")?.setValue(isValido["city"]);
    this.form.get("estado")?.setValue(isValido["state"]);
    this.form.get("rua")?.setValue(isValido["street"]);
    this.form.get("bairro")?.setValue(isValido["neighborhood"]);
  }
}
