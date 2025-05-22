import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-commission-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commission-master.component.html',
  styleUrl: './commission-master.component.css'
})
export class CommissionMasterComponent {
  commissionForm: FormGroup;
  showTable = false;

  // Sample data for dropdowns
  companies = [
    { code: 'COM001', name: 'Company A' },
    { code: 'COM002', name: 'Company B' }
  ];

  masterTypes = [
    { code: 'COR', name: 'Commission Rate' },
    { code: 'INR', name: 'Incentive Rate' },
    { code: 'PER', name: 'Penalty Rate' },
    { code: 'COA', name: 'Commission Over and Above Percentage' },
    { code: 'INP', name: 'Incentive Percentage' },
    { code: 'PEP', name: 'Penalty Percentage' }
  ];

  // Sample commission data
  commissionList = [
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'COR',
      percentageValue: 5.0
    },
    {
      company: 'COM002',
      accClass: 'None',
      masterType: 'INR',
      percentageValue: 2.5
    },
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'INR',
      percentageValue: 2.0
    },
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'PER',
      percentageValue: 1.0
    },
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'COA',
      percentageValue: 3.3
    },
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'INP',
      percentageValue: 2.8
    },
    {
      company: 'COM001',
      accClass: 'SLCC',
      masterType: 'PEP',
      percentageValue: 5.5
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.commissionForm = this.fb.group({
      company: ['', Validators.required],
      accClass: ['', Validators.required],
      masterType: ['', Validators.required],
      percentageValue: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(): void {
    if (this.commissionForm.valid) {
      const newCommission = {
        ...this.commissionForm.value,
        percentageValue: parseFloat(this.commissionForm.value.percentageValue)
      };
      
      // Check if this commission already exists (same company, class and type)
      const existingIndex = this.commissionList.findIndex(c => 
        c.company === newCommission.company &&
        c.accClass === newCommission.accClass &&
        c.masterType === newCommission.masterType
      );
      
      if (existingIndex >= 0) {
        // Update existing record
        this.commissionList[existingIndex] = newCommission;
      } else {
        // Add new record
        this.commissionList.push(newCommission);
      }
      
      console.log('Form Submitted:', newCommission);
      this.commissionForm.reset();
    } else {
      this.commissionForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.commissionForm.reset();
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }

  selectCommission(commission: any) {
    this.commissionForm.patchValue({
      company: commission.company,
      accClass: commission.accClass,
      masterType: commission.masterType,
      percentageValue: commission.percentageValue
    });
  }

  deleteCommission(commission: any): void {
    const confirmed = confirm(`Are you sure you want to delete ${this.getMasterTypeName(commission.masterType)} for ${this.getCompanyName(commission.company)}?`);
    if (confirmed) {
      this.commissionList = this.commissionList.filter(c => 
        c.company !== commission.company ||
        c.accClass !== commission.accClass ||
        c.masterType !== commission.masterType
      );
    }
  }

  // Helper methods to get names from codes
  getCompanyName(code: string): string {
    const company = this.companies.find(c => c.code === code);
    return company ? company.name : '';
  }

  getMasterTypeName(code: string): string {
    const type = this.masterTypes.find(t => t.code === code);
    return type ? type.name : '';
  }
}
