import { Routes } from '@angular/router';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { EventForm } from './pages/admin/event-form/event-form';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { EventList } from './pages/event-list/event-list';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: 'full' },
    { path: "login", component: Login },
    { path: "home", component: EventList },

    {
        path: "admin",
        canActivate: [authGuard],
        children: [
            { path: "dashboard", component: Dashboard },
            { path: "events", component: EventForm }
        ]
    }
];
