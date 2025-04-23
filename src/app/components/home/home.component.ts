import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  currentView = 'home';
  showLogout = false;

  constructor(private router: Router) {}

  

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
}