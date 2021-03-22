import StartUp from "./startUp";

let port = process.env.PORT || "3050";

StartUp.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
