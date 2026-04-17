import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventFilters {
    date_time: any;
    name?: string;
    requires_ticket?: boolean;
    category?: string;
    location?: string;
    max_capacity?: number;
    description?: string;
    id: number;
    images?: { id: number, file_url: string }[];
}
@Injectable({ providedIn: 'root' })
export class EventService {
    private http = inject(HttpClient);
    private apiUrl = "https://api-senai-angular.vercel.app/api";
    private publicUrl = "/events";
    private adminUrl = "/admin/events";


    getAll(): Observable<any> {

        return this.http.get(this.apiUrl + this.publicUrl);
    }

    // getAll(filters?: any): Observable<EventFilters[]> {
    //     let params = new HttpParams();

    //     if (filters) {
    //         if (filters.date_time) {
    //             params = params.set('date_time', filters.date_time);
    //         }
    //         if (filters.category) {
    //             params = params.set('category', filters.category);
    //         }
    //     }

    //     return this.http.get<EventFilters[]>(`${this.apiUrl}/events`, { params });
    // }

    getById(id: number): Observable<EventFilters> {
        return this.http.get<EventFilters>(`${this.apiUrl}/events/${id}`);
    }

    create(formData: FormData): Observable<EventFilters> {
        return this.http.post<EventFilters>(`${this.apiUrl}/admin/events`, formData);
    }

    update(id: number, formData: FormData): Observable<EventFilters> {
        return this.http.put<EventFilters>(`${this.apiUrl}/admin/events/${id}`, formData);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/admin/events/${id}`);
    }
}