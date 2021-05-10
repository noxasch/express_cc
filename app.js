const express = require('express');
const handlebar = require('express-handlebars');
const path = require('path');
// const members = require('./members');
// const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// set middleware
// app.use(logger);

// handlebars middleware
app.engine('.hbs', handlebar({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// set request body parser middleware
app.use(express.json()); // to process raw json
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/api/members', require('./routes/api/members'));
app.use('/members', require('./routes/members'));



// return a json
// app.get('/api/members', (req, res) => {
//   res.json(members);
// });

// app.get('/api/members/:id', (req, res) => {
//   const found = members.filter((member) => member.id === parseInt(req.params.id))
//   if (found.length > 0) res.json(found);
//   else res.status(400).json({ message: `No member with id ${req.params.id}`});
//   // res.send(req.params.id)
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
