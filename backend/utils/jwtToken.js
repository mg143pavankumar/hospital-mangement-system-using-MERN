// Creating token and saving in cookie

const sendToken = (user, statusCode, res, msg) => {
  const token = user.getJWTToken();

  // options for cookies
  const options = {
    expires: new Date(new Date().getTime() + 5 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: msg,
    user,
    token,
  });
};

export default sendToken;
