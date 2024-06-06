import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { User } from '../user.model';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // Trigger change detection when input data changes
    this.cdr.detectChanges();
  }

  editUser(user: User): void {
    this.edit.emit(user);
  }

  deleteUser(user: User): void {
    this.delete.emit(user);
  }

  generatePDF() {
    const doc = new jsPDF.jsPDF();
  
    // Add a title to the PDF
    doc.text('User Table', 10, 10);
  
    // Extract table data
    const tableData: string[][] = [];
    this.users.forEach((user, index) => {
      const rowData = [
        user.name,
        user.email,
        user.phoneNumber,
        user.address
      ];
      tableData.push(rowData);
    });
  
    autoTable(doc,{
      head: [['Name', 'Email', 'Phone Number', 'Address']],
      body: tableData
    })
    // Save the PDF
    doc.save('user_table.pdf');
  }

}
