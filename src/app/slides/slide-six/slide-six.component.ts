import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-slide-six',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-six.component.html',
  styleUrls: ['./slide-six.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.7s cubic-bezier(0.25, 1, 0.5, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ]),
    trigger('fadeInLeft', [
      state('void', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => in', animate('0.8s cubic-bezier(0.25, 1, 0.5, 1)'))
    ]),
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(50px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => in', animate('0.8s cubic-bezier(0.25, 1, 0.5, 1)'))
    ]),
    trigger('pointAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition(':enter', [
        animate('0.5s cubic-bezier(0.25, 1, 0.5, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ]),
    trigger('staggeredFadeIn', [
      transition(':enter', [
        query('.content-column', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('200ms', [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', 
                    style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SlideSixComponent implements OnInit {
  // ERP System Points
  erpSystemPoints = [
    { title: 'Material Planning', description: 'Streamlined resource allocation' },
    { title: 'Sales Management', description: 'Order tracking & processing' },
    { title: 'Inventory Control', description: 'Real-time stock monitoring' },
    { title: 'Procurement', description: 'Seamless purchasing system' }
  ];
  
  // Mobile App Points
  mobileAppPoints = [
    'Material Allotment to Work Orders - Ensuring timely allocation of materials',
    'Worker Attendance and Overtime Management - Accurate monitoring of workforce',
    'Real-time Production Tracking and Reporting'
  ];
  
  // Production Capacity Points
  productionPoints = [
    '3 additional winding machines installed',
    'Total capacity increased to 7 machines',
    '40% boost in production efficiency'
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    // Animation will be handled by Angular animations
  }
}
