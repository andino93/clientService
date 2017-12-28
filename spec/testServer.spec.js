import { expect, assert } from 'chai';
import axios from 'axios';
import { config } from 'dotenv';

describe('Testing Server:', () => {
  describe('should respond to POST to reservation route', () => {
    it('should respond with 200 status code', (done) => {
      axios.post(`http://localhost:5001/bookies`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.data).to.be.an('object');
          expect(res.data).to.have.property('available')
          expect(res.data.available).to.exist;
          expect(res.data).to.have.property('reservationId');
          expect(res.data.reservationId).to.exist;
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('should respond to GET to homes route', () => {
    it('should respond with 200 status code', (done) => {
      axios.get(`http://localhost:5001/homes`, { params: { id: 12345 } })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.data).to.be.an('object');
          expect(res.data).to.have.property('id');
          expect(res.data.id).to.equal('12345');
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('should respond to GET to experiences route', () => {
    it('should respond with 200 status code', (done) => {
      axios.get(`http://localhost:5001/experiences`, { params: { id: 12345 } })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.data).to.be.an('object');
          expect(res.data).to.have.property('id');
          expect(res.data.id).to.equal('12345');
          done()
        })
        .catch(err => done(err));
    });
  });
});
