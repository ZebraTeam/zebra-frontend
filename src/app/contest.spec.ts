import { TestBed, inject } from '@angular/core/testing';

import { Contest, TeamContest, IndividualContest, contestFromJson } from './contest';

import { CONTESTS } from './contest.exampledata';

describe('Contest', () => {

  describe('TeamContest', () => {

    it('should be creatable from JSON', () => {

      const json = CONTESTS[0];
      const contest: Contest = contestFromJson(json);
      expect(contest.constructor.name).toBe('TeamContest');
      expect(contest.type).toBe(json['type']);
      expect(contest.name).toBe(json['name']);
      expect(contest.startTime).toEqual(new Date(json['startTime']));
      expect(contest.endTime).toEqual(new Date(json['endTime']));
      expect(contest.freezeTime).toEqual(new Date(json['freezeTime']));
      expect(contest.printing).toBe(json['printing']);
      expect(contest.penalty).toBe(json['penalty']);
    });
  });

  describe('IndividualContest', () => {

    it('should be creatable from JSON', () => {

      const json = CONTESTS[1];
      const contest: Contest = contestFromJson(json);
      expect(contest.constructor.name).toBe('IndividualContest');
      expect(contest.type).toBe(json['type']);
      expect(contest.name).toBe(json['name']);
      expect(contest.startTime).toEqual(new Date(json['startTime']));
      expect(contest.endTime).toEqual(new Date(json['endTime']));
      expect(contest.freezeTime).toEqual(new Date(json['freezeTime']));
      expect(contest.printing).toBe(json['printing']);
    });
  });

  describe('contestFromJson', () => {

    it('should throw an exception on wrong type value', () => {
      const wrongJson = {
        'type': 'SpecialContest',
        'name': 'TEST',
        'startTime': '2017-04-11T23:01:26',
        'endTime': '2017-04-13T23:01:26',
        'freezeTime': null,
        'printing': true,
        'id': 1
      };
      expect(() => {
        contestFromJson(wrongJson);
      }).toThrowError(TypeError, /Unknown contest type: .*/);
    });
  });
});
