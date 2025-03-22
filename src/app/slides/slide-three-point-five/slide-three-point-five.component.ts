import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-slide-three-point-five',
  standalone: true,
  templateUrl: './slide-three-point-five.component.html',
  styleUrls: ['./slide-three-point-five.component.css']
})
export class SlideThreePointFiveComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    this.initCharts();
  }
  
  private initCharts(): void {
    // Enquiries Chart
    const enquiriesCtx = document.getElementById('enquiriesChart') as HTMLCanvasElement;
    new Chart(enquiriesCtx, {
        type: 'bar',
        data: {
            labels: ['Corporate Office', 'Mukesh Chatte', 'Rajesh Singh.T', 'Vinod Das', 'Rakesh V Mehtha', 
                    'Sagar Bijotkar', 'V. Nagendar Rao', 'Srinivas Nemani', 'Abhishek BS',
                    'Senthil C', 'Pankaj Gusain', 'Vikas Singhal'],
            datasets: [{
                label: 'Number of Enquiries',
                data: [296, 142, 115, 97, 86, 86, 59, 49, 25, 16, 12, 5],
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderColor: 'rgba(41, 128, 185, 1)',
                borderWidth: 1,
                borderRadius: 4,
                maxBarThickness: 30
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    backgroundColor: 'rgba(52, 73, 94, 0.9)',
                    padding: 12,
                    bodyFont: { size: 14 },
                    titleFont: { size: 16 },
                    cornerRadius: 6,
                    displayColors: false
                }
            },
            scales: {
                x: { 
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(236, 240, 241, 0.8)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Conversion Rates Chart
    const conversionCtx = document.getElementById('conversionChart') as HTMLCanvasElement;
    new Chart(conversionCtx, {
        type: 'bar',
        data: {
            labels: ['Sagar Bijotkar', 'Corporate Office', 'V. Nagendar Rao', 'Rakesh V Mehtha',
                    'Senthil C', 'Rajesh Singh.T', 'Abhishek BS', 'Vinod Das',
                    'Mukesh Chatte', 'Srinivas Nemani'],
            datasets: [{
                label: 'Conversion Rate (%)',
                data: [16.47, 15.54, 10.34, 7.14, 6.25, 6.09, 4.55, 3.09, 2.13, 2.08],
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 1,
                borderRadius: 4,
                maxBarThickness: 30
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    backgroundColor: 'rgba(52, 73, 94, 0.9)',
                    padding: 12,
                    bodyFont: { size: 14 },
                    titleFont: { size: 16 },
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                        label: function(context: any) {
                            return `Rate: ${context.parsed.x}%`;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(236, 240, 241, 0.8)'
                    },
                    ticks: {
                        callback: function(value: any) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                delay: function(context: any) {
                    return context.dataIndex * 100;
                },
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
    
    // Set up event listeners for control buttons
    setTimeout(() => {
      const buttons = document.querySelectorAll('.control-btn');
      buttons.forEach(button => {
        button.addEventListener('click', function(this: SlideThreePointFiveComponent, e: any) {
          const target = e.target as HTMLElement;
          const parent = target.closest('.card-header');
          if (parent) {
            parent.querySelectorAll('.control-btn').forEach(btn => {
              btn.classList.remove('active');
            });
            target.classList.add('active');
            
            // Filter logic for Top 5
            const isTop5 = target.textContent === 'Top 5';
            const chartCard = parent.closest('.chart-card');
            const chartId = chartCard?.querySelector('canvas')?.id;
            
            if (chartId) {
              this.filterChartData(chartId, isTop5);
            }
          }
        }.bind(this));
      });
    }, 500);
  }
  
  // Filter chart data for Top 5
  private filterChartData(chartId: string, showTop5: boolean): void {
    const chart = Chart.getChart(chartId);
    if (!chart) return;
    
    let labels: string[] = [];
    let data: number[] = [];
    
    if (chartId === 'enquiriesChart') {
      if (showTop5) {
        labels = ['Corporate Office', 'Mukesh Chatte', 'Rajesh Singh.T', 'Vinod Das', 'Rakesh V Mehtha'];
        data = [296, 142, 115, 97, 86];
      } else {
        labels = ['Corporate Office', 'Mukesh Chatte', 'Rajesh Singh.T', 'Vinod Das', 'Rakesh V Mehtha', 
                'Sagar Bijotkar', 'V. Nagendar Rao', 'Srinivas Nemani', 'Abhishek BS',
                'Senthil C', 'Pankaj Gusain', 'Vikas Singhal'];
        data = [296, 142, 115, 97, 86, 86, 59, 49, 25, 16, 12, 5];
      }
    } else if (chartId === 'conversionChart') {
      if (showTop5) {
        labels = ['Sagar Bijotkar', 'Corporate Office', 'V. Nagendar Rao', 'Rakesh V Mehtha', 'Senthil C'];
        data = [16.47, 15.54, 10.34, 7.14, 6.25];
      } else {
        labels = ['Sagar Bijotkar', 'Corporate Office', 'V. Nagendar Rao', 'Rakesh V Mehtha',
                'Senthil C', 'Rajesh Singh.T', 'Abhishek BS', 'Vinod Das',
                'Mukesh Chatte', 'Srinivas Nemani'];
        data = [16.47, 15.54, 10.34, 7.14, 6.25, 6.09, 4.55, 3.09, 2.13, 2.08];
      }
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
}
