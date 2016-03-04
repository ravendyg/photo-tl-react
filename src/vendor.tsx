/// <reference path="../typings/tsd.d.ts" />

const Redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const ReactRouter = require('react-router');

// material ui
const TextField = require('material-ui/lib/text-field');
const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');
const Colors = require('material-ui/lib/styles/colors');
const SvgIcon = require('material-ui/lib/svg-icon');

const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');

const Toggle = require('material-ui/lib/toggle');


const Modal = require('react-modal');

var mUi = {
    FlatButton,
    RaisedButton,
    List,
    ListItem,
    TextField,
    Colors,
    SvgIcon,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    Modal,
    Toggle
};

export {
    Redux,
    React,
    ReactDom,
    ReactRouter,
    mUi
};