import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

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

  @Output() courseRated = new EventEmitter<number>();

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
    this.rate = i + 1;
    if (!this.rated) {
      this.courseRated.emit(this.rate);
    }
    this.rated = true;
  }

  clearRating(): void {
    if (!this.rated) this.starFilled.fill(false);
  }
}
