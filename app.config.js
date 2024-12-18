// NA AULA
import * as dotenv from 'dotenv'

dotenv.config()

// import * as dotenv from 'react-native-dotenv'

// dotenv.config()

module.exports = {
  "expo": {
    "name": "ignitefleet",
    "slug": "ignitefleet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#202024"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.lubnidev.ignitefleet",
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      },
      "infoPlist": {
        "UIBackgroundModes": ["location"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#202024"
      },
      "package": "com.lubnidev.ignitefleet",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      },
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
