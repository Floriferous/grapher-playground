import B from '../B';

B.addReducers({
  reducer1: {
    body: {
      A: {
        _id: 1,
        B: {
          _id: 1
        }
      },
      _id: 1
    },
    reduce: () => 'yo'
  },
  reducer2: {
    body: {
      A: {
        _id: 1,
        B: {
          _id: 1
        }
      },
      _id: 1
    },
    reduce: () => 'yo'
  }
});
