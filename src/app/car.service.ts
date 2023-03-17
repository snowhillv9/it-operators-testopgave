import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Car } from './cars.model';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private url: string = '/assets/cars.json';

    constructor(private http: HttpClient) { }

    getCars(): Observable<{ cars: Car[] }> {
        return this.http.get<{ cars: Car[] }>(this.url);
    }
}