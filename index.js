const express = require('express'),
   app = express(),
   bodyParser = require('body-parser');

const morgan = require('morgan');

let movies = [
    {
      title: 'Everything Everywhere All At Once',
      author: 'The Daniels'
    },
    {
      title: 'Sorry to Bother You',
      author: 'Boots Riley'
    },
    {
      title: 'Nacho Libre',
      author: 'Jared Hess'
    },
    {
      title: 'Spirited Away',
      author: 'Hayao Miyazaki'
    },
    {
      title: 'SpongeBob Squarepants Movie',
      author: 'Stephen Hillenburg'
    },
    {
      title: 'Shrek 2',
      author: 'Jesus'
    },
    {
      title: 'Tenacious D',
      author: 'Liam Lynch'
    },
    {
      title: 'Mask',
      author: 'Charles Russel'
    },
    {
      title: 'Coraline',
      author: 'Henry Selick'
    },
    {
      title: 'Fear and Loathing in Las Vegas',
      author: 'Terry Gilliam'
    },
  ];

  app.use(express.static('public'));
  app.use(morgan('common'));
  app.use(bodyParser.json());
 
//UPDATE
app.put('/users/:id', (req, res) =>{
  const { id } = req.params;
  const updatedUser = req.body;
  
  let user = users.find(user => user.id == id );

  if (user){
    user.name = updatedUser.name;
    res.status(200).json(user);
  }else{
    res.status(400).send('No such user')
  }
})

//CREATE
app.post('/users', (req, res) =>{
  const newUser = req.body;

  if(newUser.name){
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }else{
    res.status(400).send('users need names')
  }
})

//CREATE 
app.post('/users/:id/:movieTitle', (req, res) =>{
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id );

  if (user){
    user.favoriteMovies.push(movieTitle);
    res.status(200).send('${movieTitle} has been added to user ${id}s array')
  }else{
    res.status(400).send('No such user')
  }
})

//DELETE 
app.delete('/users/:id/:movieTitle', (req, res) =>{
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id );

  if (user){
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle)
    res.status(200).send('${movieTitle} has been removed from user ${id}s array')
  }else{
    res.status(400).send('No such user')
  }
})

//DELETE 
app.delete('/users/:id', (req, res) =>{
  const { id } = req.params;

  let user = users.find(user => user.id == id );

  if (user){
    users= users.filter(user => user.id != id);
    res.status(200).send('user ${id} has been deleted');
  }else{
    res.status(400).send('No such user');
  }
})



//READ
app.get('/', (req, res) => {
    res.send('Check Out My Top Movies!');
  });

  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies', (req, res) => {//routes request for movies list
    res.status(201).json(movies);//format sent back 
  });


//READ
  app.get('/movies/:title' , (req, res) =>{//route for movie data by name 
    const {title} = req.params;
    const movie  = movies.find(movie => movie.Title === title);

    if(movie){
      res.status(200).json(movie);
    }else{
      res.status(400).send('No such movie');
    }

  });

//READ
app.get('/movies/genre/:genreName' , (req, res) =>{//route for genre by name 
  const {genreName} = req.params;
  const genre  = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if(genre){
    res.status(200).json(genre);
  }else{
    res.status(400).send('No such genre');
  }

});

//READ
app.get('/movies/directors/:directorName' , (req, res) =>{//route for directors by name 
  const {directorName} = req.params;
  const director  = movies.find(movie => movie.Director.Name === directorName).Director;

  if(director){
    res.status(200).json(director);
  }else{
    res.status(400).send('No such director');
  }

});


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
