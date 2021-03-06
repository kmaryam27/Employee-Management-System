import React from 'react';
import './Search.css'

const Search = props => (
    <form className="searchForm_div" id="search-form" autoComplete="off" onSubmit={props.SearchOpration}>
      <div>
        <div className='search-input'>
          <input className="validate" type='text' name='search' id='search' placeholder="search..." value={props.searchVal} onChange={props.handleChange}/>
        </div>
      </div>
    </form>
  );

  export default Search;