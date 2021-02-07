import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CinemaComponent} from './cinema/cinema.component';


const routes: Routes = [
  {
    path: 'cinema',
    component : CinemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
