import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ProdutoService } from "../produto.service";

@Component({
  selector: "app-criar-produto",
  templateUrl: "./criar-produto.component.html",
  styles: [
    `
      .full-width-field {
        width: 100%;
      }
    `,
  ],
})
export class CriarProdutoComponent implements OnInit {
  form: FormGroup;
  file: File;
  medidas: string[] = ["Unidade", "Kg", "Litro", "Caixa"];
  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nome: new FormControl("", [Validators.minLength(4)]),
        descricao: new FormControl("", [
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
        medida: new FormControl("", {
          validators: [Validators.required],
          updateOn: "blur",
        }),
        preco: new FormControl(""),
        estoque: new FormControl(""),
      },
      { validators: [Validators.required] }
    );
  }

  submit() {
    if (this.form.valid && this.file != null) {
      let requestPartAPI = new FormData();
      let dto: string = JSON.stringify(this.form.getRawValue());

      requestPartAPI.append("body", dto);
      requestPartAPI.append("image", this.file);

      this.produtoService.criarProduto(requestPartAPI);
    }
  }

  errosInput(propNome: string) {
    if (this.form.get(propNome)?.hasError("required")) {
      return "Preenchimento obrigatório";
    }
    if (this.form.get(propNome)?.hasError("minlength")) {
      let erros = this.form.controls[propNome].errors as ValidationErrors;

      return `Pelo menos ${erros["minlength"]["requiredLength"]} letras`;
    }

    if (this.form.get(propNome)?.hasError("maxlength")) {
      let erros = this.form.controls[propNome].errors as ValidationErrors;

      return `No máximo ${erros["maxlength"]["requiredLength"]} letras`;
    }

    if (propNome == "foto" && this.file == null) {
      return `Foto necessária *`;
    }

    return null;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }
}
