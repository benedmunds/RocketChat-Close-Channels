'use strict';
require('dotenv').config();

const chat = require('./lib/rocketchat.js');

const unusedRooms = process.env.UNUSED_ROOMS.split(',');

unusedRooms.forEach(function(room){

    chat.leaveRoom(room, function(){
        console.log(`Left ${room}`);
    });

});