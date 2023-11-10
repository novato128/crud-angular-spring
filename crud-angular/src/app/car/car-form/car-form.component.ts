import { CarService } from './../service/car.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Authentication } from 'src/app/user/model/authentication';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent {

  form: FormGroup;
  token: Authentication = {login: "admin", password: "12345"};

  constructor(private formBuider: FormBuilder, private service: CarService, private snackBar: MatSnackBar,
    private location: Location, private userService: UserService){
    this.form = this.formBuider.group({
      licensePlate: [null],
      year: [null],
      model: [null],
      color: [null],
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit(){
    this.service.save(this.form.value, localStorage.getItem('token')).subscribe(result => this.onSuccess(), error=> this.onError());
  }

  onCancel(){
    console.log('onCancel');
    this.location.back();
  }

  onSuccess(){
    this.snackBar.open('Usuario salvo com sucesso!', '', { duration: 5000});
    this.onCancel();
  }

  onError(){
    this.snackBar.open('Erro ao salvar usuario', '', { duration: 5000});
  }
}
