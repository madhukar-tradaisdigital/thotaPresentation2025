import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-slide-five',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-five.component.html',
  styleUrls: ['./slide-five.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.7s cubic-bezier(0.25, 1, 0.5, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ]),
    trigger('cardEnter', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
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
        query('.content-card', [
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
export class SlideFiveComponent implements OnInit {
  activeSection: number = 0;
  animatePoints: boolean = false;
  totalSections: number = 3;

  // Content data for feature points
  testingLabPoints = [
    'Capacity expanded up to 50 MVA, 132 kV class',
    'Comprehensive quality assurance capabilities',
    'In-house special tests and temperature test for higher-rated transformers'
  ];
  
  vacuumTechPoints = [
    'German-engineered vacuum oven',
    'Advanced vacuum tanking process',
    'Enhanced insulation performance',
    'Improved reliability in extreme conditions'
  ];
  
  testingEquipPoints = [
    'State-of-the-art tan delta testing equipment',
    'Precision noise level measurement systems',
    'Enhanced quality control protocols',
  ];
  
  ngOnInit() {
    setTimeout(() => {
      this.animatePoints = true;
    }, 1000);
  }
  
  nextSection(): void {
    if (this.activeSection < this.totalSections - 1) {
      this.activeSection++;
      this.triggerPointsAnimation();
    }
  }
  
  previousSection(): void {
    if (this.activeSection > 0) {
      this.activeSection--;
      this.triggerPointsAnimation();
    }
  }
  
  goToSection(index: number): void {
    if (index !== this.activeSection) {
      this.activeSection = index;
      this.triggerPointsAnimation();
    }
  }
  
  private triggerPointsAnimation(): void {
    this.animatePoints = false;
    setTimeout(() => {
      this.animatePoints = true;
    }, 600);
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight':
      case ' ':
        this.nextSection();
        break;
      case 'ArrowLeft':
        this.previousSection();
        break;
      case '1':
        this.goToSection(0);
        break;
      case '2':
        this.goToSection(1);
        break;
      case '3':
        this.goToSection(2);
        break;
    }
  }
}
