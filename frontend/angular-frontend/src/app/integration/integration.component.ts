import { Component } from '@angular/core';
import { User } from "../user.model";
import { UserService } from '../user.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
  users: User[] = [ ];
  selectedUser: User | null = null;
  pdfData: string | undefined;
  showPdfModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(user: User): void {
    this.userService.createUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    console.log('Edit user:', user);
  }

  updateUser(user: User): void {
    console.log('Updating user:', user);
    this.userService.updateUser(user.id, user).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = { ...updatedUser };
        console.log('Users array after update:', this.users);
      }
      this.loadUsers();
      this.selectedUser = null; 
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      
      this.loadUsers();
    });
  }
  onUserCreated(user: User): void {
    this.users.push(user); 
  }

  onFormSubmit(updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    } else {
      this.users.push(updatedUser);
    }
    this.selectedUser = null; 
  }

  generatePdf() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['ID', 'Name', 'Email', 'Phone Number', 'Address']],
      body: this.users.map(user => [user.id.toString(), user.name, user.email, user.phoneNumber, user.address])
    });

    this.pdfData = doc.output('datauristring');
    this.showPdfModal = true;
  }

  closePdfModal() {
    this.showPdfModal = false; 
  }
}
