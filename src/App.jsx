import React from 'react';
import Board from './board/Board';
import Header from './header/Header';
import './App.less';

const App = () => (
    <div className="App">
        <Header />
        <Board />
    </div>
);

export default App;
