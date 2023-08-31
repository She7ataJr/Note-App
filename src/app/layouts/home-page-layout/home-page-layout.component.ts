import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-layout',
  templateUrl:'./home-page-layout.component.html',
  styleUrls: ['./home-page-layout.component.css']
})
export class HomePageLayoutComponent {
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    // Your refresh logic here
    console.log('Component has been refreshed.');
  }
}
