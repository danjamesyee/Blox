import React from "react";


import './mainpage.scss';
import { Container, Row, Toast } from 'react-bootstrap'

//what users will see when they land on the home page
class MainPage extends React.Component {
  render() {
    // debugger;

    return (
      <div className="main-page">
        <Container>
          <Row>
            <Toast>
              <Toast.Header>
                <strong>
                  <h1 className="title">MERNblocks</h1>
                </strong>
                <small>Checked out</small>
              </Toast.Header>
              <Toast.Body>
                The best rhythm game in the biz! (for kids at least)
              </Toast.Body>
            </Toast>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MainPage;
