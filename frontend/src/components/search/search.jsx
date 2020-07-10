import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.props.clearSearch();
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
    let users = this.props.users.map(user => <li>{user.handle}</li>)
    let tracks = this.props.tracks.map(track => <li>{track.title}</li>)
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