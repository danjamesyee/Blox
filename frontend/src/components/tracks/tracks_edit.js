import React from "react";
import * as Tone from "tone";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class TracksEdit extends React.Component {
  constructor(props) {
    super(props);
    this.addNoteToTrack = this.addNoteToTrack.bind(this);
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { track: [], playing: false };
    this.testFunc = this.testFunc.bind(this);
    this.clear = this.clear.bind(this);
  }
  onDragEnd = (result) => {
    const { destination, source, reason } = result;

    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const blocks = Object.assign([], this.state.track);
    const droppedBlock = this.state.track[source.index];

    blocks.splice(source.index, 1);
    blocks.splice(destination.index, 0, droppedBlock);
    this.setState({ track: blocks });
  };

  componentDidMount() {
    this.props.fetchBlocks();
    this.props.fetchTrack(this.props.match.params.trackId);
    if (this.props.tracks) this.testFunc();
    // console.log(this.props);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .updateTrack({
        title: this.state.title,
        blocks: this.state.track,
        id: this.state.id,
      })
      .then(this.props.history.push("/"))
      .then(() => window.location.reload());
  }

  addNoteToTrack(block) {
    this.setState({ track: this.state.track });
    this.state.track.push(block);
  }

  testFunc() {
    this.setState({
      track: this.props.tracks[this.props.match.params.trackId].blocks,
      title: this.props.tracks[this.props.match.params.trackId].title,
      id: this.props.match.params.trackId,
    });
  }

  playNote() {
    let track = this.state.track;

    console.log(track);
    const synth = new Tone.Synth().toMaster();
    // synth.oscillator.type = "sine2";
    let newPart = [];
    let dur = 0;
    track.forEach((block) => {
      if (block.duration === "4n") dur += 0.5;
      if (block.duration === "8n") dur += 0.25;
      if (block.duration === "16n") dur += 0.125;

      newPart.push([dur, block.note]);
    });
    newPart.push([dur + 1, "C4"]);
    this.setState({ playing: true });
    console.log(newPart);

    let note = 0;
    console.log(Tone.Transport);
    Tone.Transport.cancel();

    let part = new Tone.Part((time, pitch) => {
      if (note >= newPart.length - 1 || this.state.playing === false) {
        this.setState({ playing: false });

        Tone.Transport.cancel();
      } else {
        synth.triggerAttackRelease(pitch, "4n", time);
      }
      // console.log(pitch);
      // console.log(note);

      note++;
    }, newPart);

    part.start();
    Tone.Transport.start();
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  clear() {
    this.setState({ track: [] }, () => {
      console.log(this.state.track);
    });
  }
  render() {
    // debugger;
    let pause = (
      <button
        className="play-button pause"
        type="button"
        onClick={() => this.setState({ playing: false })}
        style={{
          backgroundColor: "red",
        }}
      >
        Stop
      </button>
    );
    const synth = new Tone.Synth().toMaster();
    let titleError;
    if (this.props.errors.title === undefined) {
      titleError = <div className="errors"></div>;
    } else {
      titleError = (
        <div className="errors">
          {Object.values(this.props.errors.title).join("")}
        </div>
      );
    }

    let blocksError;
    if (this.props.errors.blocks === undefined) {
      blocksError = <div className="errors"></div>;
    } else {
      blocksError = (
        <div className="errors">
          {Object.values(this.props.errors.blocks).join("")}
        </div>
      );
    }

    let blocks =
      Object.values(this.props.blocks).sort(function (a, b) {
        return a.idx - b.idx;
      }) || [];
    let trackTitle = this.state.title;
    if (blocks.length === 0) {
      return null;
    } else {
      for (let j = 0; j < this.state.track.length; j++) {
        for (let b = 0; b < blocks.length; b++) {
          if (blocks[b]._id === this.state.track[j]) {
            this.state.track[j] = blocks[b];
          }
        }
      }
    }
    return (
      <div className="tracks-container">
        <h2 className="tracks-title">Unleash your inner musical genius</h2>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <form className="track-title-form" onSubmit={this.handleSubmit}>
            <label>
              Title your masterpiece...
              <br />
              <input
                type="text"
                value={trackTitle}
                onChange={this.update("title")}
              />
            </label>
            {titleError}
            <h1 className="real-title">{trackTitle}</h1>
            <Droppable droppableId="dp1" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="notes"
                >
                  {this.state.track.map((block, i) => (
                    <Draggable key={i} draggableId={i + " "} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={i}
                        >
                          <div
                            className="actual-block"
                            style={{
                              backgroundColor: block.color,
                              width: block.width / 2,
                              minWidth: 0,
                              height: block.height / 2,
                            }}
                          ></div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <br />
            <p className="begin">
              Press play to begin or to hear your track once you've made it
            </p>
            {this.state.playing ? (
              pause
            ) : (
              <button
                className="play-button"
                type="button"
                onClick={() => this.playNote()}
              >
                Play
              </button>
            )}
            <button className="play-button" type="button" onClick={this.clear}>
              Clear
            </button>

            <h3>Click the note buttons to add them to the track</h3>
            <h4>Quarter Notes</h4>
            {blocks
              .slice(0, 15)
              .sort(function (a, b) {
                return a.idx - b.idx;
              })
              .map((block, i) => (
                <button
                  key={i}
                  style={{
                    backgroundColor: block.color,
                  }}
                  type="button"
                  onClick={() => this.addNoteToTrack(block)}
                  onMouseEnter={() =>
                    synth.triggerAttackRelease(block.note, block.duration)
                  }
                >
                  {!block.note ? "Rest" : block.note}
                </button>
              ))}

            <h4>Eighth notes</h4>
            {blocks
              .slice(15, 30)
              .sort(function (a, b) {
                return a.idx - b.idx;
              })
              .map((block, i) => (
                <button
                  key={i}
                  style={{
                    backgroundColor: block.color,
                  }}
                  type="button"
                  onClick={() => this.addNoteToTrack(block)}
                  onMouseEnter={() =>
                    synth.triggerAttackRelease(block.note, block.duration)
                  }
                >
                  {!block.note ? "Rest" : block.note}
                </button>
              ))}

            <h4>Sixteenth notes</h4>
            {blocks
              .slice(30, 45)
              .sort(function (a, b) {
                return a.idx - b.idx;
              })
              .map((block, i) => (
                <button
                  key={i}
                  style={{
                    backgroundColor: block.color,
                  }}
                  type="button"
                  onClick={() => this.addNoteToTrack(block)}
                  onMouseEnter={() =>
                    synth.triggerAttackRelease(block.note, block.duration)
                  }
                >
                  {!block.note ? "Rest" : block.note}
                </button>
              ))}

            <br />
            <br />

            <input type="submit" className="save-track" value="Save track" />
            {blocksError}
          </form>
        </DragDropContext>
        <NotificationContainer />
      </div>
    );
  }
}

export default TracksEdit;
