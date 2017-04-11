/** There are two contest types currently available. */
type ContestType = 'IndividualContestDto' | 'TeamContestDto';

/** Abstract contest type with common fields. */
abstract class AbstractContest {

  constructor(
    public type: ContestType,
    public name: string,
    public startTime: Date,
    public endTime: Date,
    public freezeTime: Date,
    public printing: boolean,
    public id: number
  ) { }

}

/** Represents the individual contest type */
export class IndividualContest extends AbstractContest {

  constructor(
    type: ContestType,
    name: string,
    startTime: Date,
    endTime: Date,
    freezeTime: Date,
    printing: boolean,
    id: number,
  ) {
    super(type, name, startTime, endTime, freezeTime, printing, id);
  }

}

/** Represents a team contest. */
export class TeamContest extends AbstractContest {

  constructor(
    type: ContestType,
    name: string,
    startTime: Date,
    endTime: Date,
    freezeTime: Date,
    printing: boolean,
    id: number,
    public penalty: number
  ) {
    super(type, name, startTime, endTime, freezeTime, printing, id);
  }

}

/** Contest sum type which can represent either a individual or team contest. */
export type Contest = IndividualContest | TeamContest;

/** Represents a valid contest JSON object */
interface ContestJson {
  type: ContestType;
  name: string;
  startTime: string;
  endTime: string;
  freezeTime?: string;
  printing: boolean;
  readonly id: number;
  penalty?: number;
}

/** Create the correct contest type from a given JSON string or throw a exception. */
export function contestFromJson(contest: ContestJson): Contest {
  // Parse common fields
  const type: ContestType = contest['type'];
  const name = contest['name'];
  const startTime = new Date(contest['startTime']);
  const endTime = new Date(contest['endTime']);
  const freezeTime = new Date(contest['freezeTime']);
  const printing = contest['printing'];
  const id = contest['id'];

  // Parse the specific fields and return the concrete type
  switch (type) {
    case 'IndividualContestDto':
      return new IndividualContest(type, name, startTime, endTime, freezeTime,
        printing, id);
    case 'TeamContestDto':
      const penalty = contest['penalty'];
      return new TeamContest(type, name, startTime, endTime, freezeTime,
        printing, id, penalty);
    default:
      throw new TypeError('Unknown contest type: ' + type);
  }
}
