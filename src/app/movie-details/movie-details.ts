import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { Header } from "../header/header";
import { SafeUrlPipe } from '../safe-url.pipe';

interface CastMember {
  name: string;
  character: string;
}

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, Header , SafeUrlPipe],
  templateUrl: './movie-details.html'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  loading = true;
  directorName = '';
  topCast: CastMember[] = [];
  userScore = 0;               // Movie score (0-100)
  circleStyle: any = {};       // Dynamic style for score circle
  trailerUrl: string | null = null;   // ✅ Added trailer property

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  /**
   * Return TMDB-style color based on score
   */
  private scoreColor(score: number): string {
    if (score >= 70) return '#21d07a'; // green
    if (score >= 40) return '#d2d531'; // yellow
    return '#db2360';                  // red
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Get movie details
    this.movieService.getMovieDetails(id).subscribe((data) => {
      this.movie = data;

      // Extract director name
      const director = data.credits?.crew?.find((c: any) => c.job === 'Director');
      this.directorName = director ? director.name : 'N/A';

      // Extract top 5 cast
      this.topCast = data.credits?.cast
        ? data.credits.cast.slice(0, 5).map((c: any) => ({
            name: c.name,
            character: c.character
          }))
        : [];

      // Calculate user score (0-100)
      this.userScore = Math.round((data.vote_average || 0) * 10);

      // Create conic-gradient style for circular meter
      const deg = (this.userScore / 100) * 360;
      const arcColor = this.scoreColor(this.userScore);
      this.circleStyle = {
        background: `conic-gradient(${arcColor} ${deg}deg, rgba(255,255,255,0.12) ${deg}deg)`
      };

      this.loading = false;
    });

    // ✅ Get trailer video
    this.movieService.getMovieVideos(id).subscribe((res) => {
      const trailer = res.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }
}
