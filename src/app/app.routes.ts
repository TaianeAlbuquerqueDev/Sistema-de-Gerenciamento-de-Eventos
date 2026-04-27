
import { Routes } from '@angular/router';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { EventForm } from './pages/admin/event-form/event-form';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { EventList } from './pages/event-list/event-list';
import { EventDetail } from './pages/event-detail/event-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: EventList },
  { path: 'events/:id', component: EventDetail },

  {
    path: 'admin',
    component: Dashboard,   
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      { path: 'events', component: EventForm }
    ]
  }
];