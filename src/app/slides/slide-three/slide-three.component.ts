import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-slide-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-three.component.html',
  styles: [`
    /* Main Layout Styles */
    .main-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    h1 {
      margin-bottom: 10px;
    }
    
    .comparison-title {
      color: #3a86ca;
      font-size: 1.6rem;
      margin-top: 0;
    }
    
    .performance-dashboard {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    /* Stats Section */
    .stats-section {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 10px;
    }
    
    .stat-item {
      text-align: center;
      padding: 10px 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-width: 120px;
    }
    
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 14px;
    }
    
    .growth .stat-number {
      color: #2ca02c;
    }
    
    /* Content Grid */
    .content-grid {
      display: flex;
      gap: 20px;
    }
    
    .info-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .client-network {
      display: flex;
      gap: 15px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .section-icon {
      flex: 0 0 40px;
    }
    
    .section-icon svg {
      width: 40px;
      height: 40px;
      fill: #3a86ca;
    }
    
    .section-content h3 {
      margin-top: 0;
      color: #333;
    }
    
    .key-observations {
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .key-observations h3 {
      margin-top: 0;
      color: #333;
    }
    
    .key-observations ul {
      padding-left: 20px;
      margin-bottom: 0;
    }
    
    .key-observations li {
      margin-bottom: 5px;
    }
    
    /* Charts Section */
    .charts-section {
      flex: 2;
    }
    
    .charts-container {
      display: flex;
      gap: 20px;
      height: 370px;
    }
    
    .chart-box {
      flex: 1;
      position: relative;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      border-radius: 8px;
      padding: 15px;
      padding-bottom: 35px;
      background-color: #fff;
    }
    
    .chart-title {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: #333;
    }
    
    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .color-box {
      width: 15px;
      height: 15px;
      display: inline-block;
    }
    
    .color-box.green {
      background-color: rgb(75, 192, 75);
    }
    
    .color-box.blue {
      background-color: rgba(54, 162, 235, 1);
    }
    
    .green-text {
      color: rgb(75, 192, 75);
    }
    
    .blue-text {
      color: rgba(54, 162, 235, 1);
    }
    
    .gray-text {
      color: rgba(169, 169, 169, 1);
    }
  `]
})
export class SlideThreeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    // Wait for DOM to be fully loaded before initializing chart
    setTimeout(() => {
      this.initializeCharts();
    }, 300); // Increased timeout for better rendering
  }

  initializeCharts(): void {
    this.createPresentYearChart();
    this.createLastYearChart();
  }

  createPresentYearChart(): void {
    // Get the canvas element for the present year chart
    const ctx = document.getElementById('presentYearChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    // Create the radar chart for present year
    new Chart(ctx.getContext('2d')!, {
      type: 'radar',
      data: {
        labels: ['Unsuccessful', 'Successful', 'Cancelled', 'On Going', 'Rejected', 'Budgetary', 'New Enquiry'],
        datasets: [{
          label: 'Present Year',
          data: [216, 51, 48, 237, 0, 105, 16],
          backgroundColor: 'rgba(75, 192, 75, 0.2)',
          borderColor: 'rgb(75, 192, 75)',
          pointBackgroundColor: 'rgb(75, 192, 75)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 75)'
        }]
      },
      options: this.getChartOptions('')
    });
  }

  createLastYearChart(): void {
    // Get the canvas element for the last year chart
    const ctx = document.getElementById('lastYearChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    // Create the radar chart for last year
    new Chart(ctx.getContext('2d')!, {
      type: 'radar',
      data: {
        labels: ['Unsuccessful', 'Successful', 'Cancelled', 'On Going', 'Rejected', 'Budgetary', 'New Enquiry'],
        datasets: [{
          label: 'Last Year',
          data: [129, 37, 67, 17, 33, 32, 0],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
      },
      options: this.getChartOptions('')
    });
  }

  getChartOptions(title: string): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 2
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          suggestedMin: 0,
          suggestedMax: 250,
          ticks: {
            display: true,
            stepSize: 50,
            font: {
              size: 13  // Increased from 10
            },
            backdropPadding: 3
          },
          pointLabels: {
            font: {
              size: 14,  // Increased from 11
              weight: 'bold'
            },
            padding: 12
          }
        }
      },
      layout: {
        padding: {
          top: 5,
          left: 18,  // Increased to accommodate larger font
          right: 18,  // Increased to accommodate larger font
          bottom: 5
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 15  // Increased from 13
          },
          bodyFont: {
            size: 14  // Increased from 12
          }
        }
      }
    };
  }
}
