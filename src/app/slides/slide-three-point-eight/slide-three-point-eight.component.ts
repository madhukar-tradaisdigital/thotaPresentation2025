import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

interface CompetitorData {
  name: string;
  quality: number;
  service: number;
  price: number;
  delivery: number;
  responseToInquiry: number;
  certification: number;
  color: string;
  abbr: string; // Added abbreviation field
}

@Component({
  selector: 'app-slide-three-point-eight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-three-point-eight.component.html',
  styleUrls: ['./slide-three-point-eight.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(15px)' })),
      transition(':enter', [
        animate('0.8s cubic-bezier(0.25, 1, 0.5, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ]),
    trigger('fadeInLeft', [
      state('void', style({ opacity: 0, transform: 'translateX(-30px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => in', animate('1s cubic-bezier(0.25, 1, 0.5, 1)'))
    ]),
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(30px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => in', animate('1s cubic-bezier(0.25, 1, 0.5, 1)'))
    ]),
    trigger('staggeredFadeIn', [
      transition(':enter', [
        query('.chart-wrapper', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('150ms', [  // Reduced from 250ms for faster appearance
            animate('700ms cubic-bezier(0.35, 0, 0.25, 1)', 
                    style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SlideThreePointEightComponent implements OnInit, AfterViewInit {
  competitors: CompetitorData[] = [
    { 
      name: 'Thota Group', 
      quality: 90, 
      service: 60, 
      price: 65, 
      delivery: 95, 
      responseToInquiry: 90, 
      certification: 85, 
      color: 'rgba(13, 71, 161, 0.7)', // Updated to standard blue
      abbr: 'Thota' // Changed from 'TG' to 'thota'
    },
    { 
      name: 'Essanar', 
      quality: 90, 
      service: 75, 
      price: 85, 
      delivery: 55, 
      responseToInquiry: 50, 
      certification: 60, 
      color: 'rgba(25, 118, 210, 0.7)', // Updated to standard blue variant
      abbr: 'ESS'
    },
    { 
      name: 'HPS', 
      quality: 90, 
      service: 75, 
      price: 90, 
      delivery: 50, 
      responseToInquiry: 60, 
      certification: 95, 
      color: 'rgba(114, 9, 183, 0.7)',
      abbr: 'HPS'
    },
    { 
      name: 'T and R', 
      quality: 90, 
      service: 90, 
      price: 70, 
      delivery: 60, 
      responseToInquiry: 70, 
      certification: 95, 
      color: 'rgba(76, 201, 240, 0.7)',
      abbr: 'T&R'
    },
    { 
      name: 'Wilson', 
      quality: 90, 
      service: 70, 
      price: 70, 
      delivery: 70, 
      responseToInquiry: 60, 
      certification: 85, 
      color: 'rgba(58, 12, 163, 0.7)',
      abbr: 'WIL'
    },
    { 
      name: 'Tesla', 
      quality: 70, 
      service: 65, 
      price: 65, 
      delivery: 70, 
      responseToInquiry: 60, 
      certification: 65, 
      color: 'rgba(252, 191, 73, 0.7)',
      abbr: 'TES'
    },
    { 
      name: 'Talwane', 
      quality: 70, 
      service: 65, 
      price: 65, 
      delivery: 70, 
      responseToInquiry: 40, 
      certification: 85, 
      color: 'rgba(76, 201, 240, 0.7)',
      abbr: 'TAL'
    },
    { 
      name: 'Gujarat Transformers', 
      quality: 50, 
      service: 50, 
      price: 55, 
      delivery: 75, 
      responseToInquiry: 50, 
      certification: 50, 
      color: 'rgba(58, 12, 163, 0.7)',
      abbr: 'GT'
    },
    { 
      name: 'Marsons', 
      quality: 50, 
      service: 50, 
      price: 55, 
      delivery: 45, 
      responseToInquiry: 40, 
      certification: 45, 
      color: 'rgba(181, 23, 158, 0.7)',
      abbr: 'MAR'
    }
  ];
  
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Define custom plugin for displaying abbreviations
    const labelPlugin = {
      id: 'bubbleLabels',
      afterDatasetsDraw: (chart: any) => {
        const { ctx } = chart;
        
        for (let i = 0; i < chart.data.datasets.length; i++) {
          const meta = chart.getDatasetMeta(i);
          if (!meta.hidden && meta.type === 'bubble') {
            const competitor = this.competitors[i];
            
            meta.data.forEach((element: any, index: number) => {
              const { x, y } = element.tooltipPosition();
              const radius = element.options.radius;
              
              // Draw text above bubble
              ctx.save();
              ctx.font = 'bold 10px Arial';
              ctx.fillStyle = competitor.color.replace('0.7', '1');
              ctx.textAlign = 'center';
              ctx.fillText(competitor.abbr, x, y - radius - 5);
              ctx.restore();
            });
          }
        }
      }
    };
    
    // Register the plugin globally
    Chart.register(labelPlugin);
    
    setTimeout(() => {
      this.createQualityPriceChart();
      this.createServiceDeliveryChart();
      this.createResponseCertificationChart();
    }, 100);
  }

  createQualityPriceChart(): void {
    const ctx = document.getElementById('quality-price-chart') as HTMLCanvasElement;
    if (!ctx) return;

    // Chart sizes are maintained through HTML/CSS
    const chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: this.competitors.map(competitor => ({
          label: competitor.name,
          data: [{
            x: competitor.quality,
            y: competitor.price,
            r: competitor.delivery / 10 // Reduced from /6 to make bubbles smaller
          }],
          backgroundColor: competitor.color.replace('0.7', '0.6'),
          borderColor: competitor.color.replace('0.7', '0.9'),
          borderWidth: 1.5
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Changed to true to maintain aspect ratio
        aspectRatio: 4/3, // Match our 400x300 dimensions
        scales: {
          x: {
            title: {
              display: true,
              text: 'Quality',
              font: { size: 11, weight: 'bold' }, // Reduced font size
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 } // Smaller tick font
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price',
              font: { size: 11, weight: 'bold' }, // Reduced font size
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 } // Smaller tick font
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            titleColor: '#0d47a1', // Updated to standard blue
            bodyColor: '#495057',
            borderColor: '#dee2e6',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const dataPoint = context.raw as { x: number; y: number; r: number };
                return [
                  `${context.dataset.label}`,
                  `Quality: ${dataPoint.x}`,
                  `Price: ${dataPoint.y}`,
                  `Delivery: ${dataPoint.r * 10}` // Updated multiplier to match divisor
                ];
              }
            }
          }
        }
      }
    });
  }

  createServiceDeliveryChart(): void {
    const ctx = document.getElementById('service-delivery-chart') as HTMLCanvasElement;
    if (!ctx) return;

    // Set canvas dimensions explicitly
    ctx.style.width = '400px';
    ctx.style.height = '300px';

    const chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: this.competitors.map(competitor => ({
          label: competitor.name,
          data: [{
            x: competitor.service,
            y: competitor.delivery,
            r: competitor.certification / 10 // Reduced from /5 to make bubbles smaller
          }],
          backgroundColor: competitor.color.replace('0.7', '0.6'),
          borderColor: competitor.color.replace('0.7', '0.9'),
          borderWidth: 1.5
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Changed to true to maintain aspect ratio
        aspectRatio: 4/3, // Match our 400x300 dimensions
        scales: {
          x: {
            title: {
              display: true,
              text: 'Service',
              font: { size: 11, weight: 'bold' }, // Reduced font size
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 } // Smaller tick font
            }
          },
          y: {
            title: {
              display: true,
              text: 'Delivery',
              font: { size: 11, weight: 'bold' }, // Reduced font size
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 } // Smaller tick font
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#212529',
            bodyColor: '#495057',
            borderColor: '#dee2e6',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4, 
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const dataPoint = context.raw as { x: number; y: number; r: number };
                return [
                  `${context.dataset.label}`,
                  `Service: ${dataPoint.x}`,
                  `Delivery: ${dataPoint.y}`,
                  `Certification: ${dataPoint.r * 10}` // Updated multiplier to match divisor
                ];
              }
            }
          }
        }
      }
    });
  }

  createResponseCertificationChart(): void {
    const ctx = document.getElementById('response-certification-chart') as HTMLCanvasElement;
    if (!ctx) return;

    // Set canvas dimensions explicitly
    ctx.style.width = '400px';
    ctx.style.height = '300px';

    const chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: this.competitors.map(competitor => ({
          label: competitor.name,
          data: [{
            x: competitor.responseToInquiry,
            y: competitor.certification,
            r: competitor.quality / 10 // Reduced from /5 to make bubbles smaller
          }],
          backgroundColor: competitor.color.replace('0.7', '0.6'),
          borderColor: competitor.color.replace('0.7', '0.9'),
          borderWidth: 1.5
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Changed to true to maintain aspect ratio
        aspectRatio: 4/3, // Match our 400x300 dimensions
        scales: {
          x: {
            title: {
              display: true,
              text: 'Response to Inquiry',
              font: { size: 11, weight: 'bold' },
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Certification',
              font: { size: 11, weight: 'bold' },
              color: '#495057'
            },
            min: 30,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)' // Lighter grid lines
            },
            ticks: {
              color: '#495057',
              font: { size: 9 }
            }
          }
        },
        plugins: {
          legend: {
            display: false // Changed to false since we have labels on bubbles now
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#212529',
            bodyColor: '#495057',
            borderColor: '#dee2e6',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const dataPoint = context.raw as { x: number; y: number; r: number };
                return [
                  `${context.dataset.label}`,
                  `Response: ${dataPoint.x}`,
                  `Certification: ${dataPoint.y}`,
                  `Quality: ${dataPoint.r * 10}` // Updated multiplier to match divisor
                ];
              }
            }
          }
        }
      }
    });
  }
}
