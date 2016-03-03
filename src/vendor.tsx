/// <reference path="../typings/tsd.d.ts" />

var Redux = require('redux');
var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

// material ui
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Colors = require('material-ui/lib/styles/colors');
var SvgIcon = require('material-ui/lib/svg-icon');

var mUi = {
    RaisedButton,
    List,
    ListItem,
    TextField,
    Colors,
    SvgIcon
};

export {
    Redux,
    React,
    ReactDom,
    ReactRouter,
    mUi
};