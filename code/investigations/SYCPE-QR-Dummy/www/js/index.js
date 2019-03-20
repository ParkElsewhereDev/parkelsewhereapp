/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
    document.getElementById('regenerate').addEventListener('click', this.handleRegenerateEvent);
    this.handleRegenerateEvent();
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  // make a new QR code
  handleRegenerateEvent: function handleRegenerateEvent() {
    var uuid = app.makeUUID();
    cordova.plugins.qrcodejs.encode( cordova.plugins.qrcodejs.Encode.TEXT_TYPE,
                                     uuid,
                                     function encodeSuccess(success){
                                       console.log("success",success);
                                       document.getElementById('qrcode').src=success;
                                       document.getElementById('uuid').innerHTML = uuid;
                                     },
                                     function encodeFailure(error){
                                       console.log("error", error);
                                     }
                                   );
  },

  makeUUID: function makeUUID() {
    // thanks to https://gist.github.com/jed/982883
    // there is also a proper Cordova/Angular module for this which, whilst more locquacious, is probabl a better idea long-term.
    return(""+1e7+-1e3+-4e3+-8e3+-1e11).replace(/1|0/g,function(){return(0|Math.random()*16).toString(16)});
  }
};

app.initialize();
