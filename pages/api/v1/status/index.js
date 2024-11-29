function status(request, response) {
  response.status(200).json({
    data: "aqui está uma expressão com o porquê.",
  });
}

export default status;
