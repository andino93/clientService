import assert from 'assert';
import axios from 'axios';
import { config } from 'dotenv';

describe('Client Server:', () => {
  describe('RESTful routes:', () => {
    it('should respond with 200 status code', (done) => {
      axios.get(`http://localhost:${process.env.PORT}/`)
        .then((res) => {
          assert.equal(200, res.status);
          done();
        });
    });
  });
});
