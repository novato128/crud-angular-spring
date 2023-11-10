import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  @Input() users : User[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() listCar = new EventEmitter(false);

  readonly displayedColumns = ['firstName', 'lastName', 'email', 'birthday', 'login', 'phone', 'actions'];

  constructor(){

  }
  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(user: User){
    this.edit.emit(user);
  }

  onRemove(user: User){
    this.remove.emit(user);
  }

  onListCars(){
    this.listCar.emit(true);
  }
}
