import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
      searching: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount () {
    this.props.clearSearch();
  }

  // handleChange (e) {
  //   let query = e.currentTarget.value;
  //   if (query === "") {
  //     this.props.clearSearch();
  //     this.setState({ searchField: "" });
  //   }
  //   else {
  //     this.props.fetchSearch(query)
  //       .then(() => this.setState({ searchField: query }))
  //   }
  // }

  handleChange(e) {
    this.setState({ searchField: e.currentTarget.value })
  }

  handleEnter(e) {
    let query = this.state.searchField;
    if (e.keyCode === 13) {
      this.props.fetchSearch(query)
        .then(() => this.setState({ searching: false }));
    }
  }

  handleSearch(e) {
    let query = this.state.searchField;
    this.props.fetchSearch(query)
      .then(() => this.setState({ searching: false }));
  }

  handleReset(e) {
    this.props.clearSearch();
    this.setState({ searchField: '', searching: true });
  }

  render() {
    let users = this.props.users.map((user, i) => <li key={"searchUser" + i}> <Link to={`users/${user._id}`}>{user.handle}</Link> </li>)
    let tracks = this.props.tracks.map((track, i) => <li key={"searchTrack" + i}> <Link to={`tracks/${track._id}`}>{track.title}</Link> </li>)


    let usersHeader;
    if (users.length > 0) {
      usersHeader = <h6 className="search-categories">Users:</h6>;
    } 
    else if (!this.state.searching){
      usersHeader = <h6 className="search-errors">Users Not Found</h6>
    }
    
    let tracksHeader;
    if (tracks.length > 0) {
      tracksHeader = <h6 className="search-categories">Tracks:</h6>
    } 
    else if (!this.state.searching) {
      tracksHeader = <h6 className="search-errors">Tracks Not Found</h6>
    }

    let hidden = " hidden"
    if (!this.state.searching) hidden = '';

    return (
      <div className="search-bar">
        <span onClick={this.handleSearch} className="material-icons">
          search
          </span>
        <input
          // id="search"
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

        <div className={`search-dropdown` + hidden}>
          {usersHeader}
          {users}
          {tracksHeader}
          {tracks}
        </div>

      </div>
    )
  }
}