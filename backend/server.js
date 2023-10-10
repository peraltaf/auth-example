const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('./models/users');
const SECRET_KEY = 'example_key';

require('dotenv').config();

/*** INSTANTIATE SERVER APP ***/
const PORT = 3001
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = new Users({ email, username, password: hashedPw });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) { 
    console.log(`The following error occured: ${error}`);
    res.status(500).json({ error });
  }
});

app.get('/register', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(201).json(users)
  } catch (error) { 
    console.log(`The following error occured: ${error}`);
    res.status(500).json({ error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) return res.status(401).json({ error: 'User not found' });

    const isValidPw = await bcrypt.compare(password, user.password);

    if (!isValidPw) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
    res.json({ message: 'Login successful', token });
  } catch (error) { 
    console.log(`The following error occured: ${error}`);
    res.status(500).json({ error });
  }
});

/*** CONNECT TO MONGODB ***/
const MONGO_USER = process.env.MONGODB_USER;
const MONGO_PW = process.env.MONGODB_PW;
const MONGO_CLUSTER = process.env.MONGODB_CLUSTER;
const MONGO_DB = process.env.MONGODB_DB;
const mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGODB_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=AtlasApp`;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Unable to connect to server or MongoDB with error: ${error}`);
  });