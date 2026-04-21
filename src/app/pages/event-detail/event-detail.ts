import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event';
import { EventModel } from '../../models/event';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css']
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  event = signal<EventModel | null>(null);
  isLoading = signal(true);
  isRegistering = signal(false);
  registered = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getById(id).subscribe({
      next: (data) => {
        this.event.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  // register(): void {
  //   this.isRegistering.set(true);

  //   setTimeout(() => {
  //     this.registered.set(true);
  //     this.isRegistering.set(false);
  //   }, 1000);
  // }

   register(): void {
    const current = this.event();
    if (!current) return;
    if (current.registered_count >= current.max_capacity) return;

    this.isRegistering.set(true);

    // Atualiza o contador via API
    this.eventService.update(current.id, {
      registered_count: current.registered_count + 1
    }).subscribe({
      next: (updated) => {
        this.event.set(updated);       
        this.registered.set(true);
        this.isRegistering.set(false);
      },
      error: () => {
        // Se a API não suportar, atualiza localmente
        this.event.set({
          ...current,
          registered_count: current.registered_count + 1
        });
        this.registered.set(true);
        this.isRegistering.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}