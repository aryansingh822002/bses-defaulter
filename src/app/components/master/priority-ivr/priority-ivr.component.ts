import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  FormsModule 
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-priority-ivr',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './priority-ivr.component.html',
  styleUrl: './priority-ivr.component.css'
})
export class PriorityIVRComponent {
  priorityIvrForm: FormGroup;
  
  // Sample divisions data
  divisions = [
    { code: 'DIV001', name: 'Division 1' },
    { code: 'DIV002', name: 'Division 2' },
    { code: 'DIV003', name: 'Division 3' }
  ];

  // IVR table data
  ivrItems: any[] = [{
    criteriaType: 'IVR',
    fromDate: null,
    toDate: null,
    amountFrom: null,
    amountTo: null,
    count: null,
    value: null,
    division: ''
  }];

  // Date handling
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  
  years = [2023, 2024, 2025];
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  
  showHistoryTable = false;
  filteredHistory: any[] = [];

  // Sample history data
  ivrHistory: any[] = [
    {
      id: 1,
      criteriaType: 'IVR',
      fromDate: new Date(2025, 0, 1),
      toDate: new Date(2025, 0, 31),
      amountFrom: 1000,
      amountTo: 5000,
      count: 50,
      value: 250000,
      division: 'DIV001',
      createdOn: new Date(2025, 0, 15)
    },
    {
    id: 1,
    criteriaType: 'IVR',
    fromDate: new Date(2025, 3, 1), // April 1, 2025 (month is 0-indexed)
    toDate: new Date(2025, 3, 30),  // April 30, 2025
    amountFrom: 1000,
    amountTo: 5000,
    count: 150,
    value: 450000,
    division: 'DIV001',
    createdOn: new Date(2025, 3, 5)
  },
  {
    id: 2,
    criteriaType: 'IVR',
    fromDate: new Date(2025, 3, 10),
    toDate: new Date(2025, 3, 20),
    amountFrom: 2000,
    amountTo: 10000,
    count: 75,
    value: 600000,
    division: 'DIV002',
    createdOn: new Date(2025, 3, 15)
  },
  {
    id: 3,
    criteriaType: 'IVR',
    fromDate: new Date(2025, 3, 5),
    toDate: new Date(2025, 3, 25),
    amountFrom: 500,
    amountTo: 2500,
    count: 200,
    value: 300000,
    division: 'DIV003',
    createdOn: new Date(2025, 3, 10)
  }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.priorityIvrForm = this.fb.group({
      // Add form controls if needed
    });
  }

  // Add new row to IVR table
  addIvrItem(): void {
    this.ivrItems.push({
      criteriaType: 'IVR',
      fromDate: null,
      toDate: null,
      amountFrom: null,
      amountTo: null,
      count: null,
      value: null,
      division: ''
    });
  }

  // Remove row from IVR table
  removeIvrItem(index: number): void {
    if (this.ivrItems.length > 1) {
      this.ivrItems.splice(index, 1);
    }
  }

  // Edit IVR item
  editIvrItem(index: number): void {
    // Implement edit logic if needed
    console.log('Editing item at index:', index);
  }

  // Remove last row from IVR table
  removeLastIvrItem(): void {
    if (this.ivrItems.length > 1) {
      this.ivrItems.pop();
    }
  }

  onReset(): void {
    this.ivrItems = [{
      criteriaType: 'IVR',
      fromDate: null,
      toDate: null,
      amountFrom: null,
      amountTo: null,
      count: null,
      value: null,
      division: ''
    }];
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  loadHistory(): void {
    this.showHistoryTable = true;
    this.filteredHistory = this.ivrHistory.filter(history => 
      history.createdOn.getMonth() + 1 === +this.selectedMonth && 
      history.createdOn.getFullYear() === +this.selectedYear
    );
  }

  hideHistory(): void {
    this.showHistoryTable = false;
  }

  deleteHistory(history: any): void {
    if (confirm('Are you sure you want to delete this IVR record?')) {
      this.ivrHistory = this.ivrHistory.filter(h => h.id !== history.id);
      this.loadHistory();
    }
  }

  onSubmit(): void {
    if (this.validateIvrItems()) {
      const newIvrRecord = {
        id: this.ivrHistory.length + 1,
        criteriaType: 'IVR',
        fromDate: this.ivrItems[0].fromDate,
        toDate: this.ivrItems[0].toDate,
        amountFrom: this.ivrItems[0].amountFrom,
        amountTo: this.ivrItems[0].amountTo,
        count: this.ivrItems[0].count,
        value: this.ivrItems[0].value,
        division: this.ivrItems[0].division,
        createdOn: new Date()
      };
      
      this.ivrHistory.push(newIvrRecord);
      console.log('Priority IVR saved:', newIvrRecord);
      
      this.onReset();
      this.loadHistory();
    }
  }

  validateIvrItems(): boolean {
    return this.ivrItems.every(item => 
      item.fromDate && item.toDate && 
      new Date(item.fromDate) <= new Date(item.toDate) &&
      (item.amountFrom === null || item.amountTo === null || item.amountFrom <= item.amountTo)
    );
  }

  getDivisionName(code: string): string {
    const division = this.divisions.find(d => d.code === code);
    return division ? division.name : '';
  }


  
}
