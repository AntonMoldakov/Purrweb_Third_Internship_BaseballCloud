import { ISchool, ITeams } from '../graphql/types';

export const convertTableData = (arr: convertTableDataProps) =>
  arr
    ? arr.map(obj => ({
        ...obj,
        school: obj.school ? obj.school.name : null,
        teams: obj.teams.reduce((prev, curr) => prev + curr.name + ' ', ''),
        player_name: obj.first_name + ' ' + obj.last_name,
      }))
    : [];

type convertTableDataProps =
  | Array<{ teams: Array<ITeams>; school: ISchool; first_name?: string; last_name?: string }>
  | undefined;
