const app = require('../../src/app');

let server;

exports.startServer = async () => {
  return new Promise((resolve) => {
    server = app.listen(3000, () => {
      const { port } = server.address();
      console.log(`server is running at http://localhost:${port}`);
      resolve();
    });
  });
};

exports.closeServer = async () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server closed');
      resolve();
    });
  });
};
