const seeder = require("mongoose-seed");
const db = require("./config/keys").mongoURI;
const bcrypt = require("bcryptjs");

// Connect to MongoDB
seeder.connect(db, () => {
  // Load Mongoose models
  seeder.loadModels([
    "./models/User.js",
    "./models/Block.js",
    "./models/Track.js",
    "./models/Vote.js",
  ]);

  // Clear specified collections
  seeder.clearModels(["User", "Block", "Track", "Vote"], () => {
    // Callback to poplulate DB once models are cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

// bcrypt demo user password
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

// Populate demo user and block templates
const data = [
  {
    model: "User",
    documents: [
      {
        handle: "demouser",
        email: "demouser@gmail.com",
        password: hash,
      },
    ],
  },
  {
    model: "Block",
    documents: [
      {
        note: "C4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#AF3508"
      },
      {
        note: "D4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#C64E1B"
      },
      {
        note: "E4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#DD662E"
      },
      {
        note: "F4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#E98440"
      },
      {
        note: "G4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F5A151"
      },
      {
        note: "A4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F5A951"
      },
      {
        note: "B4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F4B150"
      },
      {
        note: "C5",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#E6B775"
      },
      {
        note: "",
        duration: "4n",
        width: 100,
        height: 25,
        color: "black"
      },
      {
        note: "C4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#6E607A"
      },
      {
        note: "D4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#957F9E"
      },
      {
        note: "E4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#BC9EC1"
      },
      {
        note: "F4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#C6A5C3"
      },
      {
        note: "G4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#D0ACC4"
      },
      {
        note: "A4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#E3BAC6"
      },
      {
        note: "B4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#EAC6CF"
      },
      {
        note: "C5",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#FDE8E9"
      },
      {
        note: "",
        duration: "8n",
        width: 50,
        height: 50,
        color: "black"
      },
      {
        note: "C4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#031A6B"
      },
      {
        note: "D4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#182288"
      },
      {
        note: "E4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#2C29A4"
      },
      {
        note: "F4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#5438DC"
      },
      {
        note: "G4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#4D4AE1"
      },
      {
        note: "A4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#455BE5"
      },
      {
        note: "B4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#357DED"
      },
      {
        note: "C5",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#4789EF"
      },
      {
        note: "",
        duration: "16n",
        width: 25,
        height: 100,
        color: "black"
      },
    ],
  },
];
