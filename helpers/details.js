import { config } from 'dotenv';

config();
const determineEndpoint = (type = 'test') => {
  switch (type) {
    case 'experience':
      return process.env.EXPERIENCES;
    case 'home':
      return process.env.HOMES;
    default:
      return process.env.INVENTORY;
  }
};

export default determineEndpoint;
