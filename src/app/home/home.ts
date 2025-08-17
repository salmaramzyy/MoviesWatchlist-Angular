import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-home',
  imports: [RouterModule, Header],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

}
