import { expect, assert } from 'chai';
import axios from 'axios';
import { config } from 'dotenv';

describe('Client Server:', () => {
  describe('RESTful routes:', () => {
    it('should respond with 200 status code', (done) => {
      axios.get(`http://localhost:${process.env.PORT}/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
