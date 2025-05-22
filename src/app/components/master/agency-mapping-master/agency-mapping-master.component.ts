import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-mapping-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agency-mapping-master.component.html',
  styleUrl: './agency-mapping-master.component.css'
})
export class AgencyMappingMasterComponent {
  mappingForm: FormGroup;
  showTable = false;

  // Sample data for dropdowns
  agencies = [
    { code: 'AG001', agencyName: 'Alpha Agency' },
    { code: 'AG002', agencyName: 'Beta Corp' }
  ];

  companies = [
    { code: 'COM001', name: 'Company A' },
    { code: 'COM002', name: 'Company B' }
  ];

  circles = [
    { code: 'CIR001', name: 'Circle North' },
    { code: 'CIR002', name: 'Circle South' }
  ];

  divisions = [
    { code: 'DIV001', name: 'Division 1' },
    { code: 'DIV002', name: 'Division 2' }
  ];

  cycles = [
    { code: 'CYC001', name: 'Monthly' },
    { code: 'CYC002', name: 'Quarterly' }
  ];

  // Sample mapping data
  mappingList = [
    {
      agencyName: 'AG001',
      company: 'COM001',
      circle: 'CIR001',
      division: 'DIV001',
      cycle: 'CYC001',
      accClass: 'SLCC'
    },
    {
      agencyName: 'AG002',
      company: 'COM002',
      circle: 'CIR002',
      division: 'DIV002',
      cycle: 'CYC002',
      accClass: 'None'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.mappingForm = this.fb.group({
      agencyName: ['', Validators.required],
      company: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      cycle: ['', Validators.required],
      accClass: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.mappingForm.valid) {
      const newMapping = {
        ...this.mappingForm.value
      };
      this.mappingList.push(newMapping);
      console.log('Form Submitted:', newMapping);
      this.mappingForm.reset();
    } else {
      this.mappingForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.mappingForm.reset();
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }

  selectMapping(mapping: any) {
    this.mappingForm.patchValue({
      agencyName: mapping.agencyName,
      company: mapping.company,
      circle: mapping.circle,
      division: mapping.division,
      cycle: mapping.cycle,
      accClass: mapping.accClass
    });
  }

  deleteMapping(mapping: any): void {
    const confirmed = confirm(`Are you sure you want to delete mapping for ${this.getAgencyName(mapping.agencyName)}?`);
    if (confirmed) {
      this.mappingList = this.mappingList.filter(m => 
        m.agencyName !== mapping.agencyName || 
        m.company !== mapping.company ||
        m.circle !== mapping.circle
      );
    }
  }

  // Helper methods to get names from codes
  getAgencyName(code: string): string {
    const agency = this.agencies.find(a => a.code === code);
    return agency ? agency.agencyName : '';
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

  getCycleName(code: string): string {
    const cycle = this.cycles.find(c => c.code === code);
    return cycle ? cycle.name : '';
  }
}
