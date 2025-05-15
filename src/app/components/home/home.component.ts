import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  imports: [CommonModule, NgChartsModule,FormsModule, ReactiveFormsModule, RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  masterMenuExpanded = false;
  customerCareMenuExpanded = false;
  sidebarExpanded = false;
  
  showLogout = false;
  

  toggleMasterMenu() {
    this.masterMenuExpanded = !this.masterMenuExpanded;
  }

  toggleCustomerCareMenu() {
    this.customerCareMenuExpanded = !this.customerCareMenuExpanded;
}
toggleSidebar() {
  this.sidebarExpanded = !this.sidebarExpanded;
}
  


  form1!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  currentView = 'home';

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