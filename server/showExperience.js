import { searchIt } from '../database/index';

const addExperience = (rentals, isExp, location) => {
  if (isExp) {
    searchIt('experience', location)
      .then((result) =>  rentals.experiences = result )
  }
};

export default addExperience;
