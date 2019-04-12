'use strict';
require('dotenv').config();
const request = require('request');

module.exports = {

    urls: {
        login: process.env.ROCKETCHAT_API_URL + 'login',
        post: process.env.ROCKETCHAT_API_URL + 'chat.postMessage',
        rooms: {
            leave: process.env.ROCKETCHAT_API_URL + 'channels.close',
            all: process.env.ROCKETCHAT_API_URL + 'rooms.get'
        }
    },

    login: function(callback){

        request.post({
            url: this.urls.login,
            headers: {
                'Content-type': 'application/json'
            },
            form: {
                user: process.env.ROCKETCHAT_USERNAME,
                password: process.env.ROCKETCHAT_PASSWORD
            }
        }, callback);

    },

    getRooms: function(callback){

        const _parent = this;

        this.login(function(err, res, body){

            const data = JSON.parse(body).data;
            const token = data.authToken;
            const userId = data.userId;

            console.log(_parent.urls.rooms.all);
            request.post({
                url: _parent.urls.rooms.all,
                headers: {
                    'Content-type': 'application/json',
                    'X-Auth-Token': token,
                    'X-User-Id': userId

                }
            }, callback);

        });

    },

    leaveRoom: function(roomId, callback){

        const _parent = this;

        this.login(function(err, res, body){

            const data = JSON.parse(body).data;
            const token = data.authToken;
            const userId = data.userId;

            request.post({
                url: _parent.urls.rooms.leave,
                headers: {
                    'Content-type': 'application/json',
                    'X-Auth-Token': token,
                    'X-User-Id': userId

                },
                form: {
                    roomName: roomId
                }
            }, callback);

        });

    },

    post: function(channel, text){

        const _parent = this;

        this.login(function(err, res, body){

            const data = JSON.parse(body).data;
            const token = data.authToken;
            const userId = data.userId;

            request.post({
                url: _parent.urls.post,
                headers: {
                    'Content-type': 'application/json',
                    'X-Auth-Token': token,
                    'X-User-Id': userId

                },
                form: {
                    channel: channel,
                    text: text
                }
            }, function(er, re, bo){
                console.log('Rocketchat Post response:');
                console.log({er, re, bo});
            });

        });

    }

};