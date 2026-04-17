import { Routes } from '@angular/router';
import { EventList } from './pages/event-list/event-list';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { EventForm } from './pages/admin/event-form/event-form';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "login", component: Login},
    {path: "home", component: EventList},

    {
        // Rotas admin
        path: "admin", children: [
            {path: "dashboard", component: Dashboard},
            {path: "events", component: EventForm}
        ]
    }
];
