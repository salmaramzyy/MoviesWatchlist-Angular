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
  @Input() inWatchlist = false;

  @Output() addToWatchlist = new EventEmitter<any>();
  @Output() removeFromWatchlist = new EventEmitter<number>();
  @Output() ratingChanged = new EventEmitter<{ id: number, rating: number }>();

  addMovie() {
    this.addToWatchlist.emit(this.movie);
  }

  onRatingChange(newRating: number) {
    this.movie.rating = newRating;
    this.ratingChanged.emit({ id: this.movie.id, rating: newRating }); 
  }
}
