/// <reference path="../typings/tsd.d.ts" />

const Redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const ReactRouter = require('react-router');

const aja = require('aja');

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
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');

const Popover = require('material-ui/lib/popover/popover');

const Toggle = require('material-ui/lib/toggle');

var io = require('./../node_modules/socket.io-client');

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
    Toggle,
    DropDownMenu,
    MenuItem,
    Popover
};

export {
    Redux,
    React,
    ReactDom,
    ReactRouter,
    mUi,
    aja,
    io
};