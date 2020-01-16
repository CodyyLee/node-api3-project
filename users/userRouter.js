const express = require('express');

const router = express.Router();

const users = require("./userDb.js");
const posts = require("../posts/postDb.js");

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const body = req.body;

  users.insert(body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "There was an error saving the user to the database."
          })
        })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  posts.insert(req.params.id, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "There was an error creating this post."
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An error occured while trying to get all users."
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  users.getById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(404).json({
        errorMessage: "An error occured while trying to find this user."
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "There was an error finding this post."
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  users.remove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An error occured while trying to delete this user."
      })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error trying to update this user."
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  users.getById(id)
    .then(user => {
      if(Object.keys(user).length !== 0) {
        next();
      }
      else {
        res.status(404).json({
          errorMessage: "A user with this ID could not be found."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An error occured trying to find this user."
      })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length !== 0) {
    if(Object.keys(req.body).includes("name")) {
      next();
    }
    else {
      res.status(400).json({
        errorMessage: "The required Name field is missing."
      })
    }
  }
  else {
    res.status(400).json({
      errorMessage: "Missing user information."
    })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if(Object.keys(body).length !== 0 && Object.keys(body).includes("text")) {
    next();
  }
  else {
    res.status(400).json({
      errorMessage: "Missing post data."
    })
  }
}

module.exports = router;
