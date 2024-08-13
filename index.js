const { camelCase, snakeCase } = require("es-toolkit");

function main() {
  console.log(camelCase("Our crazy big home project"));
  console.log(snakeCase("Our crazy big feature update"));
}

main();
