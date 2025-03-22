import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-slide-seven',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-seven.component.html',
  styleUrls: ['./slide-seven.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.7s cubic-bezier(0.25, 1, 0.5, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
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
export class SlideSevenComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    // Initialize animations with slight delay
    setTimeout(() => {
      const elements = document.querySelectorAll('.feature-point');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-in');
        }, index * 150);
      });
    }, 500);
  }
}
