// generic function that will respond with status of error
function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      messsage: error.message || "Something went wrong"
    }
  })
}

module.exports = errorHandler;