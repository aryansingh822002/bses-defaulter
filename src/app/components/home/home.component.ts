import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { AuthService } from '../../auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { roleAccessConfig } from '../../role-access.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  masterMenuExpanded = false;
  customerCareMenuExpanded = false;
  sidebarExpanded = false;
  showLogout = false;
  showLogoutConfirm = false;
  currentView = 'home';

  userRole: string = '';
  username: string = '';
  
  currentRoleAccess: {
    canViewHome: boolean;
    sidebarKeys: string[];
  } = { canViewHome: false, sidebarKeys: [] };

  form1!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getRole() || '';
    
    if (this.userRole in roleAccessConfig) {
      this.currentRoleAccess = roleAccessConfig[this.userRole as keyof typeof roleAccessConfig];
    } else {
      this.currentRoleAccess = { canViewHome: false, sidebarKeys: [] };
    }
    this.username = this.authService.getUsername() || 'Unknown';
  }  

  private initForms(): void {
    this.form1 = this.fb.group({
      compName: ['', Validators.required],
      company: ['', Validators.required],
      Circle: ['', Validators.required],
      division: ['', Validators.required],
      accClass: ['', Validators.required],
      criteria: ['', Validators.required],
      facilitatorName: ['', Validators.required],
      joiningDate: ['', Validators.required],
      remarks: ['', Validators.required],
      reportingPerson: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.form2 = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: [{ value: '', disabled: true }, Validators.required],
      role: ['', Validators.required],
      assignedWork: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

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
      penaltyApplied: [false]
    });
  }

  // Sidebar Menu Configuration
  menuConfig = [
    {
      key: 'master',
      label: 'Master',
      icon: 'fas fa-file-alt',
      expanded: false,
      submenus: [
        { label: 'Agency Master', shortLabel: 'AM', route: '/home/master/agency-master' },
        { label: 'Agency Mapping Master', shortLabel: 'AMM', route: '/home/master/agency-mapping-master' },
        { label: 'Commission Master', shortLabel: 'CM', route: '/home/master/commission-master' },
        { label: 'Agency Allocation Master', shortLabel: 'AAM', route: '/home/master/agency-allocation-master' },
        { label: 'Defaulter Allocation Master', shortLabel: 'DAM', route: '/home/master/defaulter-allocation-master' },
        { label: 'Role Master', shortLabel: 'RM', route: '/home/master/role-master' },
        { label: 'User Master', shortLabel: 'UM', route: '/home/master/user-master' },
        { label: 'Priority IVR', shortLabel: 'IVR', route: '/home/master/priority-ivr-master' }
      ]
    },
    {
      key: 'allotment',
      label: 'Allotment & Assignment',
      icon: 'fas fa-clipboard-list',
      route: '/home/allotment'
    },
    {
      key: 'recoveryReport',
      label: 'Recovery Report & Update',
      icon: 'fas fa-file-signature',
      route: '/home/recovery-report'
    },
    {
      key: 'actionTaken',
      label: 'Action Taken Report',
      icon: 'fas fa-id-card',
      route: '/home/action-taken'
    },
    {
      key: 'customerCare',
      label: 'Customer Care Services',
      icon: 'fas fa-address-book',
      expanded: false,
      submenus: [
        { label: 'Call Center Calling', shortLabel: 'CC', route: '/home/customer-care/call-center' },
        { label: 'Division Office Calling', shortLabel: 'DOC', route: '/home/customer-care/division-office' }
      ]
    },
    {
      key: 'report',
      label: 'Report',
      icon: 'fas fa-envelope-open-text',
      route: '/home/report'
    }
  ];

  get filteredMenu() {
    return this.menuConfig.filter(menu =>
      this.currentRoleAccess.sidebarKeys.includes(menu.key)
    );
  }

  hasSubmenus(menuItem: any): boolean {
    return !!menuItem.submenus?.length;
  }

  toggleMenu(menuItem: any): void {
    menuItem.expanded = !menuItem.expanded;
  }

  toggleMasterMenu(): void {
    this.masterMenuExpanded = !this.masterMenuExpanded;
  }

  toggleCustomerCareMenu(): void {
    this.customerCareMenuExpanded = !this.customerCareMenuExpanded;
  }

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleLogoutDropdown(): void {
    this.showLogout = !this.showLogout;
  }

  confirmLogout(): void {
    this.logout();
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  logout(): void {
    this.showLogoutConfirm = false;
    this.showLogout = false;
    this.authService.logout();
    this.router.navigate(['']);
  }

  switchView(view: string): void {
    this.currentView = view;
  }

  canViewHome(): boolean {
    return this.currentRoleAccess.canViewHome;
  }

  // Form Submission Methods
  onSubmit(): void {
    if (this.form1.valid) {
      console.log('Form 1 Submitted:', this.form1.value);
    } else {
      console.log('Form 1 Invalid');
      this.form1.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form1.reset();
  }

  onSubmitForm2(): void {
    if (this.form2.valid) {
      console.log('Form 2 Submitted:', this.form2.getRawValue());
    } else {
      console.log('Form 2 Invalid');
      this.form2.markAllAsTouched();
    }
  }

  onResetForm2(): void {
    this.form2.reset();
  }

  onSubmitForm3(): void {
    if (this.form3.valid) {
      console.log('Form 3 Submitted:', this.form3.value);
    } else {
      console.log('Form 3 Invalid');
      this.form3.markAllAsTouched();
    }
  }

  onResetForm3(): void {
    this.form3.reset();
  }
  getUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.username || '';
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

  // customer care code
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
    // Implement form hiding logic if needed
  }

  // summary data for reports
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