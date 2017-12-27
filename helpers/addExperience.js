import { searchIt } from '../database/index';

const addExperience = (query, isExperience, location) => {
  const { hits } = query;
  const withBias = { rentals: hits };
  if (isExperience) {
    return searchIt('experiences', 'experience', location)
      .then((results) => { withBias.experience = results.hits; })
      .catch(() => { withBias.experience = 'null'; })
      .then(() => withBias);
  }
  return withBias;
};

export default addExperience;
