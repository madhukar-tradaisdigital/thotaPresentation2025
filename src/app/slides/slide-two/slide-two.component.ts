import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-two.component.html'
})
export class SlideTwoComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    // Any initialization code specific to this slide
  }
}
