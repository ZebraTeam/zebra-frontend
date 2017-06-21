import { Component, OnInit } from '@angular/core';
import { ContestService } from '../contest.service';

@Component({
  selector: 'app-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.css'],
})
export class ContestDetailComponent implements OnInit {

  constructor(
    public contestService: ContestService
  ) { }

  ngOnInit() {
  }

}
