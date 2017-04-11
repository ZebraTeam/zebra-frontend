import { Component, OnInit } from '@angular/core';

import { ContestService } from '../contest.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css'],
  providers: [ ContestService ]
})
export class ContestsComponent implements OnInit {

  constructor(public contestService: ContestService) { }

  ngOnInit() {
  }

}
