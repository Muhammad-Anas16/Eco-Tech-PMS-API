const resFunc = (
  res,
  status = 200,
  success = true,
  message = "",
  data = null,
) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};

export default resFunc;
