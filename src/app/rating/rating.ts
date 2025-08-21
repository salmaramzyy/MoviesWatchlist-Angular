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
  get fiveStarRating(): number {
    return this.rating / 2 +1 -0.3; 
  }

  @Output() ratingChange = new EventEmitter<number>();

  setRating(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }


  get starArray(): string[] {
    const stars: string[] = [];
    const fiveStarRating = this.rating / 2; 

    for (let i = 1; i <= 5; i++) {
      const diff = fiveStarRating - i;

      if (diff >= 0) {
        stars.push('full');
      } else if (diff >= -0.25) {
        stars.push('three-quarter');
      } else if (diff >= -0.5) {
        stars.push('half');
      } else if (diff >= -0.75) {
        stars.push('quarter');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }
}
