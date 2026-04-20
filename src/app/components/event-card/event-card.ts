import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventModel } from '../../models/event';
import { EventFilters } from '../../services/event';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-card.html',
  styleUrls: ['./event-card.css']
})
export class EventCard {
event = input.required<EventFilters>();
// spot: any;
}