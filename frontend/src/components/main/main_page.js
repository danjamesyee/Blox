import React from "react";
import './mainpage.scss';
import

//what users will see when they land on the home page
class MainPage extends React.Component {
  render() {
    return (
      <div className='main-page'>
        <h1 className='title'>MERNblocks</h1>
        <footer>Copyright &copy; 2020 Daniel Group</footer>
      </div>
    );
  }
}

export default MainPage;
