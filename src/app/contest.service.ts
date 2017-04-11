import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/throw';

import * as _ from 'lodash';

import { Contest, contestFromJson } from './contest';

@Injectable()
export class ContestService {

  private contestsUrl = 'api/contests';
  private contests: BehaviorSubject<Array<Contest>> = new BehaviorSubject([]);

  constructor(private http: Http) {
    this.refresh();
  }

  public refresh(): void {
    this.http.get(this.contestsUrl)
      .map(response => response.json().data.map(contestFromJson))
      .subscribe(
        c => this.contests.next(c),
        this.handleError,
        this.handleComplete
      );
  }

  public getContests(): Observable<Array<Contest>> {
    return this.contests.publishReplay(1).refCount();
  }

  public getContest(id: number): Observable<Contest> {
    return this.getContests().flatMap(c => c).filter(c => c.id === id);
  }

  public deleteContest(contest: Contest): void {
    const url = `${this.contestsUrl}/${contest.id}`;
    this.http.delete(url).subscribe(
      s => this.removeContestFromSubject(contest),
      this.handleError,
      this.handleComplete
    );
  }

  public createContest(contest: Contest): void {
    const url = `${this.contestsUrl}/new`;
    this.http.post(url, contest)
      .map(response => contestFromJson(response.json().data))
      .subscribe(
        c => this.addContestToSubject(c),
        this.handleError,
        this.handleComplete
      );
  }

  public updateContest(contest: Contest): void {
    const url = `${this.contestsUrl}/${contest.id}`;
    this.http.put(url, contest)
    .map(response => contestFromJson(response.json().data))
    .subscribe(
      c => this.updateContestInSubject(c),
      this.handleError,
      this.handleComplete
    );
  }

  private removeContestFromSubject(contest: Contest): void {
    const newContests = this.contests.getValue();
    _.remove(newContests, c => c.id === contest.id);
    this.contests.next(newContests);
  }

  private addContestToSubject(contest: Contest): void {
    const newContests = this.contests.getValue();
    newContests.push(contest);
    this.contests.next(newContests);
  }

  private updateContestInSubject(contest: Contest): void {
    const newContests = this.contests.getValue();
    const idx = _.findIndex(newContests, (c) => c.id === contest.id);
    if (idx !== -1) {
      newContests[idx] = contest;
      this.contests.next(newContests);
    }
  }

  private handleError(error: any): any {
    console.error('An error occurred:', error);
    return Observable.throw(error);
  }

  private handleComplete(): void {
    console.info('Observable completed');
  }
}
