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
      // Reload users after successful addition
      this.loadUsers();
    });
  }

  editUser(user: User): void {
    // Implement edit functionality if needed
    this.selectedUser = { ...user };
    console.log('Edit user:', user);
  }

  updateUser(user: User): void {
    console.log('Updating user:', user);
    this.userService.updateUser(user.id, user).subscribe(updatedUser => {
      // Find the index of the updated user in the users array
      console.log('User updated successfully:', updatedUser);
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        // Update the user in the users array with the updated user details
        this.users[index] = { ...updatedUser };
        console.log('Users array after update:', this.users);
      }
      this.loadUsers();
      this.selectedUser = null; // Clear selected user after successful update
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      // Reload users after successful deletion
      this.loadUsers();
    });
  }
  onUserCreated(user: User): void {
    this.users.push(user); // Add new user to the list
  }
  generatePdf() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['ID', 'Name', 'Email', 'Phone Number', 'Address']],
      body: this.users.map(user => [user.id.toString(), user.name, user.email, user.phoneNumber, user.address])
    });

    this.pdfData = doc.output('datauristring');
    this.showPdfModal = true; // Show the PDF modal
  }

  closePdfModal() {
    this.showPdfModal = false; // Close the PDF modal
  }
}
