import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-one.component.html'
})
export class SlideOneComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
    // Any initialization code specific to this slide
  }
}
