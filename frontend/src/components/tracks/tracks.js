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
    // debugger;
    this.props.makeTrack({ title: this.state.title, blocks: this.state.track })
    .then(this.props.history.push(`/users/${this.props.currentUser.id}`))
    .then(() => window.location.reload())
  }

  addNoteToTrack(block) {
    this.setState({ track: this.state.track });
    this.state.track.push(block);
  }

  playNote(part) {
    Tone.Transport.start();
    const synth = new Tone.Synth().toMaster();
    for (let i = 0; i < this.state.track.length; i++) {
      // debugger;

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
    // debugger;
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
    // debugger;
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
            {/* <button
            style={{
              backgroundColor: "",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[0].note,
                blocks[0].duration,
                blocks[0],
                blocks[0].width,
                blocks[0].height,
                blocks[0].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[0].note, blocks[0].duration)
            }
          >
            C4
          </button>

          <button
            style={{
              backgroundColor: colors.color2,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[2].note,
                blocks[2].duration,
                blocks[2],
                blocks[2].width,
                blocks[2].height,
                blocks[2].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[2].note, blocks[2].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color1,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[1].note,
                blocks[1].duration,
                blocks[1],
                blocks[1].width,
                blocks[1].height,
                blocks[1].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[1].note, blocks[1].duration)
            }
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: colors.color3,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[3].note,
                blocks[3].duration,
                blocks[3],
                blocks[3].width,
                blocks[3].height,
                blocks[3].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[3].note, blocks[3].duration)
            }
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: colors.color6,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[6].note,
                blocks[6].duration,
                blocks[6],
                blocks[6].width,
                blocks[6].height,
                blocks[6].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[6].note, blocks[6].duration)
            }
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: colors.color5,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[5].note,
                blocks[5].duration,
                blocks[5],
                blocks[5].width,
                blocks[5].height,
                blocks[5].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[5].note, blocks[5].duration)
            }
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: colors.color4,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[4].note,
                blocks[4].duration,
                blocks[4],
                blocks[4].width,
                blocks[4].height,
                blocks[4].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[4].note, blocks[4].duration)
            }
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: colors.color7,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[7].note,
                blocks[7].duration,
                blocks[7],
                blocks[7].width,
                blocks[7].height,
                blocks[7].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[7].note, blocks[7].duration)
            }
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: colors.rest,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[8].note,
                blocks[8].duration,
                blocks[8],
                blocks[8].width,
                blocks[8].height,
                blocks[8].color
              )
            }
          >
            Rest
          </button> */}
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
            {/* <button
            style={{
              backgroundColor: colors.color11,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[11].note,
                blocks[11].duration,
                blocks[11],
                blocks[11].width,
                blocks[11].height,
                blocks[11].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[11].note, blocks[11].duration)
            }
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: colors.color10,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[10].note,
                blocks[10].duration,
                blocks[10],
                blocks[10].width,
                blocks[10].height,
                blocks[10].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[10].note, blocks[10].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color9,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[9].note,
                blocks[9].duration,
                blocks[9],
                blocks[9].width,
                blocks[9].height,
                blocks[9].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[9].note, blocks[9].duration)
            }
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: colors.color12,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[12].note,
                blocks[12].duration,
                blocks[12],
                blocks[12].width,
                blocks[12].height,
                blocks[12].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[12].note, blocks[12].duration)
            }
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: colors.color13,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[13].note,
                blocks[13].duration,
                blocks[13],
                blocks[13].width,
                blocks[13].height,
                blocks[13].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[13].note, blocks[13].duration)
            }
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: colors.color14,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[14].note,
                blocks[14].duration,
                blocks[14],
                blocks[14].width,
                blocks[14].height,
                blocks[14].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[14].note, blocks[14].duration)
            }
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: colors.color15,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[15].note,
                blocks[15].duration,
                blocks[15],
                blocks[15].width,
                blocks[15].height,
                blocks[15].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[15].note, blocks[15].duration)
            }
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: colors.color16,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[16].note,
                blocks[16].duration,
                blocks[16],
                blocks[16].width,
                blocks[16].height,
                blocks[16].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[16].note, blocks[16].duration)
            }
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: colors.rest,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[17].note,
                blocks[17].duration,
                blocks[17],
                blocks[17].width,
                blocks[17].height,
                blocks[17].color
              )
            }
          >
            Rest
          </button> */}

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
            {/* <button
            style={{
              backgroundColor: colors.color18,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[18].note,
                blocks[18].duration,
                blocks[18],
                blocks[18].width,
                blocks[18].height,
                blocks[18].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[18].note, blocks[18].duration)
            }
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: colors.color19,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[19].note,
                blocks[19].duration,
                blocks[19],
                blocks[19].width,
                blocks[19].height,
                blocks[19].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[19].note, blocks[19].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color20,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[20].note,
                blocks[20].duration,
                blocks[20],
                blocks[20].width,
                blocks[20].height,
                blocks[20].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[20].note, blocks[20].duration)
            }
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: "#5438DC",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("F4", "16n", blocks[20], 25, 100, "#5438DC")
            }
            onMouseEnter={() => synth.triggerAttackRelease("F4", "16n")}
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: "#4D4AE1",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("G4", "16n", blocks[19], 25, 100, "#4D4AE1")
            }
            onMouseEnter={() => synth.triggerAttackRelease("G4", "16n")}
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: "#455BE5",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("A4", "16n", blocks[21], 25, 100, "#455BE5")
            }
            onMouseEnter={() => synth.triggerAttackRelease("A4", "16n")}
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: "#357DED",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("B4", "16n", blocks[23], 25, 100, "#357DED")
            }
            onMouseEnter={() => synth.triggerAttackRelease("B4", "16n")}
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: "#4789EF",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C5", "16n", blocks[22], 25, 100, "#4789EF")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C5", "16n")}
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: "black",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("", "16n", blocks[26], 25, 100, "white")
            }
          >
            Rest
          </button> */}

            <br />
            <br />

            <input type="submit" value="Save track" />
            {blocksError}
          </form>
        </div>
      </DragDropContext>
    );
  }
}

export default Tracks;
