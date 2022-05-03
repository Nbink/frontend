import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { User, UsersService } from '@nick/users';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;

  constructor(private formBuilder: FormBuilder,  
              private messageService: MessageService,
              private usersService: UsersService,
              private location: Location,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
    this._initForm();
  }

  onCancel(){
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid){
      return;
    }
    const user : User = {
      _id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      isAdmin: this.userForm.isAdmin.value,
      phone: this.userForm.phone.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      state: this.userForm.state.value,
      password: this.userForm.password.value,
    };

  
    if(this.editMode){
      this._updateUser(user);
    } else {  
      this._addUser(user);
    }

  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'User was created'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'User could not be created'});
      },
    });  
  }

  private _updateUser(user: User){
    this.usersService.updateUser(user).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'User was updated'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'User could not be updated'});
      },
    }); 
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe(user => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.phone.setValue(user.phone);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.state.setValue(user.state);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    });
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isAdmin: [false],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: [''],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

  }

  get userForm() {
    return this.form.controls;
  }
}
