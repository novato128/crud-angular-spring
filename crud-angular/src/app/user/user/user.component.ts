import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users$: Observable<User[]>;
  displayedColumns = ['firstName', 'lastName', 'email', 'birthday', 'login', 'phone', 'actions'];

  constructor(private userService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute, private location: Location){
    this.users$ = this.userService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar usuarios.');
        return of([])
      })
    );
  }

  refresh(){
    this.users$ = this.userService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar usuarios.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(user: User){
    // this.userService.findById(user.id).subscribe(result => console.log(result));
    this.router.navigate(['edit', user.id], {relativeTo: this.route});
  }

  onRemove(user: User){
    this.userService.removeById(user.id).subscribe(() => {
      this.refresh();
      this.snackBar.open('Usuario removido com sucesso!', '', {duration: 5000});
    });
  }

  onListCars(){
    this.router.navigate(['car']);
  }
}
