(function () {

  'use strict';

  var app = angular.module('main' );

  app.controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = [ '$scope', 'pushSrvc', '$http' ];

  function mainCtrl( $scope, pushSrvc, $http ) {

    var vm = angular.extend(this, { });

    vm.MESSAGE_TIMEOUT_SECONDS = 10;

    vm.pushConnected = false;

    vm.inbound = {
      data: { },
      rendered: "No messages yet."
    };

    vm.subscriptionFeedback = "";

    vm.initialise = function initialise() {

      vm.inbound.rendered = "No registrationId yet...";

      pushSrvc.initialisePush( function deviceNowConnected( data ){
        console.log("Controller initialised push, got payload ",data );

        vm.inbound.rendered = "Got connected payload";

        if (data.hasOwnProperty('registrationId')===true) {

          vm.registrationId = data.registrationId;
          vm.pushConnected = true;

          pushSrvc.setCallback( vm.handleInbound );
          pushSrvc.setTimeout( vm.MESSAGE_TIMEOUT_SECONDS * 1000 );

        }

      });

    };

    vm.incidents=function(domain, uuid)
    {
      
      var jsonpayload={
        date:Math.floor(new Date().getTime() / 1000), 
        sticker:uuid
      };
      //Use $http service to send get request to API and execute different functions depending on whether it is successful or not

      var endpoint = "https://" + domain; 

      $http.post(endpoint + '/incidents/', jsonpayload).then(
          function success(response) 
          {
              vm.responses = response.data;
              console.info(response);
          },
          function failure(err) 
          {
              console.error(err);
          }
      )
        
    } ;

    vm.startCodeScan = function startCodeScan() {
      console.log("Starting a QR code scan");
      cordova.plugins.barcodeScanner.scan(
        function(qrResult) { // .text .format .cancelled
          console.log("Scanned",qrResult.text);
          if(qrResult.cancelled===true) {
            console.log("Aborted scan!");
            return;
          } else {
            if(qrResult.format==="QR_CODE") {
                var content = qrResult.text;
                var url = new URL(content);
                var uuid = url.searchParams.get('uuid');
                var push = url.searchParams.get('push');
                var park = url.searchParams.get('park');
                vm.uuid = uuid;
                vm.incidents(park, uuid);
                pushSrvc.setServerRoot(push);
                pushSrvc.subscribe(uuid );
                vm.subscriptionFeedback = "Subscribed!";
                $scope.$apply();
            }
          }
        },
        function(error) {
          console.error("Error scanning",error);
        },
        {
          showTorchButton: true,
          saveHistory: false,
          prompt: "Scan the QR Code"
        }
      );
    };

    vm.handleInbound = function handleInbound( data ) {
      console.log("Got inbound message", data);
      console.log("payload", JSON.parse(data.payload.message));
      alert("message received");
    };

    vm.initialise();

  }
})();
