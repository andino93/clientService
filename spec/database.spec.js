import { expect, assert } from 'chai';
import { config } from 'dotenv';
import Promise from 'bluebird';
import { addNewEntry, deleteEntry, searchIt } from '../database/index';
import { makeSampleData } from '../database/seedSampleData';

describe('Database should do things', () => {
  const samples = makeSampleData(1, 'homes', 'home', 'homeId');

  describe('should add new entries to database', () => {
    it('addNewEntry should exist', () => {
      expect(addNewEntry).to.exist;
    });
    it('deleteEntry should exist', () => {
      expect(deleteEntry).to.exist;
    });
    it('should add a new entry to database then delete it', (done) => {
      addNewEntry(samples[1].city, samples[0].index._index, samples[1], samples[0].index._type)
        .tap(success => expect(success.result).to.equal('created'))
        .then(success => deleteEntry(success._index, success._type, success._id))
        .tap(response => expect(response.result).to.equal('deleted'))
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('should find entries from database', () => {
    it('searchIt should exist', () => {
      expect(searchIt).to.exist;
    });
  });
});
