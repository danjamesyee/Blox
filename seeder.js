const seeder = require('mongoose-seed');
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
seeder.connect(db, () => {

  // Load Mongoose models
  seeder.loadModels([
    './models/User.js',
    './models/Block.js',
    './models/Track.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['User', 'Block', 'Track'], () => {

    // Callback to poplulate DB once models are cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

// Populate demo user and block templates
const data = [
  {
    model: "User",
    documents: [
      {
        handle: "demouser",
        email: "demouser@gmail.com",
        password: "password",
      },
    ],
  },
  {
    model: "Block",
    documents: [
      {
        note: "C4",
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