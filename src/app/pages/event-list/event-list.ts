import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EventCard } from "../../components/event-card/event-card";
import { EventFilters, EventService } from "../../services/event";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EventCard
  ],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventList implements OnInit {

  private eventService = inject(EventService);

  // spots = signal<EventModel[]>([]);
  // isLoading = signal(true);

    private fb = inject(FormBuilder);

    spots = signal<EventFilters[]>([]); 
    isLoading = signal(true);          

    filterForm: FormGroup = this.fb.group({
      name: [''],              
      date_time: ['']           
    });


  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (res) => {
        this.spots.set(res);
        this.isLoading.set(false);
        console.log(this.spots);
      }
    })
  }

    applyFilters(): void {
      this.loadSpots();
    }


    private loadSpots(): void {
      this.isLoading.set(true);

      const raw = this.filterForm.value;

      const filters: EventFilters = {
        id: 0,
        name: "",
        category: "",
        date_time: "",
        location: "",
        description: "",
        max_capacity: 0,
        registered_count: 0
      };

      if (raw.name) filters.name = raw.name;
      if (raw.date_time) filters.date_time = raw.date_time; 


      this.eventService.getAll(filters).subscribe({
        next: (data: EventFilters[]) => {
          this.spots.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.spots.set([]);
          this.isLoading.set(false);
        }
      });
    }
}