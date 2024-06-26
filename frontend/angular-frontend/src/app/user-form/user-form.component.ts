import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input() selectedUser?: User | null;

  userForm: FormGroup;
  
  @Output() formSubmit = new EventEmitter<User>();
  @Output() userCreated = new EventEmitter<User>();


  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      const user = changes['selectedUser'].currentValue as User;
      this.userForm.patchValue(user); // Populate form fields with selected user details
    }
  }

  ngOnInit() {}

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.selectedUser) {
        // If selectedUser is provided, update existing user
        const updatedUser: User = { ...this.selectedUser, ...formData };
        this.userService.updateUser(this.selectedUser.id,updatedUser).subscribe((user) => {
          this.formSubmit.emit(user); // Emit event after user update
          this.resetForm();
        });
      } else {
        // If selectedUser is not provided, create new user
        this.userService.createUser(formData).subscribe((user) => {
          this.userCreated.emit(user); // Emit event after user creation
          this.userForm.reset(); // Reset form after successful submission
        });
      }
    }
  }
  resetForm() {
    this.userForm.reset();
    this.selectedUser = null;
  }
}