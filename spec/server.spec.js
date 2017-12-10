import assert from 'assert';
import axios from 'axios';

describe('Client Server:', () => {
  describe('RESTful routes:', () => {
    it('should respond with 200 status code', (done) => {
      axios.get('http://localhost:3000/')
        .then((res) => {
          assert.equal(200, res.status);
          done();
        });
    });
  });
});
