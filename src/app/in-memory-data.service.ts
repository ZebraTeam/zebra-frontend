import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CONTESTS } from './contest.exampledata';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contests = CONTESTS;
    return { contests };
  }
}
