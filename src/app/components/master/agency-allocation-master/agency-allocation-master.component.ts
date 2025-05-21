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
  selector: 'app-agency-allocation-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agency-allocation-master.component.html',
  styleUrl: './agency-allocation-master.component.css'
})
export class AgencyAllocationMasterComponent {
  allocationForm: FormGroup;
  showTable = false; // For history table toggle
  
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

  // Commission data (would normally come from a service)
  commissionList = [
    { company: 'COM001', accClass: 'SLCC', masterType: 'COR', percentageValue: 5.0 },
    { company: 'COM001', accClass: 'SLCC', masterType: 'COA', percentageValue: 2.0 },
    { company: 'COM001', accClass: 'SLCC', masterType: 'INP', percentageValue: 1.5 },
    { company: 'COM001', accClass: 'SLCC', masterType: 'INR', percentageValue: 3.0 },
    { company: 'COM001', accClass: 'SLCC', masterType: 'PEP', percentageValue: 2.5 },
    { company: 'COM001', accClass: 'SLCC', masterType: 'PER', percentageValue: 4.0 },
    { company: 'COM002', accClass: 'SLCC', masterType: 'COR', percentageValue: 4.5 },
    { company: 'COM002', accClass: 'SLCC', masterType: 'COA', percentageValue: 1.8 }
  ];

  // Allocation table data
  allocationItems: any[] = [{
    amountFrom: null,
    amountTo: null,
    commRate: '',
    commOverAbove: '',
    incentivePercent: '',
    incentiveRate: '',
    penaltyPercent: '',
    penaltyRate: ''
  }];

  // Filtered commission rates
  commissionRates: any[] = [];
  commissionOverAbove: any[] = [];
  incentivePercents: any[] = [];
  incentiveRates: any[] = [];
  penaltyPercents: any[] = [];
  penaltyRates: any[] = [];

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

  constructor(private fb: FormBuilder, private router: Router) {
    // Set current month display
    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' }) + ' ' + now.getFullYear();

    this.allocationForm = this.fb.group({
      company: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      allocationCriteria: ['DEFAULT_AMOUNT', Validators.required],
      periodFrom: ['', Validators.required],
      periodTo: ['', [Validators.required, this.validateDates.bind(this)]]
    });

    // Watch for company changes to auto-fill circle/division and commission rates
    this.allocationForm.get('company')?.valueChanges.subscribe(companyCode => {
      this.updateCompanyDetails(companyCode);
    });
  }

  // Date validation
  validateDates() {
    if (!this.allocationForm) return null;
    
    const from = this.allocationForm.get('periodFrom')?.value;
    const to = this.allocationForm.get('periodTo')?.value;
    
    if (from && to && new Date(from) > new Date(to)) {
      return { dateRange: true };
    }
    return null;
  }

  // Update circle/division and commission rates when company changes
  updateCompanyDetails(companyCode: string): void {
    if (!companyCode) return;

    const company = this.companies.find(c => c.code === companyCode);
    if (company) {
      this.allocationForm.patchValue({
        circle: company.circle,
        division: company.division
      });

      this.loadCommissionRates(companyCode, 'SLCC'); // Assuming SLCC as default account class
    }
  }

  // Load commission rates for the selected company
  loadCommissionRates(companyCode: string, accClass: string): void {
    const companyCommissions = this.commissionList.filter(c => 
      c.company === companyCode && c.accClass === accClass
    );

    this.commissionRates = companyCommissions
      .filter(c => c.masterType === 'COR')
      .map(c => ({ value: c.percentageValue.toString() }));

    this.commissionOverAbove = companyCommissions
      .filter(c => c.masterType === 'COA')
      .map(c => ({ value: c.percentageValue.toString() }));

    this.incentivePercents = companyCommissions
      .filter(c => c.masterType === 'INP')
      .map(c => ({ value: c.percentageValue.toString() }));

    this.incentiveRates = companyCommissions
      .filter(c => c.masterType === 'INR')
      .map(c => ({ value: c.percentageValue.toString() }));

    this.penaltyPercents = companyCommissions
      .filter(c => c.masterType === 'PEP')
      .map(c => ({ value: c.percentageValue.toString() }));

    this.penaltyRates = companyCommissions
      .filter(c => c.masterType === 'PER')
      .map(c => ({ value: c.percentageValue.toString() }));

    // Auto-fill the first row with default values if available
    if (this.allocationItems.length > 0) {
      const firstItem = this.allocationItems[0];
      if (this.commissionRates.length) firstItem.commRate = this.commissionRates[0].value;
      if (this.commissionOverAbove.length) firstItem.commOverAbove = this.commissionOverAbove[0].value;
      if (this.incentivePercents.length) firstItem.incentivePercent = this.incentivePercents[0].value;
      if (this.incentiveRates.length) firstItem.incentiveRate = this.incentiveRates[0].value;
      if (this.penaltyPercents.length) firstItem.penaltyPercent = this.penaltyPercents[0].value;
      if (this.penaltyRates.length) firstItem.penaltyRate = this.penaltyRates[0].value;
    }
  }

