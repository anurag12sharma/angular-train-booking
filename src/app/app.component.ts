import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  seats = Array.from({ length: 80 }, (_, i) => ({
    seatNumber: i + 1,
    isBooked: false,
    row: Math.ceil((i + 1) / 7),
  }));

  bookSeats(seatsToBook: number): void {
    if (seatsToBook > 7) {
      alert('You can only book up to 7 seats at a time.');
      return;
    }

    // Find available seats in one row
    for (let row = 1; row <= 12; row++) {
      const availableSeats = this.seats.filter(
        (seat) => seat.row === row && !seat.isBooked
      );

      if (availableSeats.length >= seatsToBook) {
        // Mark seats as booked
        availableSeats.slice(0, seatsToBook).forEach((seat) => {
          seat.isBooked = true;
        });
        alert(`Booked seats: ${availableSeats
          .slice(0, seatsToBook)
          .map((seat) => seat.seatNumber)
          .join(', ')}`);
        return;
      }
    }

    // Nearby seat booking if one row is not possible
    const nearbySeats = this.seats.filter((seat) => !seat.isBooked);
    if (nearbySeats.length >= seatsToBook) {
      nearbySeats.slice(0, seatsToBook).forEach((seat) => {
        seat.isBooked = true;
      });
      alert(`Booked seats: ${nearbySeats
        .slice(0, seatsToBook)
        .map((seat) => seat.seatNumber)
        .join(', ')}`);
      return;
    }

    alert('Not enough seats available.');
  }
}
