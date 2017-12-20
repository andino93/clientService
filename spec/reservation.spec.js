import { expect, assert } from 'chai';
import axios from 'axios';
import { config } from 'dotenv';

describe('Reservations Testing Server:', () => {
  describe('should respond to POST', () => {
    it('should respond with 200 status code', (done) => {
      axios.post(`http://localhost:5001/bookies`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.data).to.be.an('object');
          expect(res.data).to.have.property('available')
          expect(res.data.available).to.be.exist;
          done();
        })
        .catch(err => done(err));
    });
  });
});
