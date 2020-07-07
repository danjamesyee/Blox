import React from "react";
import * as Tone from "tone";

//what users will see when they land on the home page
class MainPage extends React.Component {
  render() {
    const synth = new Tone.Synth().toMaster();
    // debugger;


    return (
      <div>
        <h1>MERNblocks</h1>

        <footer>Copyright &copy; 2020 Daniel Group</footer>
      </div>
    );
  }
}

export default MainPage;
