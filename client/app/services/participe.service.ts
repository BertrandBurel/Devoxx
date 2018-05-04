import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Participe } from '../shared/models/participe.model';

@Injectable()
export class ParticipeService {

  constructor(private http: HttpClient) { }

  getParticipes(): Observable<Participe[]> {
    return this.http.get<Participe[]>('/api/participes');
  }

  countParticipes(): Observable<number> {
    return this.http.get<number>('/api/participes/count');
  }

  addParticipe(participe): Observable<Participe> {
    return this.http.post<Participe>('/api/participe', participe);
  }

  getParticipe(participe: Participe): Observable<Participe> {
    return this.http.get<Participe>(`/api/participe/${participe}`);
  }

  editParticipe(participe): Observable<string> {
    return this.http.put(`/api/participe/${participe._id}`, participe, { responseType: 'text' });
  }

  deleteParticipe(participe: Participe): Observable<string> {
    return this.http.delete(`/api/participe/${participe}`, { responseType: 'text' });
  }

}
