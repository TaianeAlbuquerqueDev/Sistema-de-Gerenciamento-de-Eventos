import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EventCard } from "../../components/event-card/event-card";
import { EventFilters, EventService } from "../../services/event";
import { max } from "rxjs";

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
  private fb = inject(FormBuilder);

  // spots = signal<EventModel[]>([]);
  // isLoading = signal(true);

  spots = signal<EventFilters[]>([]);
  isLoading = signal(true);

  filterForm: FormGroup = this.fb.group({
    name: [''],
    category: [''],
    availability: ['']
  });

  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (res) => {
        this.spots.set(res);
        this.isLoading.set(false);
      }
    })
  }

  // ngOnInit(): void {
  //   this.loadSpots();
  // }

  applyFilters(): void {
    this.loadSpots();
  }


  private loadSpots(): void {
    this.isLoading.set(true);
    const raw = this.filterForm.value;
    const filters: any = {};
    if (raw.name) filters.name = raw.name;
    if (raw.category) filters.category = raw.category;
    if (raw.max_capacity) filters.max_capacity = raw.max_capacity;

    this.eventService.getAll(filters).subscribe({
      next: (data) => {
        const availability = this.filterForm.value.availability;
        let filtered = data;

        if (availability === 'available') {
          filtered = data.filter(e => e.registered_count < e.max_capacity);
        } else if (availability === 'full') {
          filtered = data.filter(e => e.registered_count >= e.max_capacity);
        }

        this.spots.set(filtered);
        this.isLoading.set(false)

      },
      error: () => {
        this.spots.set([]);
        this.isLoading.set(false);
      }
    });
  }
}