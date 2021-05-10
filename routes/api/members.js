const express = require('express');
const members = require(`../../members`);


const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  res.json(members);
});

// router.get('/:id', (req, res) => {
//   const found = members.filter((member) => member.id === parseInt(req.params.id));
//   if (found.length > 0) res.json(found);
//   else res.status(400).json({ message: `No member with id ${req.params.id}` });
//   // res.send(req.params.id)
// });

router.post('/add', (req, res) => {
  // console.log(req);
  if (!req.body.name || !req.body.email)
    return res.status(400).json({ message: 'please include name and email'});

  const newMember = {
    id: members.length,
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }
  members.push(newMember);
  // console.log(req.headers['user-agent'].toLocaleLowerCase().includes('chrome'));
  if (req.headers['user-agent'].toLocaleLowerCase().includes('chrome')) return res.redirect('http://localhost:3000/members');
  res.json({ message: 'member has been added successfully'});
});

// Chaining router with same url but different method
router.get('/:id', (req, res) => {
  const found = members.filter((member) => member.id === parseInt(req.params.id));
  if (found.length > 0) res.json(found);
  else res.status(400).json({ message: `No member with id ${req.params.id}` });
  // res.send(req.params.id)
}) // update member
.put('/:id', (req, res) => {
  const index = members.findIndex((member) => member.id === parseInt(req.params.id));
  if (index != -1) {
    members[index] = {
      id: members[index].id,
      name: (req.body.name) ? req.body.name : members[index].name,
      email: (req.body.email) ? req.body.email : members[index].email,
      status: members[index].status,
    };
    return res.json( { message: "member updated", members } );
  }
  res.status(400).json({ message: `No member with id ${req.params.id}` });
}) // de;ete
.delete('/:id', (req, res) => {
  const index = members.findIndex((member) => member.id === parseInt(req.params.id));
  if (index != -1) {
    members.splice(index, 1);
    return res.json({ message: "member deleted", members });
  }
  res.status(400).json({ message: `No member with id ${req.params.id}` });
});

// delete member
// router.delete('/:id', (req, res) => {
//   const index = members.findIndex((member) => member.id === parseInt(req.params.id));
//   if (index != -1) {
//     members.pop(members[index]);
//     return res.json({ message: "member deleted", members });
//   }
//   res.status(400).json({ message: `No member with id ${req.params.id}` });
// });


