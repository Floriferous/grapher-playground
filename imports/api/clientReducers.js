import A from './A';
import B from './B';
import C from './C';
import D from './D';

C.addReducers({
  aReducer: {
    body: { d: { a: { text: 1 } } },
    reduce: ({ d = [] }) => d.length > 0 && d[0].a
  },
  dReducer: {
    body: { d: { text: 1 } },
    reduce: ({ d = [] }) => (d.length > 0 ? d[0].text : 'nothing')
  }
});
