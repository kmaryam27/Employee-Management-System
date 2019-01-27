import React from 'react';
import './Search.css'

const Search = props => (
    <form className="searchForm_div" action={props.action}>
      <div>
        <div className='search-input'>
          <input className="validate" type='text' name='search' id='search' placeholder="search..." value={props.searchVal} onChange={props.handleChange}/>
        </div>
      </div>
      {/* <button className="btn" onClick={props.selectRecipes}>search</button> */}
    </form>
  );

  export default Search;