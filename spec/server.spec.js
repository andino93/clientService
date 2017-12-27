import { expect, assert } from 'chai';
import axios from 'axios';
import { config } from 'dotenv';
import reservation from '../spec/server';

config();

describe('Client Server:', () => {
  describe('GET /rentals with Chicago query', () => {
    const results = {};
    before((done) => {
      const query = { params: { location: 'Chicago' } };
      axios.get(`http://localhost:${process.env.PORT}/rentals`, query)
        .then(({ status, data }) => {
          results.data = data;
          results.status = status;
        })
        .then(() => done())
        .catch(err => done(err));
    });
    it('should get response with 200 status code', () => {
      expect(results.status).to.equal(200);
    });
    it('response data should be an object', () => {
      expect(results.data).to.be.an('object');
    });
    it('data should have key called rentals', () => {
      expect(results.data).to.have.property('rentals');
    });
    it('rentals should be array of objects', () => {
      expect(results.data.rentals.hits).to.be.an('array');
      expect(results.data.rentals.hits[0]).to.be.an('object');
    })
    it('query object should contain source property', () => {
      expect(results.data.rentals.hits[0]).to.have.property('_source');
    });
    it('query object should have a city of Chicago', () => {
      expect(results.data.rentals.hits[0]._source).to.have.property('city');
      expect(results.data.rentals.hits[0]._source.city).to.equal('Chicago');
    })
  });

  describe('POST /reservations should respond with a decision', () => {
    let booking;
    before((done) => {
      axios.post(`http://localhost:${process.env.PORT}/reservations`)
        .then(({ data }) => { booking = data; })
        .then(() => done())
        .catch(err => done(err));
    });
    it('should receive response from server', () => {
      expect(booking).to.exist;
    });
    it('should receive object with availability confirmation', () => {
      expect(booking).to.have.property('available');
      expect(booking.available).to.be.a('boolean');
      expect(booking).to.have.property('reservationId');
    });
  });
  describe('GET /details should retrieve and respond with info', () => {
    let details;
    before((done) => {
      const query = { params: { id: 12345, type: 'home' } };
      axios.get(`http://localhost:${process.env.PORT}/details`, query)
        .then(( { data }) => { details = data; })
        .then(() => done())
        .catch(err => done(err));
    });
    it('should respond with data object', () => {
      expect(details).to.exist;
      expect(details).to.be.an('object');
    });
    it('should contain detailed info for id 12345', () => {
      expect(details.id).to.equal('12345');
      expect(details.details).to.be.an('object');
    });
  });
});
