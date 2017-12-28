import { searchIt } from '../database/index';

const addExperience = (query, isExperience, location) => {
  const { hits } = query;
  const withBias = { rentals: hits };
  if (isExperience) {
    return searchIt('experiences', 'experience', location)
      .then((results) => { withBias.experiences = results.hits; })
      .catch(() => { withBias.experiences = 'null'; })
      .then(() => withBias);
  }
  return withBias;
};

export default addExperience;
