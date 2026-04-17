import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EventFilters, EventService } from "../../services/event";
import { log } from "console";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventList implements OnInit {

  private eventService = inject(EventService);

  public events: any;

  //   private fb = inject(FormBuilder);

  //   spots = signal<EventFilters[]>([]); // Array de pontos turísticos
  //   isLoading = signal(true);          // Estado de carregamento

  //   filterForm: FormGroup = this.fb.group({
  //     name: [''],              
  //     date_time: ['']           
  //   });


  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (res) => {
        this.events = res; console.log(this.events)
      }
    })
  }

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