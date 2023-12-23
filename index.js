const express = require('express'),
   app = express(),
   morgan = require('morgan');

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

//GET Requests
app.get('/', (req, res) => {
    res.send('Check Out My Top Movies!');
  });

  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
