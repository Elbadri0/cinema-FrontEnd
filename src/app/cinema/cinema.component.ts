import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema/cinema.service';
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;
  public cinemas;
  public salles;
  public currenCity;
  public currentCinema;
  public currentProjection;
  public selectedTickets;
  constructor(public cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data => {
        this.villes = data
      }, error => {
        console.log("Impossible de récupérer les villes depuis l'API")
      })
  }

  public getCinemas(v) {
    this.currenCity=v;
    this.cinemaService.getCinemas(v)
     .subscribe(data => {
       this.cinemas = data
     }, error => {
       console.log("Impossible d'aller chercher les cinémas de cette ville")
     })
  }

  onGetSalles(c) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        this.salles = data;
        this.salles._embedded.salles.forEach(s => {
          this.cinemaService.getProjections(s)
            .subscribe(data => {
              s.projections = data
            }, error => {
              console.log("Impossible de récupérer les projections de cette pièce")
            })
        })
      }, error => {
        console.log("Impossible d'aller chercher les cinémas de cette ville")
      })
  }

  onGetTicketsPlaces(s) {
    this.currentProjection=s;
    this.cinemaService.getTicketsPlaces(s)
      .subscribe(data => {
        this.currentProjection.tickets = data;
        this.selectedTickets = [];
      }, error => {
        console.log("Impossible de récupérer les projections de cette projection")
      })
  }

  onSelectTicket(t) {
    if(!t.selected){
      t.selected = true;
      this.selectedTickets.push(t);
    }else{
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }
  }

  getTicketClass(t) {
    let classValue="btn btn-sm mr-2 mb-2 ";
    if(t.reserve==true) {
      classValue +="btn-danger"
    } else if(t.selected==true) {
      classValue +="btn-primary "
    } else {
      classValue +="btn-secondary"
    }

    return classValue;
  }

  onPayTicket(form) {
      let tickets = [];
      this.selectedTickets.forEach(t => {
        tickets.push(t.id)
      });
      form.tickets = tickets;
      this.cinemaService.payTickets(form)
        .subscribe(data =>  {
          alert("Les tickets sont bien réservés !");
          this.onGetTicketsPlaces(this.currentProjection)
        }, err => {
          alert("Le paiement n'est pas bien effectué!!")
        })
  }
}
