import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import Query from './Query.jsx';
import Query2 from './Query2.jsx';
import Query3 from './Query3.jsx';
import Query4 from './Query4.jsx';

const App = () => (
  <div>
    {/* <Info /> */}
    {/* <Query />
    <Query2 /> */}
    <h1>These 2 queries should display the same data</h1>
    {/* <Query3 /> */}
    <Query4 />
  </div>
);

export default App;
