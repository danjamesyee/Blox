import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import SearchContainer from './search_container';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: "",
      searching: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    this.setState({ searchField: e.currentTarget.value })
  }

  handleEnter (e) {
    let query = this.state.searchField;
    if (e.keyCode === 13) {
      let state = { query };
      this.setState({ searching: false })
    }
  }

  handleSearch (e) {
    let query = this.state.searchField;
    let state = { query };
    this.setState({ searching: false });
  }

  handleReset (e) {
    this.setState({ searchField: '' });
  }


  render() {
    let redirect = <></>;
    debugger;
    if (!this.state.searching) {
      redirect = <Redirect to={`search/${this.state.searchField}`} />
      this.setState( { searching: true });
    }

    return (
        <div className="search-bar">
          <span onClick={this.handleSearch} className="material-icons">
            search
          </span>
          <input
            className="search-bar-input"
            type="text"
            value={this.state.searchField}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            placeholder="Search..."
          />
          <span onClick={this.handleReset} className="material-icons">
            close
          </span>
          
          {redirect}
          <SearchContainer />
          
        </div>
      )
  }
}

export default withRouter(SearchBar);