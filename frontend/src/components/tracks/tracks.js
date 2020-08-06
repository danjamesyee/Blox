import React from "react";
import * as Tone from "tone";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.addNoteToTrack = this.addNoteToTrack.bind(this);
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "", playing: false };
    this.state.track = [];
    this.pause = this.pause.bind(this);
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
    console.clear();
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
      .makeTrack({ title: this.state.title, blocks: this.state.track })
      .then(this.props.history.push(`/users/${this.props.currentUser.id}`))
      .then(() => window.location.reload());
  }

  addNoteToTrack(block) {
    const synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease(block.note, block.duration);
    this.setState({ track: this.state.track });
    this.state.track.push(block);
  }

  playNote() {
    let track = this.state.track;

    const synth = new Tone.Synth().toMaster();
    // synth.oscillator.type = "sine";
    let newPart = [];
    let dur = 0;
    track.forEach((block, idx) => {
      if (idx !== 0) {
        if (track[idx - 1].duration === "4n") dur += 0.5;
        if (track[idx - 1].duration === "8n") dur += 0.25;
        if (track[idx - 1].duration === "16n") dur += 0.125;
      }

      newPart.push([dur, block.note]);
    });
    newPart.push([dur + 1, "C4"]);
    this.setState({ playing: true });

    let note = 0;
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

  pause(synth) {
    this.setState({ playing: false });
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  render() {
    const synth = new Tone.Synth().toMaster();
    const audio = <audio controls></audio>;
    let pause = (
      <button
        className="play-button pause"
        type="button"
        onClick={() => this.pause(synth)}
        style={{
          backgroundColor: "red",
        }}
      >
        Stop
      </button>
    );

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
    let track = this.state.track || [];
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="tracks-container">
          <h2 className="tracks-title">Unleash your inner musical genius</h2>

          <form className="track-title-form" onSubmit={this.handleSubmit}>
            <label>
              Title your masterpiece...
              <br />
              <input
                type="text"
                value={this.state.title}
                onChange={this.update("title")}
              />
            </label>
            {titleError}
            <h1 className="real-title">{this.state.title}</h1>
            <Droppable droppableId="dp1" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="notes"
                >
                  {track.map((block, i) => (
                    <Draggable
                      key={i}
                      draggableId={i + " "}
                      index={i}
                      id="dragger"
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={i}
                        >
                          <div
                            onClick={() =>
                              this.setState({
                                track: track
                                  .slice(0, i)
                                  .concat(track.slice(i + 1)),
                              })
                            }
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
                onMouseEnter={this.createNotification}
                onClick={() => this.playNote()}
              >
                Play
              </button>
            )}
            <button
              className="play-button"
              type="button"
              onClick={() => this.setState({ notes: [], track: [] })}
            >
              Clear
            </button>

            <ul>
              <li>Click the note buttons to add them to the track</li>
              <li>Click the notes on the track to delete</li>
              <li>Drag and drop to move the notes</li>
            </ul>

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

            <input className="save-track" type="submit" value="Save track" />
            {blocksError}
          </form>
        </div>
        <NotificationContainer />
      </DragDropContext>
    );
  }
}

export default Tracks;
