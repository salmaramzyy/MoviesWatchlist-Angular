import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Output() addToWatchlist = new EventEmitter<any>();

  rating = 0;

  setRating(star: number) {
    this.rating = star;
  }

  addMovie() {
    this.addToWatchlist.emit(this.movie);
  }
}
