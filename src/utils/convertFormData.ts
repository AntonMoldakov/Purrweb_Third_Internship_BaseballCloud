import { handleSubmitProps } from 'types';

export const ConvertFormData = ({
  bats_hand,
  throws_hand,
  facilities,
  position,
  position2,
  school,
  school_year,
  teams,
  age,
  feet,
  weight,
  inches,
  ...values
}: handleSubmitProps) => {
  return {
    ...values,
    feet: +feet, 
    weight: +weight,
    inches: +inches,
    age: +age,
    bats_hand: bats_hand.value,
    throws_hand: throws_hand.value,
    facilities: facilities
      ? facilities.map(item => {
          return { id: +item.value, u_name: item.label, email: item.data };
        })
      : [],
    teams: teams
      ? teams.map(item => {
          return { id: +item.value, name: item.label };
        })
      : [],
    school: school?.value ? { id: +school?.value, name: school?.label } : null,
    position: position.value,
    position2: position2?.value,
    school_year: school_year ? school_year.value : '',
  };
};
