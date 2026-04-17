import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventFilters, EventService } from '../../../services/event';
import { Navbar } from "../../../components/navbar/navbar";

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {

  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  spots = signal<EventFilters[]>([]);
  isLoadingList = signal(true);
  isSubmitting = signal(false);
  isEditing = signal(false);
  editingSpot = signal<EventFilters | null>(null);
  successMessage = signal('');
  errorMessage = signal('');

  selectedFiles: File[] = [];

  spotForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    date_time: ['', Validators.required],
    location: ['', [Validators.required, Validators.maxLength(200)]],
    max_capacity: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],

    requires_ticket: [false]
  });

  ngOnInit(): void {
    this.loadSpots();
  }

  private loadSpots(): void {
    this.isLoadingList.set(true);
    this.eventService.getAll().subscribe({
      next: (data) => {
        this.spots.set(data);
        this.isLoadingList.set(false);
      },
      error: () => {
        this.isLoadingList.set(false);
      }
    });
  }

  onFilesSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files).slice(0, 5);
    }
  }

  editSpot(spot: EventFilters): void {
    this.isEditing.set(true);
    this.editingSpot.set(spot);
    this.selectedFiles = [];
    this.clearMessages();

    this.spotForm.patchValue({
      name: spot.name,
      category: spot.category,
      date_time: spot.date_time,
      location: spot.location,
      max_capacity: spot.max_capacity,
      description: spot.description,

      requires_ticket: spot.requires_ticket
    });
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editingSpot.set(null);
    this.selectedFiles = [];
    this.spotForm.reset({ requires_ticket: false });
    this.clearMessages();
  }

  deleteSpot(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este ponto turístico?')) return;
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

    const formData = new FormData();
    const values = this.spotForm.value;

    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('date_time', values.date_time);
    formData.append('location', values.location);
    formData.append('max_capacity', String(values.max_capacity));
    formData.append('description', values.description);

    formData.append('requires_ticket', String(values.requires_ticket));

    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    if (this.isEditing()) {

      const id = this.editingSpot()!.id;
      this.eventService.update(id, formData).subscribe({
        next: () => {
          this.successMessage.set('Evento atualizado com sucesso!');
          this.isSubmitting.set(false);
          this.cancelEdit();
          this.loadSpots();
        },
        error: (err) => {
          this.errorMessage.set(err.error?.error || 'Erro ao atualizar evento.');
          this.isSubmitting.set(false);
        }
      });
    } else {

      if (this.selectedFiles.length === 0) {
        this.errorMessage.set('Selecione pelo menos uma imagem.');
        this.isSubmitting.set(false);
        return;
      }

      this.eventService.create(formData).subscribe({
        next: () => {
          this.successMessage.set('Evento criado com sucesso!');
          this.isSubmitting.set(false);
          this.spotForm.reset({ requires_ticket: false });
          this.selectedFiles = [];
          this.loadSpots();
        },
        error: (err) => {
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

