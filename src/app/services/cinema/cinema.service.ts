import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string='http://localhost:8081';

  constructor(private _http:HttpClient) { }

  getVilles() {
    return this._http.get(this.host+"/villes");
  }

  getCinemas(v) {
    return this._http.get(v._links.cinemas.href)
  }

  getSalles(c) {
    return this._http.get(c._links.salles.href)
  }

  getProjections(s) {
    let url = s._links.projections.href.replace("{?projection}","")+"/?projection=p1";
    return this._http.get(url)
  }

  getTicketsPlaces(p) {
    let url = p._links.tickets.href.replace("{?projection}","")+"/?projection=TicketProj";
    return this._http.get(url)
  }

  payTickets(form) {
    return this._http.post(this.host+"/payerTickets", form);
  }
}
