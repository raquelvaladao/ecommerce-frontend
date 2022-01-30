import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
    localStorage.removeItem('tokenrldj');
    this.route.navigate(['/home']); 

  }

}
