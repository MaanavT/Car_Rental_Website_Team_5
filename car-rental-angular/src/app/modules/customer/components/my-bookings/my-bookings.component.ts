import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'] // Corrected plural
})
export class MyBookingsComponent {
  bookings: any[] = []; // Ensure this is an array
  isSpinning = false;
  hoveredIndex: number | null = null; // Track the index of the hovered row

  constructor(private service: CustomerService) {
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe(
      (res) => {
        this.isSpinning = false;
        console.log(res);
        this.bookings = res; // Assign the fetched data
      },
      (err) => {
        this.isSpinning = false;
        console.error('Error fetching bookings:', err); // Log errors if any
      }
    );
  }

  // Set the hovered index for the row
  setHoveredIndex(index: number | null) {
    this.hoveredIndex = index;
  }
}
