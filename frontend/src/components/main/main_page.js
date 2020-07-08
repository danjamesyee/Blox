import React from "react";
import { Container, Row, Toast } from 'react-bootstrap';

//what users will see when they land on the home page
class MainPage extends React.Component {
  render() {
    // debugger;

    return (
      <div className="main-page">

        <header>
          <strong>
            <h1 className="title">BLOX</h1>
          </strong>
          <small>BEAT</small>
        </header>
            
        <span>The best rhythm-beat maker in the biz!</span>
        
      </div>
    );
  }
}

export default MainPage;
