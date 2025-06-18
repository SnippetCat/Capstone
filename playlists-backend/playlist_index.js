const app = require("./app");
const config = require("./utils/config.js");

const port = config.port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});