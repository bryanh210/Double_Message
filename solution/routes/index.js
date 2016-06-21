var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Contact = models.Contact;

/* GET home page. */
router.get('/contacts', function(req, res, next) {
  // Load all contacts (that this user has permission to view).
  Contact.find(function(err, contacts) {
    if (err) return next(err);
    res.render('contacts', {
      contacts: contacts 
    });
  });
});

router.get('/contacts/new', function(req, res, next) {
  res.render('editContact');
});

router.get('/contacts/:id', function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if(err) return next(err);
    res.render('editContact', {
      contact: contact
    });
  });
});

router.post('/contacts/new', function(req, res, next) {
  var contact = new Contact({
    name: req.body.name,
    phone: req.body.phone
  });
  contact.save(function(err) {
    if(err) return next(err);
    res.redirect('/contacts');
  })
});

router.post('/contacts/:id', function(req, res, next) {
  Contact.findById(req.params.id, function(err, contact) {
    if(err) return next(err);
    contact.name = req.body.name;
    contact.phone = req.body.phone;
    contact.save(function(err) {
      if(err) return next(err);
      res.redirect('/contacts');
    });
  });
});

module.exports = router;
