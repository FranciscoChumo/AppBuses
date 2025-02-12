// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:3000/api', // URL base de tu API
  firebaseConfig : {
    apiKey: "AIzaSyAxiXVyZoX8eboP8z-iLEQdDMbQjy3kXDk",
    authDomain: "appp-e5f97.firebaseapp.com",
    projectId: "appp-e5f97",
    storageBucket: "appp-e5f97.firebasestorage.app",
    messagingSenderId: "137874583025",
    appId: "1:137874583025:web:f4d743ce429614aac96850"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
