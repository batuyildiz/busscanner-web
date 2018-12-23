const express = require('express');
const path = require('path');

export default class WebServer {
  constructor() {
    this.app = express();
    this.app.use(express.static('dist/public'));
    this.app.get('*', function (request, response) {
      response.sendFile(path.resolve('./dist/public/index.html'));
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(3000, function () {
          resolve();
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve();
        });
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }
}
