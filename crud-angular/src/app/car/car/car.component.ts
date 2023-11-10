import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Authentication } from 'src/app/user/model/authentication';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars$: Observable<Car[]> | undefined;
  displayedColumns = ['licensePlate', 'year', 'model', 'color', 'actions'];
  authentication: Authentication = {login: "admin", password: "12345"};

  constructor(private carService: CarService, private snackBar: MatSnackBar, public dialog: MatDialog,
      private router: Router, private route: ActivatedRoute, private location: Location,
      private userService: UserService){

        // receber o usuario logado
  }

  ngOnInit(): void {
    this.userService.login(this.authentication).subscribe(responseToken => {
      localStorage.setItem('token', responseToken.token );
      this.cars$ = this.carService.list(responseToken.token);
    });
  }

  refresh(){
    this.cars$ = this.carService.list(localStorage.getItem('token'));
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(car: Car){
    this.carService.findById(car.id, localStorage.getItem('token')).subscribe(result => console.log(result));
    this.router.navigate(['edit', car.id], {relativeTo: this.route});
  }

  onRemove(car: Car){
    this.carService.removeById(car.id, localStorage.getItem('token')).subscribe(() => {
      this.refresh();
      this.snackBar.open('Carro removido com sucesso!', '', {duration: 5000});
    });
  }

}
