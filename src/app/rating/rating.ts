import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css']
})
export class RatingComponent {
  @Input() rating = 0;  
  @Output() ratingChange = new EventEmitter<number>();

  setRating(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }
}
