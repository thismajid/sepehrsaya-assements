const response = (req, res, next) => {
  // Function to send a standardized response
  res.sendResponse = (statusCode, data, message = "") => {
    const response = {
      success: true,
      status: statusCode,
      timestamp: new Date().toISOString(),
      data: data,
      message,
    };
    res.status(statusCode).send(response);
  };

  // Function to send a success response
  res.sendSuccess = (data) => {
    res.sendResponse(200, data);
  };

  // Function to send an error response
  res.sendError = (statusCode, data, message = "") => {
    res.sendResponse(statusCode, data, message);
  };

  next();
};

module.exports = response;
