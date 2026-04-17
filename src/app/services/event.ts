import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventFilters {
    name?: string;             
    requires_ticket?: boolean; 
    category?: string;         
}

@Injectable({ providedIn: 'root' })
export class TurismService {
    private http = inject(HttpClient);
    private apiUrl = "https://api-senai-angular.vercel.app/api/events";

    getAll(filters?: EventFilters): Observable<Event[]> {
        let params = new HttpParams();

        if (filters) {
            // Adiciona cada filtro APENAS se tiver valor preenchido
            if (filters.name) {
                params = params.set('name', filters.name);
            }
            if (filters.requires_ticket !== undefined && filters.requires_ticket !== null) {
                params = params.set('requires_ticket', String(filters.requires_ticket));
            }
            if (filters.category) {
                params = params.set('category', filters.category);
            }
        }

        return this.http.get<Event[]>(`${this.apiUrl}/events`, { params });
    }

    getById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
    }

    create(formData: FormData): Observable<Event> {
        return this.http.post<Event>(`${this.apiUrl}/admin/events`, formData);
    }

    update(id: number, formData: FormData): Observable<Event> {
        return this.http.put<Event>(`${this.apiUrl}/admin/events/${id}`, formData);
    }


    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/admin/events/${id}`);
    }
}