import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-slide-three-point-seven',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-three-point-seven.component.html',
  styleUrls: ['./slide-three-point-seven.component.css']
})
export class SlideThreePointSevenComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private svg: any;
  private chartInitialized = false;

  // Company data
  private companies = [
    'Arken Solutions', 'INSOLARE ENERGY',
    'Gensol Engineering', 'DYNERE ENGINEERING', 'New India Electricals',
    'B FOURESS', 'GREEN ENGINEERS', 'Alfa Infraprop', 'MNR ELECTRICALS'
  ];

  private enquiries = [12, 10, 10, 5, 6, 7, 10, 8, 7];
  private items = [76, 36, 22, 26, 23, 20, 12, 14, 12];
  private itemsPerEnquiry = [6.33, 3.6, 2.2, 5.2, 3.83, 2.86, 1.2, 1.75, 1.71];

  constructor() { }

  ngOnInit(): void {
    // Initialization code here (if any)
  }

  ngAfterViewInit(): void {
    // Call createChart after the view is initialized
    if (!this.chartInitialized) {
      setTimeout(() => {
        this.createChart();
        this.chartInitialized = true;
      }, 800);
    }
  }

  ngOnDestroy(): void {
    // Clean up D3 chart
    if (this.svg) {
      this.svg.selectAll("*").remove();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;

    // Get width and height after the view is initialized
    let svgWidth = element.offsetWidth;
    let svgHeight = element.offsetHeight;

    // Check if width and height are zero, and set default values
    if (svgWidth === 0) svgWidth = 1200;
    if (svgHeight === 0) svgHeight = 600;

    const data = this.companies.map((name, i) => ({
      name: name,
      enquiries: this.enquiries[i],
      items: this.items[i],
      ratio: this.itemsPerEnquiry[i]
    }));

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create SVG and append to the chart container
    d3.select(element).select("svg").remove(); // Clear previous SVG, if any
    element.style.width = 'fit-content';
    element.style.height = 'fit-content';
    element.style.padding = 'none';
    element.style.borderRadius = '12px'; // Increase border radius for smoother corners
    element.style.border = 'none'; // Remove default border
    element.style.position = 'relative'; // Ensure pseudo-element is positioned correctly

    // Create a pseudo-element for the gradient border top
    const pseudoElement = document.createElement('div');
    pseudoElement.style.content = '""';
    pseudoElement.style.position = 'absolute';
    pseudoElement.style.top = '0';
    pseudoElement.style.left = '0';
    pseudoElement.style.width = '100%';
    pseudoElement.style.height = '6px';
    pseudoElement.style.background = 'linear-gradient(90deg, #FF0000, #D32F2F)'; // Gradient border top in red
    pseudoElement.style.borderRadius = '12px 12px 0 0';

    // Append the pseudo-element to the chart container
    element.appendChild(pseudoElement);
    element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1)'; // Add a subtle shadow for depth
    element.style.backgroundColor = '#FFFFFF'; // White background for card appearance
    // element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Smooth transition for hover effects

    // Add hover effect for better interactivity
    element.addEventListener('mouseover', () => {
      element.style.transform = 'scale(1.)'; // Slightly scale up on hover
      element.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15), 0 12px 36px rgba(0, 0, 0, 0.15)'; // Increase shadow on hover
    });

    element.addEventListener('mouseout', () => {
      element.style.transform = 'scale(0.98)'; // Reset scale on mouse out
      element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1)'; // Reset shadow on mouse out
    });

    this.svg = d3.select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style("background-color", "#F0F4F8") // Soft gray background
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define scales
    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    const radiusScale = d3.scaleLinear().range([8, 20]);

    // Define domains
    xScale.domain([0, 90]); // Set the maximum value for the x-axis to 100
    yScale.domain([0, d3.max(data, d => (d as any).enquiries) || 0]);
    radiusScale.domain([0, d3.max(data, d => (d as any).ratio) || 0]);

    // Define a color scale
    const colorScale = d3.scaleLinear<string, string>()
      .domain([0, 2, 4, 6]) // Map ratio values to colors
      .range(['#66BB6A', '#FFEE58', '#FF7043', '#D32F2F']) // Green to Red
      .clamp(true); // Ensure values outside domain are clamped

    // Add dots
    this.svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot") // Add class for easier selection
      .attr("cx", (d : any) => xScale((d as any).items))
      .attr("cy", (d : any) => yScale((d as any).enquiries))
      .attr("r", (d : any) => radiusScale((d as any).ratio))
      .style("fill", (d : any) => colorScale((d as any).ratio)); // Use the color scale

    // Add labels
    this.svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label") // Add class for easier selection
      .text((d : any) => d.name)
      .attr("x", (d : any) => { // Dynamic label positioning
        return xScale((d as any).items) + (d.items > (d3.max(data, d => (d as any).items) || 0) / 2 ? 10 : -10); // Position left or right
      })
      .attr("y", (d : any) => yScale((d as any).enquiries) - 10)
      .style("font-size", "12px") // Make the font smaller
      .style("font-weight", "bold") // Make the font bold
      .style("text-anchor", (d : any) => d.items > (d3.max(data, d => (d as any).items) || 0) / 2 ? "start" : "end") // Text anchor based on position
      .style("fill", (d : any) => { // Color the labels based on ratio
        return '#374151'; // Keep labels a dark gray for better readability
      })
      .each(function(this: SVGTextElement, d: any) { // Add translucent background
        const textNode = this;
        const bbox = textNode.getBBox();
        const padding = 2;

        const bg = d3.select(this.parentNode as Element)
          .insert("rect", ".label")
          .attr("x", bbox.x - padding)
          .attr("y", bbox.y - padding)
          .attr("width", bbox.width + 2 * padding)
          .attr("height", bbox.height + 2 * padding)
          .attr("fill", "rgba(255, 255, 255, 0.7)") // Translucent background
          .lower(); // Send to back
      })
      .style("text-shadow", "1px 1px 0px rgba(255,255,255,0.8)"); // Add a slight text shadow

    // Add X axis
    this.svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)
        .tickSizeOuter(0)) // Remove end ticks
    .selectAll("line,path")
    .style("stroke", (d : any, i : any, nodes: any) => {
      const scale = d3.scaleLinear<string, string>()
        .domain([0, nodes.length / 2, nodes.length - 1])
        .range(['#66BB6A', '#FF7043', '#D32F2F']); // Green to Orange to Red gradient
      return scale(i);
    }) // Gradient from green to red
      .style("stroke-width", 1.5) // Thicker axis line
      .style("shape-rendering", "crispEdges");

    // Add Y axis
    this.svg.append("g")
      .call(d3.axisLeft(yScale)
        .tickSizeOuter(0)) // Remove end ticks
      .selectAll("line,path")
      .style("stroke", (d : any, i : any, nodes: any) => {
        const scale = d3.scaleLinear<string, string>()
          .domain([0, nodes.length / 2, nodes.length - 1])
          .range(['#66BB6A', '#FF7043', '#D32F2F']); // Green to Orange to Red gradient
        return scale(i);
      }) 
      .style("stroke-width", 1.5) // Thicker axis line
      .style("shape-rendering", "crispEdges");

    // Add axis labels
    this.svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
      .style("text-anchor", "middle")
    .style("fill", "#374151") // Darker gray for better contrast
    .style("font-weight", "bold") // Make the font bold
    .style("font-size", "14px") // Slightly bigger font
      .text("Number of Items");

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#374151") // Darker gray for better contrast
      .style("font-weight", "bold") // Make the font bold
      .style("font-size", "14px") // Slightly bigger font
      .text("Number of Enquiries");
  }
}
