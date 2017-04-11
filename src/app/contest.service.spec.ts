import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import * as _ from 'lodash';

import { ContestService } from './contest.service';
import { CONTESTS } from './contest.exampledata';
import { Contest, contestFromJson } from './contest';


describe('ContestService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        ContestService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  describe('getContests()', () => {
    it('should return a list of contests',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        const mockResponse = {
          data: CONTESTS
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        contestService.refresh();
        contestService.getContests().subscribe((contests) => {
          expect(contests.length).toBe(2);
          expect(contests[0].constructor.name).toBe('TeamContest');
          expect(contests[1].constructor.name).toBe('IndividualContest');
          expect(contests[0].type).toBe('TeamContestDto');
          expect(contests[1].type).toBe('IndividualContestDto');
        }, (error) => {
          fail(error);
        });
      })));
  });


  describe('getContest()', () => {
    it('should return a contest with the given id',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        const mockResponse = {
          data: CONTESTS[0]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const c = contestFromJson(CONTESTS[0]);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.constructor.name).toBe(c.constructor.name);
          expect(contest.type).toBe(c.type);
        }, (error) => {
          fail(error);
        });
      })));
  });

  describe('createContest()', () => {
    it('should create the given contest',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: {data: JSON.parse(connection.request.getBody())}
          })));
        });


        const c: Contest = contestFromJson(CONTESTS[0]);
        contestService.createContest(c);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.constructor.name).toBe(c.constructor.name);
          expect(contest.type).toBe(c.type);
        }, (error) => {
          fail(error);
        });


      })));
  });

  describe('updateContest()', () => {
    it('should update the given contest',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          let mockResponse = {};
          if (connection.request.url.endsWith(CONTESTS[0].id)) {
            mockResponse = {
              data: JSON.parse(connection.request.getBody())
            };
          } else {
            mockResponse = { data: CONTESTS };
          }
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        contestService.refresh();

        const c: Contest = contestFromJson(CONTESTS[0]);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.constructor.name).toBe(c.constructor.name);
          expect(contest.type).toBe(c.type);
        }, (error) => fail(error));

        c.name = 'Other test name';

        contestService.updateContest(c);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.name).toBe(c.name);
        }, (error) => {
          fail(error);
        });

        c.name = 'Other test name 2';
        c.id = 10;
        contestService.updateContest(c);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.name).not.toBe(c.name);
        }, (error) => {
          fail(error);
        });
      })));
  });

  describe('deleteContest()', () => {
    it('should delete the given contest',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          let mockResponse = {};
          if (connection.request.url.endsWith(CONTESTS[0].id)) {
            mockResponse = {
              body: { data: JSON.parse(connection.request.getBody()) }
            };
          } else {
            mockResponse = { data: CONTESTS };
          }
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        contestService.refresh();

        const c: Contest = contestFromJson(CONTESTS[0]);
        contestService.getContest(c.id).subscribe((contest) => {
          expect(contest.constructor.name).toBe(c.constructor.name);
          expect(contest.type).toBe(c.type);
        }, (error) => fail(error));

        contestService.deleteContest(c);
        contestService.getContests().subscribe((contests) => {
          if (_.findIndex(contests, contest => contest.id === c.id) !== -1) {
            fail('Failed to remove contest');
          }
        }, (error) => {
          fail(error);
        });
      })));
  });

  describe('handleError()', () => {
    it('should be called on error',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({data: null})
          })));
        });

        spyOn(contestService, 'handleError').and.callThrough();
        contestService.refresh();
        expect(contestService.handleError).toHaveBeenCalled();
      })));
  });

  describe('handleComplete()', () => {
    it('should be called on complete',
      async(inject([ContestService, MockBackend], (contestService, mockBackend) => {

        const mockResponse = {
          data: CONTESTS
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        spyOn(contestService, 'handleComplete').and.callThrough();
        contestService.refresh();
        expect(contestService.handleComplete).toHaveBeenCalled();
      })));
  });

});
