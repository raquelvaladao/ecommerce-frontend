import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AutenticacaoService {
  protected URL_AUTH: string = "http://localhost:8080/api/auth";
  protected URL_REGISTRAR: string = "http://localhost:8080/api/usuario";

  constructor(private http: HttpClient, private router: Router) {}

  public autenticar(credenciais: any) {

    return this.http
      .post(this.URL_AUTH, credenciais, { withCredentials: true });
  }

  public registrar(request: any) {
    let token: string = "TOKEN!";

    this.http.post(this.URL_REGISTRAR, request).subscribe((json: any) => {
      token = json["token"];

      console.log(token);
      localStorage.setItem("tokenrldj", token);
      alert("Cadastrado com sucesso! Você será redirecionado!")
      this.router.navigate(["/home"]);
    });
  }
 
}
