import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

    auth = inject(Auth);

 }
