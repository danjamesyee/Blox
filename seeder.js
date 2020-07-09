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
        idx: 0,
        note: "C4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#AF3508",
      },
      {
        idx: 1,
        note: "D4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#C64E1B",
      },
      {
        idx: 2,
        note: "E4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#DD662E",
      },
      {
        idx: 3,
        note: "F4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#E98440",
      },
      {
        idx: 4,
        note: "G4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F5A151",
      },
      {
        idx: 5,
        note: "A4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F5A951",
      },
      {
        idx: 6,
        note: "B4",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#F4B150",
      },
      {
        idx: 7,
        note: "C5",
        duration: "4n",
        width: 100,
        height: 25,
        color: "#E6B775",
      },
      {
        idx: 8,
        note: "",
        duration: "4n",
        width: 100,
        height: 25,
        color: "black",
      },
      {
        idx: 9,
        note: "C4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#1E6E37",
      },
      {
        idx: 10,
        note: "D4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#138A36",
      },
      {
        idx: 11,
        note: "E4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#10A232",
      },
      {
        idx: 12,
        note: "F4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#0CB92D",
      },
      {
        idx: 13,
        note: "G4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#04E824",
      },
      {
        idx: 14,
        note: "A4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#0EF449",
      },
      {
        idx: 15,
        note: "B4",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#18FF6D",
      },
      {
        idx: 16,
        note: "C5",
        duration: "8n",
        width: 50,
        height: 50,
        color: "#85FFB1",
      },
      {
        idx: 17,
        note: "",
        duration: "8n",
        width: 50,
        height: 50,
        color: "black",
      },
      {
        idx: 18,
        note: "C4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#031A6B",
      },
      {
        idx: 19,
        note: "D4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#182288",
      },
      {
        idx: 20,
        note: "E4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#2C29A4",
      },
      {
        idx: 21,
        note: "F4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#5438DC",
      },
      {
        idx: 22,
        note: "G4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#4D4AE1",
      },
      {
        idx: 23,
        note: "A4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#455BE5",
      },
      {
        idx: 24,
        note: "B4",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#357DED",
      },
      {
        idx: 25,
        note: "C5",
        duration: "16n",
        width: 25,
        height: 100,
        color: "#4789EF",
      },
      {
        idx: 26,
        note: "",
        duration: "16n",
        width: 25,
        height: 100,
        color: "black",
      },
    ],
  },
];
