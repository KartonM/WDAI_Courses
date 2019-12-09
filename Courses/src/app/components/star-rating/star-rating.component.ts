import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  maxRating = 5;
  starNumbers: number[];
  starFilled: boolean[];
  rated = false;
  rate: number;
  constructor() {
    this.starNumbers = Array(this.maxRating).fill(0).map((x, i) => i);
    this.starFilled = Array(this.maxRating).fill(false);
  }

  ngOnInit() {
  }

  starHovered(rate: number) {
    if(!this.rated) this.starFilled = this.starFilled.map((x, i) => i <= rate);
  }

  setRate(i) {
    this.rated = true;
    this.rate = i + 1;
  }

  clearRating(): void {
    if (!this.rated) this.starFilled.fill(false);
  }
}
