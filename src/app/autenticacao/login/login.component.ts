import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CarrinhoService } from "src/app/carrinho/carrinho.service";
import { AutenticacaoService } from "../autenticacao.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        login: new FormControl(""),
        senha: new FormControl(""),
      },
      { validators: [Validators.required], updateOn: "change" }
    );
    if (localStorage.getItem("tokenrldj")) this.router.navigate(["/home"]);
  }

  submit(): void {
    let token: string = "TOKEN!";

    if (this.form.valid) {
      this.autenticacaoService.autenticar(this.form.getRawValue()).subscribe({
        next: (json: any) => {
          token = json["token"];
          localStorage.setItem("tokenrldj", token);
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          if(error['status'] == '401'){
            this.form.get("login")?.setErrors({naoAutorizado: true});
            this.form.get("senha")?.setErrors({naoAutorizado: true});
          }
        },
      });
    }
  }

  errosInput(propNome: string) {

    if (this.form.get(propNome)?.hasError("naoAutorizado")) {
      return "Email ou senha incorretos";
    }

    if (this.form.get(propNome)?.hasError("required")) {
      return "Preenchimento obrigatório";
    }

    return null;
  }
}
