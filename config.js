const version = process.env.npm_package_version.split(".").shift()
const restApiRoot = "/api" + (version > 0 ? "/v" + version : "")

module.exports = {
	host: "localhost",
	apiPort: "3000",
	restApiRoot: restApiRoot
}