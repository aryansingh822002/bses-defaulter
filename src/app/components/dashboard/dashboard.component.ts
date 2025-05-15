import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showLogout = false;

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
