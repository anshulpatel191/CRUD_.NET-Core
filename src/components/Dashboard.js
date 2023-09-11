import React from 'react';
import { BrowserRouter as Router,Routes  ,Route, Link} from 'react-router-dom';
// import {Switch} from 'react-router-dom';
import AddBook from './AddBook';
import BookList from './BookList';

function Dashboard()
{
    return(
        <Router>
            <div className='container'>
                <nav className='btn btn-warning navbar navbar-expand-lg navheader'>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nv mr-auto'>
                            <li className='nav-item'>
                                <Link to={'/AddBook'} className='navlink'>Add New Book</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/BookList'} className='nav-link'>Book List</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>

                <Routes>
                    <Route exact path='/AddBook' Component={AddBook}/>
                    <Route path='/BookList' Component={BookList}/>
                </Routes>

            </div>
        </Router>
    )
}

export default Dashboard;