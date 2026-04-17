import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Navbar } from "../../components/navbar/navbar";
import { EventFilters, EventService } from "../../services/event";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Navbar,
   ],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventList 
// implements OnInit 
{

//   // PASSO 14.1: Inetar dependências
//   private eventService = inject(EventService);
//   private fb = inject(FormBuilder);

//   // PASSO 14.2: Signals para gerenciar o estado da página
//   spots = signal<EventFilters[]>([]); // Array de pontos turísticos
//   isLoading = signal(true);          // Estado de carregamento

//   // PASSO 14.3: Formulário de filtros (todos opcionais, sem validadores)
//   filterForm: FormGroup = this.fb.group({
//     name: [''],              
//     date_time: ['']           
//   });

 
//   ngOnInit(): void {
//     this.loadSpots();
//   }

//   applyFilters(): void {
//     this.loadSpots();
//   }

 
//   private loadSpots(): void {
//     this.isLoading.set(true);

//     const raw = this.filterForm.value;

//     const filters: EventFilters = {};
     
//     if (raw.name) filters.name = raw.name;
//     if (raw.date_time) filters.date_time = raw.date_time; 
    

//     this.eventService.getAll(filters).subscribe({
//       next: (data: EventFilters[]) => {
//         this.spots.set(data);
//         this.isLoading.set(false);
//       },
//       error: () => {
//         this.spots.set([]);
//         this.isLoading.set(false);
//       }
//     });
//   }
}