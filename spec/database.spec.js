import { expect, assert } from 'chai';
import { config } from 'dotenv';
import Promise from 'bluebird';
import { addNewEntry, deleteEntry } from '../database/index';

describe('Database should do things', () => {
  describe('should add new entries to database', () => {
    it('addNewEntry should exist', () => {
      expect(addNewEntry).to.exist;
    });
  });
  describe('should delete entries from database', () => {
    it('deleteEntry should exist', () => {
      expect(deleteEntry).to.exist;
    });
  });
});
