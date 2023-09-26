const express = require('express');
const app = express();
const port = 3000;
const db = require('./models/index')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync().then((res) => {

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  
})

app.get('/', (req,res) => {
    res.send('hello');
})

app.post('/users', async (req, res) => {

    console.log(req.body)
    try {
  
      const g = await db.User.create({
        name: req.body.name,
        email: req.body.email,  
      });
  
      if (g) res.send('User added');
      else res.send('error')
  
    } catch (error) {
      res.json(error);
    }
  
  });

  app.get('/users/:id', async (req, res) => {

    try {
  
      let user = await db.User.findOne({
        where: {id: req.params.id},
        include: [{model: db.Comment}]
      })
  
      if (user) res.send(user);
      else res.send('User note found');

    } catch (error) {
      res.json(error);
    }
  
  });

  app.get('/users', async (req, res) => {

    try {
  
      let users = await db.User.findAll();
  
      if (!users) {
        res.send('User note found')
      }
  
      res.send(users);
  
    } catch (error) {
      res.json(error);
    }
  
  });

  app.put('/users/:id', async (req, res) => {

    try {
  
      const user = await db.User.findByPk(req.params.id);
  
      if (!user) {
  
        res.send('User note found');
      } else {
  
        await user.update({
  
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          city: req.body.city,
          phone: req.body.phone,
        });
  
        res.send('User Updated');
  
      }
    } catch (error) {
      res.json(error);
    }
  
  });

  app.delete('/users/:id', async (req, res) => {
    try {
  
      const user = await db.User.findByPk(req.params.id);
  
      if (!user) {
  
        res.send('User note found');
      } else {
  
        await user.destroy();
  
        res.send('User Deleted');
  
      }
    } catch (error) {
      res.json(error);
    }
  });

app.post('/posts', async (req, res) => {
  const { userId, text } = req.body;

  try{
    const user = await db.User.findByPk(userId);
    // console.log(user)

    const post = await db.Comment.create({userId: user.id, text});
    // console.log(post)


    return res.json(post)
  }catch(err){
    return res.status(404).json(err);
  }
})