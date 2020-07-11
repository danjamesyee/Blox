import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: this.props.match.params.query
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.props.fetchSearch(this.state.searchField);
  }

  handleChange (e) {
    let query = e.currentTarget.value;
    if (query === "") {
      this.props.clearSearch();
      this.setState({ searchField: "" });
    }
    else {
      this.props.fetchSearch(query)
        .then(() => this.setState({ searchField: query }))
    }
  }

  render() {
    let users = this.props.users.map((user, i) => <li key={"searchUser" + i}> <Link to={`users/${user._id}`}>{user.handle}</Link> </li>)
    let tracks = this.props.tracks.map((track, i) => <li key={"searchTrack" + i}> <Link to={`tracks/${track._id}`}>{track.title}</Link> </li>)
    debugger;
    return (
      <div className="search-bar">
        <input 
          type="text" 
          value={this.state.searchField}
          onChange={this.handleChange}
        />

        <h1>Users: </h1>
        {users} 
        <h1>Tracks:  </h1>
        {tracks}
      </div>
    )
  }
}