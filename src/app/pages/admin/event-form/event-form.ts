import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventFilters, EventService } from '../../../services/event';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  onFilesSelected($event: Event) {
    throw new Error('Method not implemented.');
  }

  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  spots = signal<EventFilters[]>([]);
  isLoadingList = signal(true);
  isSubmitting = signal(false);
  isEditing = signal(false);
  editingSpot = signal<EventFilters | null>(null);
  successMessage = signal('');
  errorMessage = signal('');

  spotForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    date_time: ['', Validators.required],
    location: ['', [Validators.required, Validators.maxLength(200)]],
    max_capacity: ['', [Validators.required, Validators.min(1)]],
    description: ['', Validators.maxLength(200)],
  });

  ngOnInit(): void {
    this.loadSpots();
  }

  private loadSpots(): void {
    this.isLoadingList.set(true);
    this.eventService.getAll().subscribe({
      next: (data) => {
        this.spots.set(data.filter(spot => spot && spot.id && spot.name));
        this.isLoadingList.set(false);
      },
      error: () => {
        this.isLoadingList.set(false);
      }
    });
  }

  editSpot(spot: EventFilters): void {
    this.isEditing.set(true);
    this.editingSpot.set(spot);
    this.clearMessages();

    this.spotForm.patchValue({
      name: spot.name,
      category: spot.category,
      date_time: spot.date_time,
      location: spot.location,
      max_capacity: spot.max_capacity,
      description: spot.description,
    });
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editingSpot.set(null);
    this.spotForm.reset({ requires_ticket: false });
    this.clearMessages();
  }

  deleteSpot(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;
    this.clearMessages();

    this.eventService.delete(id).subscribe({
      next: () => {
        this.successMessage.set('Evento excluído com sucesso!');
        this.loadSpots();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error || 'Erro ao excluir evento.');
      }
    });
  }

  onSubmit(): void {
    if (this.spotForm.invalid) return;

    this.isSubmitting.set(true);
    this.clearMessages();

    const values = this.spotForm.value;

    const payload = {
      name: values.name,
      category: values.category,
      date_time: values.date_time,
      location: values.location,
      max_capacity: Number(values.max_capacity),
      description: values.description || '',
    };

    if (this.isEditing()) {
      const id = this.editingSpot()!.id;
      this.eventService.update(id, payload).subscribe({
        next: () => {
          this.successMessage.set('Evento atualizado com sucesso!');
          this.isSubmitting.set(false);
          this.cancelEdit();
          this.loadSpots();
        },
        error: (err) => {
          console.log('ERRO BODY:', err.error);
          this.errorMessage.set(err.error?.error || 'Erro ao atualizar evento.');
          this.isSubmitting.set(false);
        }
      });
  

    } else {
      this.eventService.create(payload).subscribe({
        next: () => {
          this.successMessage.set('Evento criado com sucesso!');
          this.isSubmitting.set(false);
          this.spotForm.reset({ requires_ticket: false });
          this.loadSpots();
        },
        error: (err) => {
          console.log('ERRO BODY:', err.error);
          this.errorMessage.set(err.error?.error || 'Erro ao criar evento.');
          this.isSubmitting.set(false);
        }
      });
    }
  }

  private clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }
}