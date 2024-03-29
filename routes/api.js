/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();
  
  //Index page (static HTML)
  app.route('/')
    .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      console.log(input)
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      var obj = {initNum, initUnit, returnNum, returnUnit, string};
    
      if(initNum == 'invalid number' && initUnit == 'invalid unit') {
        res.send('invalid number and unit')
      } else if(initNum == 'invalid number') {
        res.send('invalid number')
      } else if(initUnit == 'invalid unit') {
        res.send('invalid unit')
      } else {
        res.json(obj)
      }
      
    });
    
};
