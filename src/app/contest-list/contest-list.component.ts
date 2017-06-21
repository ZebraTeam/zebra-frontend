import { Component, OnInit } from '@angular/core';

import { ContestService } from '../contest.service';


@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {

  constructor(public contestService: ContestService) { }

  ngOnInit() {
  }

}
