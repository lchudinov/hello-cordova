
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
    const mapButton = document.getElementById('map-button');
    if (!mapButton) {
      alert(`map button not found`);
    } else {
      mapButton.addEventListener('click', () => this.openMap(), false);
    }
    const sampleButton = document.getElementById('sample-button');
    if (!sampleButton) {
      alert(`sample button not found`);
    } else {
      sampleButton.addEventListener('click', () => this.openSampleApp(), false);
    }
    const selfButton = document.getElementById('self-button');
    if (!selfButton) {
      alert(`self button not found`);
    } else {
      selfButton.addEventListener('click', () => this.openSelf(), false);
    }
    window.plugins.intentShim.onIntent(function (intent) {
      console.log('Received Intent: ' + JSON.stringify(intent.extras));
      const extras = intent.extras;
      const dataElement = document.getElementById('data');
      if (extras) {
        dataElement.innerHTML = "Received intent: " + JSON.stringify(extras);
      }
    });
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  geoIntent: { "action": "android.intent.action.VIEW", "url": "geo:0,0?q=London" },

  openMap: function () {
    alert('about to open map');
    window.plugins.intentShim.startActivity(
      {
        "action": "android.intent.action.VIEW",
        "url": "geo:0,0?q=London"
      },
      () => console.log('map opened'),
      () => alert('Failed to open URL via Android Intent')
    );
  },
  openSampleApp: function () {
    window.plugins.intentShim.startActivity(
      {
        "component": {
          "package": "org.zowe.zlux.sample.angular",
          "class": "org.zowe.zlux.sample.angular.MainActivity"
        },
        "extras": {
          "data": {
            "type": "setAppRequest",
            "actionType": "Message",
            "targetMode": "PluginCreate",
            "targetAppId": "",
            "requestText": "{ \"action\": \"android.intent.action.VIEW\", \"url\": \"geo:0,0?q=London\"}"
          }
        }
      },
      () => console.log('sample app opened'),
      (e) => alert('failed to open sample angular app via Android Intent ' + e)
    );
  },
  openSelf: function () {
    alert('about to self');
    window.plugins.intentShim.startActivity(
      {
        component: {
          "package": "io.cordova.hellocordova",
          "class": "io.cordova.hellocordova.MainActivity"
        },
        extras: {
          'hello': 'world'
        }
      },
      () => console.log('sample app opened'),
      (e) => alert('Failed to open sample via Android Intent ' + e)
    );
  }
};

app.initialize();