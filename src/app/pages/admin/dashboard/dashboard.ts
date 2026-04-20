import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
    auth = inject(Auth);
}
