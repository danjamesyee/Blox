import React from "react";
import * as Tone from "tone";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.addNoteToTrack = this.addNoteToTrack.bind(this);
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "" };
    this.state.track = [];
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
    this.setState({ track: this.state.track });
    this.state.track.push(block);
  }

  playNote() {
    Tone.Transport.start();
    const synth = new Tone.Synth().toMaster();
    for (let i = 0; i < this.state.track.length; i++) {
      synth.triggerAttackRelease(
        this.state.track[i].note,
        this.state.track[i].duration
      );
      if (this.state.track[i].duration === "16n") {
        this.sleep(200);
      } else if (this.state.track[i].duration === "8n") {
        this.sleep(400);
      } else if (this.state.track[i].duration === "4n") {
        this.sleep(800);
      }
    }
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  render() {
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
            <button
              className="play-button"
              type="button"
              onClick={() => this.playNote()}
            >
              Play
            </button>
            <button
              className="play-button"
              type="button"
              onClick={() => this.setState({ notes: [], track: [] })}
            >
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

            <input className="save-track" type="submit" value="Save track" />
            {blocksError}
          </form>
        </div>
      </DragDropContext>
    );
  }
}

export default Tracks;
