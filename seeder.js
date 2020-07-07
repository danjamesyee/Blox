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
  ]);

  // Clear specified collections
  seeder.clearModels(["User", "Block", "Track"], () => {
    // Callback to poplulate DB once models are cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

// bcrypt demo user password
const salt = bcrypt.genSaltSync(10);
<<<<<<< HEAD
const hash = bcrypt.hashSync('password', salt);
=======
const hash = bcrypt.hashSync("password", salt);
>>>>>>> b59b65ab84d1edab2a5ef0e9f3f2b9c75335549e

// Populate demo user and block templates
const data = [
  {
    model: "User",
    documents: [
      {
        handle: "demouser",
        email: "demouser@gmail.com",
<<<<<<< HEAD
        password: hash
      }
=======
        password: hash,
      },
>>>>>>> b59b65ab84d1edab2a5ef0e9f3f2b9c75335549e
    ],
  },
  {
    model: "Block",
    documents: [
      {
        note: "C4",
<<<<<<< HEAD
        duration: "4n"
      },
      {
        note: "D4",
        duration: "4n"
      },
      {
        note: "E4",
        duration: "4n"
      },
      {
        note: "F4",
        duration: "4n"
      },
      {
        note: "G4",
        duration: "4n"
      },
      {
        note: "A4",
        duration: "4n"
      },
      {
        note: "B4",
        duration: "4n"
      },
      {
        note: "C5",
        duration: "4n"
      },
      {
        note: "C4",
        duration: "8n"
      },
      {
        note: "D4",
        duration: "8n"
      },
      {
        note: "E4",
        duration: "8n"
      },
      {
        note: "F4",
        duration: "8n"
      },
      {
        note: "G4",
        duration: "8n"
      },
      {
        note: "A4",
        duration: "8n"
      },
      {
        note: "B4",
        duration: "8n"
      },
      {
        note: "C5",
        duration: "8n"
      },
      {
        note: "C4",
        duration: "16n"
      },
      {
        note: "D4",
        duration: "16n"
      },
      {
        note: "E4",
        duration: "16n"
      },
      {
        note: "F4",
        duration: "16n"
      },
      {
        note: "G4",
        duration: "16n"
      },
      {
        note: "A4",
        duration: "16n"
      },
      {
        note: "B4",
        duration: "16n"
      },
      {
        note: "C5",
        duration: "16n"
      }
    ],
  },
];
=======
        duration: "4n",
      },
      {
        note: "D4",
        duration: "4n",
      },
      {
        note: "E4",
        duration: "4n",
      },
      {
        note: "F4",
        duration: "4n",
      },
      {
        note: "G4",
        duration: "4n",
      },
      {
        note: "A4",
        duration: "4n",
      },
      {
        note: "B4",
        duration: "4n",
      },
      {
        note: "C5",
        duration: "4n",
      },
      {
        note: "C4",
        duration: "8n",
      },
      {
        note: "D4",
        duration: "8n",
      },
      {
        note: "E4",
        duration: "8n",
      },
      {
        note: "F4",
        duration: "8n",
      },
      {
        note: "G4",
        duration: "8n",
      },
      {
        note: "A4",
        duration: "8n",
      },
      {
        note: "B4",
        duration: "8n",
      },
      {
        note: "C5",
        duration: "8n",
      },
      {
        note: "C4",
        duration: "16n",
      },
      {
        note: "D4",
        duration: "16n",
      },
      {
        note: "E4",
        duration: "16n",
      },
      {
        note: "F4",
        duration: "16n",
      },
      {
        note: "G4",
        duration: "16n",
      },
      {
        note: "A4",
        duration: "16n",
      },
      {
        note: "B4",
        duration: "16n",
      },
      {
        note: "C5",
        duration: "16n",
      },
    ],
  },
];
>>>>>>> b59b65ab84d1edab2a5ef0e9f3f2b9c75335549e
