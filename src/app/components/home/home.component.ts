import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { FormsModule, ReactiveFormsModule , FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule,FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  form1!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  currentView = 'home';
  showLogout = false;

  constructor(private router: Router,private fb: FormBuilder) {}


  //initialize form 1 
  ngOnInit(): void {
    this.form1 = this.fb.group({
      compName: ['', Validators.required],
      company: ['', Validators.required],
      Circle: ['', Validators.required],
      division: ['', Validators.required],
      accClass: ['', Validators.required],
      criteria: ['', Validators.required],
      facilitatorName: ['', Validators.required],
      joiningDate: ['', Validators.required],
      remarks: ['', Validators.required], // Address
      reportingPerson: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  
    // initialize form 2 
  this.form2 = this.fb.group({
    employeeId: ['', Validators.required],
    employeeName: [{ value: '', disabled: true }, Validators.required], // Readonly field
    role: ['', Validators.required],
    assignedWork: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  // initialize form 3
  this.form3 = this.fb.group({
    caNumber: ['', Validators.required],
    facilitatorId: ['', Validators.required],
    paymentAmount: ['', [Validators.required, Validators.min(0)]],
    paymentMethod: ['', Validators.required],
    paymentDate: ['', Validators.required],
    outstandingAmount: ['', [Validators.required, Validators.min(0)]],
    workStatus: ['', Validators.required],
    nextFollowUp: ['', Validators.required],
    remarks: [''],
    actionTaken: ['', Validators.required],
    finalStatus: ['', Validators.required],
    penaltyApplied: [false] // checkbox
  });

}

  onSubmit(): void {
    if (this.form1.valid) {
      console.log('Form Submitted:', this.form1.value);
      // Handle form submission logic (e.g. API call)
    } else {
      console.log('Form is invalid');
      this.form1.markAllAsTouched(); // Show all validation errors
    }
  }

  onReset(): void {
    this.form1.reset();
  }

  onSubmitForm2(): void {
    if (this.form2.valid) {
      console.log('Form 2 Submitted:', this.form2.getRawValue());
      // handle submission
    } else {
      console.log('Form 2 is invalid');
      this.form2.markAllAsTouched();
    }
  }

  onResetForm2(): void {
    this.form2.reset();
  }


  onSubmitForm3(): void {
    if (this.form3.valid) {
      console.log('Form 3 Submitted:', this.form3.value);
      // handle submission
    } else {
      console.log('Form 3 is invalid');
      this.form3.markAllAsTouched();
    }
  }
  
  onResetForm3(): void {
    this.form3.reset();
  }






  switchView(view: string): void {
    this.currentView = view;
  }



  toggleLogoutDropdown() {
    this.showLogout = !this.showLogout;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  setView(view: string) {
    this.currentView = view;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.avatar-wrapper');
    if (!clickedInside) {
      this.showLogout = false;
    }
  }
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this.showLogout = target.classList.contains('user-icon');
  }

  // stocks = [
  //   { name: 'Bajaj Finery', value: 1839.0, profit: true },
  //   { name: 'TTML', value: 100.0, profit: false },
  //   { name: 'Reliance', value: 200.0, profit: true },
  //   { name: 'ATGL', value: 189.0, profit: false },
  //   { name: 'Stolon', value: 210.0, profit: true },
  // ];


  // Bar Chart
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Defaulters',
        data: [1000, 1200, 950, 1100, 1020],
        backgroundColor: '#6a11cb',
      },
      {
        label: 'Total Amount ($)',
        data: [20000, 22000, 21000, 19500, 20500],
        backgroundColor: '#2575fc',
      },
    ],
  };

  // Pie Chart
  pieChartType: ChartType = 'pie';
  pieChartData = {
    labels: ['Collected', 'Left'],
    datasets: [
      {
        data: [96100, 203000 - 96100],
        backgroundColor: ['#36d1dc', '#ff6384'],
      },
    ],
  };

  // Line Chart
  lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Progress (%)',
        data: [20, 40, 60, 80, 95],
        borderColor: '#36d1dc',
        tension: 0.3,
      },
    ],
  };





  




  // action taken and reports
  // filterDate: string = '';
  // reports = [
  //   {
  //     caNumber: 'CA12345',
  //     facilitatorId: 'EMP001',
  //     actionTaken: 'Field Visit',
  //     date: new Date('2025-04-20'),
  //     remarks: 'Customer promised to pay by 25th',
  //     status: 'Pending'
  //   },
  //   {
  //     caNumber: 'CA23456',
  //     facilitatorId: 'EMP002',
  //     actionTaken: 'Legal Action Initiated',
  //     date: new Date('2025-04-18'),
  //     remarks: 'Payment overdue, legal notice issued',
  //     status: 'Legal'
  //   },
  //   {
  //     caNumber: 'CA34567',
  //     facilitatorId: 'EMP003',
  //     actionTaken: 'Payment Plan Offered',
  //     date: new Date('2025-04-15'),
  //     remarks: 'Customer accepted EMI option',
  //     status: 'Paid'
  //   }
  // ];

  // filteredReports = this.reports;

  // filterReports() {
  //   if (!this.filterDate) {
  //     this.filteredReports = this.reports;
  //   } else {
  //     this.filteredReports = this.reports.filter(report =>
  //       new Date(report.date).toDateString() === new Date(this.filterDate).toDateString()
  //     );
  //   }
  // }

  // statusClass(status: string): string {
  //   switch (status.toLowerCase()) {
  //     case 'paid': return 'paid';
  //     case 'pending': return 'pending';
  //     case 'legal': return 'legal';
  //     default: return '';
  //   }
  // }

  reports = [
    { caNumber: '123456789', date: '2025-04-24', action: 'Notice Issued', facilitator: 'EMP001' },
    { caNumber: '987654321', date: '2025-04-23', action: 'Bill Paid', facilitator: 'EMP002' },
  ];

  filteredReports = [...this.reports];

  filterReports(caNumber: string, date: string, facilitatorId: string) {
    this.filteredReports = this.reports.filter(report => {
      return (
        (caNumber === '' || report.caNumber.includes(caNumber)) &&
        (date === '' || report.date === date) &&
        (facilitatorId === '' || report.facilitator.includes(facilitatorId))
      );
    });
  }

  resetFilters() {
    this.filteredReports = [...this.reports];
  }



  // customer care ts code
  formData = {
    customerId: '',
    issueType: '',
    description: ''
  };

  submitForm() {
    console.log('Form submitted:', this.formData);
    alert('Issue submitted successfully!');
    this.formData = {
      customerId: '',
      issueType: '',
      description: ''
    };
  }

  resetForm() {
    this.formData = {
      customerId: '',
      issueType: '',
      description: ''
    };
  }
  
  closeForm() {
    // You can implement form hiding logic here, like toggling a boolean flag
  }


  // report ts code
  summaryData = [
    {
      zoneName: 'South Delhi',
      totalDefaulters: 105,
      recoveredAmount: 250000,
      pendingAmount: 120000
    },
    {
      zoneName: 'West Delhi',
      totalDefaulters: 78,
      recoveredAmount: 180000,
      pendingAmount: 90000
    },
    {
      zoneName: 'Central Delhi',
      totalDefaulters: 90,
      recoveredAmount: 220000,
      pendingAmount: 100000
    }
  ];
}