// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: "devLocal",
  HOST: "http://localhost:4200/",
  config: {
    app_name: "Lot management",
    base_url: "http://localhost:4200/",
    api_url: "http://localhost:4584/",
  }
};


// export const environment = {
//   production: false,
//   envName: "devLocal",
//   HOST: "http://54.71.18.74:4200/",
//   config: {
//     app_name: "Lot management",
//     base_url: "http://54.71.18.74:4200/",
//     api_url: "http://54.71.18.74:4584/",
//   }
// };


// export const environment = {
//   production: false,
//   envName: "devLocal",
//   HOST: "https://demo.com/",
//   config: {
//     app_name: "Lot management",
//     base_url: "https://demo.com/",
//     api_url: "https://api.demo.com/",
//   }
// };



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