  // Add new row to allocation table
  addAllocationItem(): void {
    this.allocationItems.push({
      amountFrom: null,
      amountTo: null,
      commRate: this.commissionRates.length ? this.commissionRates[0].value : '',
      commOverAbove: this.commissionOverAbove.length ? this.commissionOverAbove[0].value : '',
      incentivePercent: this.incentivePercents.length ? this.incentivePercents[0].value : '',
      incentiveRate: this.incentiveRates.length ? this.incentiveRates[0].value : '',
      penaltyPercent: this.penaltyPercents.length ? this.penaltyPercents[0].value : '',
      penaltyRate: this.penaltyRates.length ? this.penaltyRates[0].value : ''
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
    // Add your validation logic here
    return this.allocationItems.every(item => 
      item.amountFrom !== null && 
      item.amountTo !== null &&
      item.amountFrom < item.amountTo
    );
  }

  onReset(): void {
    this.allocationForm.reset({
      allocationCriteria: 'DEFAULT_AMOUNT'
    });
    this.allocationItems = [{
      amountFrom: null,
      amountTo: null,
      commRate: '',
      commOverAbove: '',
      incentivePercent: '',
      incentiveRate: '',
      penaltyPercent: '',
      penaltyRate: ''
    }];
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }

  viewHistory(): void {
    this.showHistoryTable = true;
    // Add logic to fetch history data for selectedMonth/Year
    console.log(`Viewing history for ${this.selectedMonth}/${this.selectedYear}`);
  }

  getMonthName(monthValue: number): string {
    return this.months.find(m => m.value === monthValue)?.name || '';
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

  // Sample history data (including April data)
allocationHistory: any[] = [
  {
    id: 1,
    company: 'COM001',
    circle: 'CIR001',
    division: 'DIV001',
    allocationCriteria: 'DEFAULT_AMOUNT',
    periodFrom: new Date(2025, 3, 1), // April 1, 2025
    periodTo: new Date(2025, 3, 30), // April 30, 2025
    createdOn: new Date(2025, 3, 15), // April 15, 2025
    allocationItems: [
      {
        amountFrom: 0,
        amountTo: 10000,
        commRate: '5.0',
        commOverAbove: '2.0',
        incentivePercent: '1.5',
        incentiveRate: '3.0',
        penaltyPercent: '2.5',
        penaltyRate: '4.0'
      },
      {
        amountFrom: 10001,
        amountTo: 50000,
        commRate: '4.5',
        commOverAbove: '1.8',
        incentivePercent: '1.2',
        incentiveRate: '2.5',
        penaltyPercent: '2.0',
        penaltyRate: '3.5'
      }
    ]
  },
  {
    id: 2,
    company: 'COM002',
    circle: 'CIR002',
    division: 'DIV002',
    allocationCriteria: 'RUNNING_BALANCE',
    periodFrom: new Date(2025, 3, 1), // April 1, 2025
    periodTo: new Date(2025, 3, 30), // April 30, 2025
    createdOn: new Date(2025, 3, 10), // April 10, 2025
    allocationItems: [
      {
        amountFrom: 0,
        amountTo: 20000,
        commRate: '4.0',
        commOverAbove: '1.5',
        incentivePercent: '1.0',
        incentiveRate: '2.0',
        penaltyPercent: '1.5',
        penaltyRate: '3.0'
      }
    ]
  }
];
filteredHistory: any[] = [];

// Add these methods
loadHistory(): void {
  this.showHistoryTable = true;
  this.filteredHistory = this.allocationHistory.filter(history => {
    const historyDate = new Date(history.periodFrom);
    return historyDate.getMonth() + 1 === +this.selectedMonth && 
           historyDate.getFullYear() === +this.selectedYear;
  });
}

deleteHistory(history: any): void {
  if (confirm('Are you sure you want to delete this allocation?')) {
    this.allocationHistory = this.allocationHistory.filter(h => h.id !== history.id);
    this.loadHistory(); // Refresh the view
  }
}

onSubmit(): void {
  if (this.allocationForm.valid && this.validateAllocationItems()) {
    const newAllocation = {
      id: this.allocationHistory.length + 1,
      ...this.allocationForm.value,
      createdOn: new Date(),
      allocationItems: [...this.allocationItems]
    };
    
    // Convert string dates to Date objects
    newAllocation.periodFrom = new Date(newAllocation.periodFrom);
    newAllocation.periodTo = new Date(newAllocation.periodTo);
    
    this.allocationHistory.push(newAllocation);
    console.log('Allocation saved:', newAllocation);
    
    // Reset form
    this.onReset();
    
    // Load current month's history
    const now = new Date();
    this.selectedMonth = now.getMonth() + 1;
    this.selectedYear = now.getFullYear();
    this.loadHistory();
  } else {
    this.allocationForm.markAllAsTouched();
  }
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