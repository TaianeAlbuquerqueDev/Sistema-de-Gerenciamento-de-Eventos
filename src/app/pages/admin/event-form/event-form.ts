// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-event-form',
//  standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],  
//   templateUrl: './event-form.html',
//   styleUrl: './event-form.css',
// })
// export class EventForm implements OnInit 

// {

//  private eventService = inject(Event);
//   private fb = inject(FormBuilder);

//   spots = signal<Event[]>([]);       
//   isLoadingList = signal(true);            
//   isSubmitting = signal(false);              
//   isEditing = signal(false);                  
//   editingSpot = signal<Event | null>(null); 
//   successMessage = signal('');               
//   errorMessage = signal('');                  

//   selectedFiles: File[] = [];

//   spotForm: FormGroup = this.fb.group({
//     name: ['', Validators.required],
//     description: ['', [Validators.required, Validators.maxLength(200)]],
//     district: ['', Validators.required],
//     category: ['', Validators.required],
//     latitude: [null, [Validators.required, Validators.min(30.70), Validators.max(31.53)]],
//     longitude: [null, [Validators.required, Validators.min(120.85), Validators.max(122.12)]],
//     requires_ticket: [false] 
//   });

//   ngOnInit(): void {
//     this.loadSpots();
//   }

//   private loadSpots(): void {
//     this.isLoadingList.set(true);
//     this.eventService.getAll().subscribe({
//       next: (data) => {
//         this.spots.set(data);
//         this.isLoadingList.set(false);
//       },
//       error: () => {
//         this.isLoadingList.set(false);
//       }
//     });
//   }

//   onFilesSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files) {
//       this.selectedFiles = Array.from(input.files).slice(0, 5);
//     }
//   }

//   editSpot(spot: Event): void {
//     this.isEditing.set(true);
//     this.editingSpot.set(spot);
//     this.selectedFiles = [];
//     this.clearMessages();

//     this.spotForm.patchValue({
//       name: spot.name,
//       description: spot.description,
//       district: spot.district,
//       category: spot.category,
//       latitude: spot.latitude,
//       longitude: spot.longitude,
//       requires_ticket: spot.requires_ticket
//     });
//   }

//   cancelEdit(): void {
//     this.isEditing.set(false);
//     this.editingSpot.set(null);
//     this.selectedFiles = [];
//     this.spotForm.reset({ requires_ticket: false }); 
//     this.clearMessages();
//   }

//   deleteSpot(id: number): void {
//     if (!confirm('Tem certeza que deseja excluir este ponto turístico?')) return;
//     this.clearMessages();

//     this.eventService.delete(id).subscribe({
//       next: () => {
//         this.successMessage.set('Ponto excluído com sucesso!');
//         this.loadSpots(); 
//       },
//       error: (err) => {
//         this.errorMessage.set(err.error?.error || 'Erro ao excluir ponto turístico.');
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.spotForm.invalid) return;

//     this.isSubmitting.set(true);
//     this.clearMessages();

//     const formData = new FormData();
//     const values = this.spotForm.value;

//     formData.append('name', values.name);
//     formData.append('description', values.description);
//     formData.append('district', values.district);
//     formData.append('category', values.category);
//     formData.append('latitude', String(values.latitude));   
//     formData.append('longitude', String(values.longitude));
//     formData.append('requires_ticket', String(values.requires_ticket)); 

//     for (const file of this.selectedFiles) {
//       formData.append('images', file);  
//     }

//     if (this.isEditing()) {

//       const id = this.editingSpot()!.id; 
//       this.eventService.update(id, formData).subscribe({
//         next: () => {
//           this.successMessage.set('Evento atualizado com sucesso!');
//           this.isSubmitting.set(false);
//           this.cancelEdit();  
//           this.loadSpots();   
//         },
//         error: (err) => {
//           this.errorMessage.set(err.error?.error || 'Erro ao atualizar evento.');
//           this.isSubmitting.set(false);
//         }
//       });
//     } else {

//       if (this.selectedFiles.length === 0) {
//         this.errorMessage.set('Selecione pelo menos uma imagem.');
//         this.isSubmitting.set(false);
//         return;
//       }

//       this.eventService.create(formData).subscribe({
//         next: () => {
//           this.successMessage.set('Evento criado com sucesso!');
//           this.isSubmitting.set(false);
//           this.spotForm.reset({ requires_ticket: false });
//           this.selectedFiles = [];
//           this.loadSpots();
//         },
//         error: (err) => {
//           this.errorMessage.set(err.error?.error || 'Erro ao criar evento.');
//           this.isSubmitting.set(false);
//         }
//       });
//     }
//   }

//   private clearMessages(): void {
//     this.successMessage.set('');
//     this.errorMessage.set('');
//   }
// }

