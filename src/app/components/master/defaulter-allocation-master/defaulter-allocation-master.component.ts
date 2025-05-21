import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators,
  FormsModule 
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defaulter-allocation-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './defaulter-allocation-master.component.html',
  styleUrl: './defaulter-allocation-master.component.css'
})
export class DefaulterAllocationMasterComponent {
  allocationForm: FormGroup;
  
  // Sample data
  companies = [
    { code: 'COM001', name: 'Company A', circle: 'CIR001', division: 'DIV001' },
    { code: 'COM002', name: 'Company B', circle: 'CIR002', division: 'DIV002' }
  ];
  
  circles = [
    { code: 'CIR001', name: 'Circle North' },
    { code: 'CIR002', name: 'Circle South' }
  ];
  
  divisions = [
    { code: 'DIV001', name: 'Division 1' },
    { code: 'DIV002', name: 'Division 2' }
  ];

  // Allocation table data
  allocationItems: any[] = [{
    amountFrom: null,
    amountTo: null,
    daysFrom: null,
    daysTo: null,
    allocationType: '',
    creditFrom: null,
    creditTo: null,
    priority: null,
    meterNo: '',
    softConn: 'NO',
    consumerStatus: ''
  }];

  // Date handling
  currentMonth: string;
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
  allocationHistory: any[] = [
    {
      id: 1,
      company: 'COM001',
      circle: 'CIR001',
      division: 'DIV001',
      month: 4,
      year: 2025,
      createdOn: new Date(2025, 3, 15),
      allocationItems: [
        {
          amountFrom: 1000,
          amountTo: 5000,
          daysFrom: 30,
          daysTo: 60,
          allocationType: 'ON_FIELD',
          creditFrom: 0,
          creditTo: 1000,
          priority: 1,
          meterNo: 'MTR001',
          softConn: 'NO',
          consumerStatus: 'ACTIVE'
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    // Set current month display
    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' }) + ' ' + now.getFullYear();

    this.allocationForm = this.fb.group({
      company: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required]
    });
  }

  // Auto-fill circle and division when company changes
  onCompanyChange(): void {
    const companyCode = this.allocationForm.get('company')?.value;
    if (!companyCode) return;

    const company = this.companies.find(c => c.code === companyCode);
    if (company) {
      this.allocationForm.patchValue({
        circle: company.circle,
        division: company.division
      });
    }
  }

  // Add new row to allocation table
  addAllocationItem(): void {
    this.allocationItems.push({
      amountFrom: null,
      amountTo: null,
      daysFrom: null,
      daysTo: null,
      allocationType: '',
      creditFrom: null,
      creditTo: null,
      priority: null,
      meterNo: '',
      softConn: 'NO',
      consumerStatus: ''
    });
  }

  // Remove row from allocation table
  removeAllocationItem(index: number): void {
    if (this.allocationItems.length > 1) {
      this.allocationItems.splice(index, 1);
    }
  }

  // Validate allocation items
  validateAllocationItems(): boolean {
    return this.allocationItems.every(item => 
      (item.amountFrom === null || item.amountTo === null || item.amountFrom < item.amountTo) &&
      (item.daysFrom === null || item.daysTo === null || item.daysFrom < item.daysTo) &&
      (item.creditFrom === null || item.creditTo === null || item.creditFrom < item.creditTo)
    );
  }

  onReset(): void {
    this.allocationForm.reset();
    this.allocationItems = [{
      amountFrom: null,
      amountTo: null,
      daysFrom: null,
      daysTo: null,
      allocationType: '',
      creditFrom: null,
      creditTo: null,
      priority: null,
      meterNo: '',
      softConn: 'NO',
      consumerStatus: ''
    }];
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  loadHistory(): void {
    this.showHistoryTable = true;
    this.filteredHistory = this.allocationHistory.filter(history => 
      history.month === +this.selectedMonth && 
      history.year === +this.selectedYear
    );
  }

  deleteHistory(history: any): void {
    if (confirm('Are you sure you want to delete this defaulter allocation?')) {
      this.allocationHistory = this.allocationHistory.filter(h => h.id !== history.id);
      this.loadHistory();
    }
  }

  onSubmit(): void {
    if (this.allocationForm.valid && this.validateAllocationItems()) {
      const newAllocation = {
        id: this.allocationHistory.length + 1,
        ...this.allocationForm.value,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        createdOn: new Date(),
        allocationItems: [...this.allocationItems]
      };
      
      this.allocationHistory.push(newAllocation);
      console.log('Defaulter Allocation saved:', newAllocation);
      
      this.onReset();
      this.loadHistory();
    } else {
      this.allocationForm.markAllAsTouched();
    }
  }

  getCompanyName(code: string): string {
    const company = this.companies.find(c => c.code === code);
    return company ? company.name : '';
  }

  getCircleName(code: string): string {
    const circle = this.circles.find(c => c.code === code);
    return circle ? circle.name : '';
  }

  getDivisionName(code: string): string {
    const division = this.divisions.find(d => d.code === code);
    return division ? division.name : '';
  }

  getMonthName(monthValue: number): string {
    return this.months.find(m => m.value === monthValue)?.name || '';
  }


  // Add to the component class
removeLastAllocationItem(): void {
    if (this.allocationItems.length > 1) {
        this.allocationItems.pop();
    }
}

hideHistory(): void {
    this.showHistoryTable = false;
}
}
