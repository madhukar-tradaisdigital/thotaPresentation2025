import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-four.component.html',
  styleUrls: ['./slide-four.component.css'] // Added CSS file reference
})
export class SlideFourComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    // Any initialization code specific to this slide
  }
}
