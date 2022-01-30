import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./hover.css"],
})
export class HomeComponent implements OnInit {
  isToken: string | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isToken = localStorage.getItem("tokenrldj") as string;
  }
}
