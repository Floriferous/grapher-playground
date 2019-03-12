// @flow
/* eslint-env mocha */
import { expect } from 'chai';

const US = new Mongo.Collection('us');
const LO = new Mongo.Collection('lo');
const LE = new Mongo.Collection('le');
const OR = new Mongo.Collection('or');
const CO = new Mongo.Collection('co');

LO.addLinks({
  us: {
    field: 'usId',
    collection: US,
    type: 'one'
  },
  les: {
    collection: LE,
    inversedBy: 'lo',
    unique: true,
    autoremove: true
  }
});

US.addLinks({
  ors: {
    collection: OR,
    inversedBy: 'uss'
  },
  los: {
    collection: LO,
    inversedBy: 'us',
    autoremove: true
  }
});

OR.addLinks({
  cos: {
    collection: CO,
    field: 'coIds',
    type: 'many',
    metadata: true
  },
  les: {
    collection: LE,
    inversedBy: 'or'
  },
  uss: {
    collection: US,
    field: 'usLinks',
    type: 'many',
    metadata: true
  }
});

CO.addLinks({
  ors: {
    collection: OR,
    inversedBy: 'cos'
  },
  les: {
    collection: LE,
    inversedBy: 'co'
  }
});

LE.addLinks({
  co: {
    field: 'coLink',
    collection: CO,
    type: 'one',
    metadata: true
  },
  or: {
    field: 'orLink',
    collection: OR,
    type: 'one',
    metadata: true
  },
  lo: {
    field: 'loLink',
    collection: LO,
    type: 'one',
    metadata: true
  }
});

describe('test suite name', () => {
  beforeEach(() => {
    US.remove({});
    LO.remove({});
    LE.remove({});
    OR.remove({});
    CO.remove({});
  });

  it('does not pass if there is a null field in or', () => {
    const usId1 = US.insert({ _id: 'us1' });
    const usId2 = US.insert({ _id: 'us2' });
    const usId3 = US.insert({ _id: 'us3' });
    const orId = OR.insert({
      _id: 'or1',
      a: null,
      usLinks: [{ _id: 'us1' }, { _id: 'us2' }]
    });
    const loId = LO.insert({ _id: 'lod1', usId: 'us3' });
    const leId = LE.insert({
      _id: 'le1',
      loLink: [{ _id: 'lo1' }],
      orLink: { _id: 'or1' }
    });

    const result = US.createQuery({
      los: {
        _id: 1
      },
      ors: {
        _id: 1,
        a: 1,
        les: {
          or: {
            a: 1,
            cos: {
              name: 1
            }
          }
        }
      }
    }).fetch();

    console.log('result:', JSON.stringify(result, null, 2));
    expect(result.length).to.equal(3);
  });

  it('passes if there is no null field in or', () => {
    const usId1 = US.insert({ _id: 'us1' });
    const usId2 = US.insert({ _id: 'us2' });
    const usId3 = US.insert({ _id: 'us3' });
    const orId = OR.insert({
      _id: 'or1',
      //   a: null,
      usLinks: [{ _id: 'us1' }, { _id: 'us2' }]
    });
    const loId = LO.insert({ _id: 'lod1', usId: 'us3' });
    const leId = LE.insert({
      _id: 'le1',
      loLink: [{ _id: 'lo1' }],
      orLink: { _id: 'or1' }
    });

    const result = US.createQuery({
      los: {
        _id: 1
      },
      ors: {
        _id: 1,
        a: 1,
        les: {
          or: {
            a: 1,
            cos: {
              name: 1
            }
          }
        }
      }
    }).fetch();

    console.log('result:', JSON.stringify(result, null, 2));
    expect(result.length).to.equal(3);
  });
});
