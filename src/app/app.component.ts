import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';

// Import all slide components
import { SlideOneComponent } from "./slides/slide-one/slide-one.component";
import { SlideTwoComponent } from "./slides/slide-two/slide-two.component";
import { SlideThreeComponent } from "./slides/slide-three/slide-three.component";
import { SlideThreePointFiveComponent } from "./slides/slide-three-point-five/slide-three-point-five.component";
import { SlideThreePointSixComponent } from "./slides/slide-three-point-six/slide-three-point-six.component";
import { SlideThreePointSevenComponent } from "./slides/slide-three-point-seven/slide-three-point-seven.component";
import { SlideThreePointEightComponent } from "./slides/slide-three-point-eight/slide-three-point-eight.component";
import { SlideFourComponent } from "./slides/slide-four/slide-four.component";
import { SlideFiveComponent } from "./slides/slide-five/slide-five.component";
import { SlideSixComponent } from "./slides/slide-six/slide-six.component";
import { SlideSevenComponent } from "./slides/slide-seven/slide-seven.component";
import { SlideEightComponent } from "./slides/slide-eight/slide-eight.component";
import { SlideNineComponent } from "./slides/slide-nine/slide-nine.component";
import { SlideTenComponent } from './slides/slide-ten/slide-ten.component';
import { SlideElevenComponent } from './slides/slide-eleven/slide-eleven.component';
import { SlideTwelveComponent } from './slides/slide-twelve/slide-twelve.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    SlideOneComponent,
    SlideTwoComponent,
    SlideThreeComponent,
    SlideThreePointFiveComponent,
    SlideThreePointSixComponent,
    SlideThreePointSevenComponent,
    SlideThreePointEightComponent,
    SlideFourComponent,
    SlideFiveComponent,
    SlideSixComponent,
    SlideSevenComponent,
    SlideEightComponent,
    SlideNineComponent,
    SlideTenComponent,
    SlideElevenComponent,
    SlideTwelveComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'presentation';
  currentSlide = 1;
  totalSlides = 17;
  analyticsChart: any = null; // Variable to store chart reference

  constructor() {}

  ngOnInit() {
    // Initialize things when component is loaded
    this.addKeyboardListeners();
    this.showSlide(this.currentSlide);
  }

  showSlide(slideNumber: number) {
    // Update current slide number
    if(slideNumber > (this.totalSlides -1)) {
      slideNumber = (this.totalSlides -1);
    }
    this.currentSlide = structuredClone(slideNumber);
    if(slideNumber > 3 && slideNumber < 8) {
        slideNumber = slideNumber + 31;
    } else if( slideNumber >= 8) {

      slideNumber = slideNumber - 4;
    }
    
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.classList.add('none'); // Add none class to ensure it's hidden
    });
    
    
    // Show the current slide
    const currentSlide: any = document.getElementById('slide' + slideNumber);
    if (currentSlide) {
      currentSlide.classList.add('active');
      currentSlide.classList.remove('none');
    }
    
    if(slideNumber > 30) {
      slideNumber = slideNumber -31;
    }

    // Update indicators
    // const indicators = document.querySelectorAll('.indicator');
    // indicators.forEach((indicator, index) => {
    //   if (index + 1 === slideNumber) {
    //     indicator.classList.add('active');
    //   } else {
    //     indicator.classList.remove('active');
    //   }
    // });
    
    // Update slide counter
    const slideCountElements = document.querySelectorAll('.slide-count');
    slideCountElements.forEach(element => {
      element.textContent = slideNumber + ' / ' + (this.totalSlides -5);
    });


  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 1) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  goToSlide(slideNumber: number) {
    if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
      this.showSlide(slideNumber);
    }
  }

  addKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const slideNum = parseInt(e.key);
        if (slideNum <= this.totalSlides) {
          this.goToSlide(slideNum);
        }
      }
    });
  }
}