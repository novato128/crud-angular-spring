import { CarModule } from './../../car/car.module';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Car } from 'src/app/car/model/car';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  cars: Car[] = [];

  form = this.formBuider.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    birthday: [''],
    login: [''],
    password: [''],
    phone: [''],
    cars: [this.cars]
  });
  id: number = 0;

  constructor(private formBuider: NonNullableFormBuilder, private service: UserService, private snackBar: MatSnackBar,
    private location: Location, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    this.service.findById(id).subscribe(result => {
      console.log(result);
      this.form.setValue({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        birthday: result.birthday,
        login: result.login,
        password: result.password,
        phone: result.phone,
        cars: result.cars
      })
    });
  }

  onSubmit(){
    if(this.id == 0){
      this.service.save(this.form.value).subscribe(result => this.onSuccess(), error=> this.onError());
    } else {
      this.service.update(this.id, this.form.value).subscribe(result => this.onSuccess(), error=> this.onError());
    }

  }

  onCancel(){
    this.router.navigate(['']);
  }

  onSuccess(){
    this.snackBar.open('Usuario salvo com sucesso!', '', { duration: 5000});
    this.router.navigate(['']);
  }
  onError(){
    this.snackBar.open('Erro ao salvar usuario', '', { duration: 5000});
  }
}
