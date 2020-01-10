import React from 'react';
import { Router, Route } from 'react-router-dom';
import UserList from './UserList';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import history from '../history';
class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        
        return (
            <div className="App">
                <Router history={history}>
                    <Route path="/" exact component={UserList} />
                    <Route path="/users/new" exact component={UserCreate} />
                    <Route path="/users/edit/:id" exact component={UserEdit} />
                </Router>
            </div>
        )
    }
}

export default App;

