import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-slide-three-point-six',
    templateUrl: './slide-three-point-six.component.html',
    styleUrls: ['./slide-three-point-six.component.css'], 
    standalone: true,
    imports: [CommonModule]
})
export class SlideThreePointSixComponent implements OnInit {
    
    ngOnInit() {
      // Add slight delay before starting animations
      setTimeout(() => {
        this.animateBars();
      }, 800);
    }
    
    animateBars() {
      // Get all items with data-value attribute
      const items = document.querySelectorAll('[data-value]');
      
      // Calculate maximum values for each section
      const revenueItems = Array.from(items).filter(item => 
        item.closest('.analytics-section')?.querySelector('h2')?.textContent?.includes('Value')
      );
      
      const orderItems = Array.from(items).filter(item => 
        item.closest('.analytics-section')?.querySelector('h2')?.textContent?.includes('Number')
      );
      
      // Get max values
      const maxRevenue = Math.max(...revenueItems.map(item => 
        parseInt(item.getAttribute('data-value') || '0', 10)
      ));
      
      const maxOrders = Math.max(...orderItems.map(item => 
        parseInt(item.getAttribute('data-value') || '0', 10)
      ));
      
      // Animate revenue bars
      revenueItems.forEach((item, index) => {
        const value = parseInt(item.getAttribute('data-value') || '0', 10);
        const percentage = (value / maxRevenue * 100).toFixed(0) + '%';
        const bar = item.querySelector('.bar') as HTMLElement;
        
        setTimeout(() => {
          if (bar) bar.style.width = percentage;
        }, index * 150);
      });
      
      // Animate order bars with a delay
      setTimeout(() => {
        orderItems.forEach((item, index) => {
          const value = parseInt(item.getAttribute('data-value') || '0', 10);
          const percentage = (value / maxOrders * 100).toFixed(0) + '%';
          const bar = item.querySelector('.bar') as HTMLElement;
          
          setTimeout(() => {
            if (bar) bar.style.width = percentage;
          }, index * 150);
        });
      }, revenueItems.length * 150 + 300); // Add delay after revenue animations
    }
}
