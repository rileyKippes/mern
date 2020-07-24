'use strict'

var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017';
