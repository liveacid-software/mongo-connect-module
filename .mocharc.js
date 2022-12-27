require('dotenv').config({ silent: true })

module.exports = {
  recursive: true,
  spec: './test/*.test.ts',
  require: "ts-node/register",
  extension: ["ts"],
  timeout: 200000
}
