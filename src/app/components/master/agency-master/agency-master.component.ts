import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agency-master.component.html',
  styleUrl: './agency-master.component.css'
})
export class AgencyMasterComponent {
  agencyForm: FormGroup;
  showTable = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.agencyForm = this.fb.group({
      agencyName: ['', Validators.required],
      officeNo: ['', Validators.required],
      tanNo: ['', Validators.required],
      phoneNo: ['', Validators.required],
      faxNo: ['', Validators.required],
      website: ['', Validators.required],
      address: ['', Validators.required],
      accClass: ['', Validators.required],
      personName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  agencyList = [
    {
      code: 'AG001',
      agencyName: 'Alpha Agency',
      officeNo: '123456',
      tanNo: 'TAN001',
      phoneNo: '0123456789',
      faxNo: '011223344',
      website: 'https://alpha.com',
      address: '123 Alpha Street',
      accClass: 'SLCC',
      personName: 'John Doe',
      emailId: 'contact@alpha.com',
      mobileNo: '9876543210',
      status: true
    },
    {
      code: 'AG002',
      agencyName: 'Beta Corp',
      officeNo: '654321',
      tanNo: 'TAN002',
      phoneNo: '0987654321',
      faxNo: '022334455',
      website: 'https://beta.com',
      address: '456 Beta Road',
      accClass: 'None',
      personName: 'Jane Smith',
      emailId: 'info@beta.com',
      mobileNo: '9123456780',
      status: false
    }
  ];

  onSubmit(): void {
    if (this.agencyForm.valid) {
      const newAgency = {
        code: `AG${this.agencyList.length + 1}`.padStart(5, '0'),
        ...this.agencyForm.value,
        status: true
      };
      this.agencyList.push(newAgency);
      console.log('Form Submitted:', newAgency);
      this.agencyForm.reset();
    } else {
      this.agencyForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.agencyForm.reset();
  }

  onClose(): void {
   this.router.navigate(['/home']);
    
    // Add modal close or routing logic if needed
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }

  selectAgency(agency: any) {
    this.agencyForm.patchValue({
      agencyName: agency.agencyName,
      officeNo: agency.officeNo,
      tanNo: agency.tanNo,
      phoneNo: agency.phoneNo,
      faxNo: agency.faxNo,
      website: agency.website,
      address: agency.address,
      accClass: agency.accClass,
      personName: agency.personName,
      emailId: agency.emailId,
      mobileNo: agency.mobileNo
    });
  }

  toggleStatus(agency: any) {
    agency.status = !agency.status;
    // Optional: sync with backend
  }

  deleteAgency(agency: any): void {
    const confirmed = confirm(`Are you sure you want to delete ${agency.agencyName}?`);
    if (confirmed) {
      this.agencyList = this.agencyList.filter(a => a.code !== agency.code);
    }
  }
}
