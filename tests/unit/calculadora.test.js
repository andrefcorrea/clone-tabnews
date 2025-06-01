const calculadora = require("../../models/calculadora.js");

test("somar 2 +2", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("100+5", () => {
  const resultado = calculadora.somar(100, 5);
  expect(resultado).toBe(105);
});
test("somar banana", () => {
  const resultado = calculadora.somar("Banana", 5);
  expect(resultado).toBe("Erro");
});
