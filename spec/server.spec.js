import { expect, assert } from 'chai';
import axios from 'axios';
import { config } from 'dotenv';

describe('Client Server:', () => {
  describe('RESTful routes:', () => {
    it('should respond with results containing Chicago', (done) => {
      const query = { params: { city: 'Chicago' } }
      axios.get(`http://localhost:${process.env.PORT}/rentals`, query)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.data).to.be.an('object')
          expect(res.data).to.have.property('rentals')
          expect(res.data.rentals.hits).to.be.an('array')
          done();
        });
    });
  });
});
