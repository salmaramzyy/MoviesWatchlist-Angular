import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterModule , CommonModule],
  standalone:true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class Header {
  isMenuOpen = false;
  constructor(public auth: AuthService) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
}

