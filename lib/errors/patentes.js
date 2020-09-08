const expoRegex1 = /^.*(<.+>|\^|¬|~)+.*$/;
const expoRegex2 = /^(x[0-9]|l-[0-9])+$/;
const expoRegex3 = /^.*cm(-|[0-9])+.*$/;
const celsiusDegreeRegex = /^.*(0|O|o)+(C|c)+(,|\.|\))*$/;

const matchExponetialErrors = (summaryWords) =>
  summaryWords.some(
    (s) => s.match(expoRegex1) || s.match(expoRegex2) || s.match(expoRegex3)
  );

const matchCelsiusDegreeErrors = (summaryWords) =>
  summaryWords.some((s) => s.match(celsiusDegreeRegex));

export const findErrors = (objects) => {
  const errors = [];

  objects.forEach((object, index) => {
    const lineErrors = [];
    const summaryWords = object.sumary.split(" ");

    if (matchExponetialErrors(summaryWords))
      lineErrors.push(
        "Formatação de expressões com possíveis índices/expoentes ou caracteres estranhos"
      );

    if (matchCelsiusDegreeErrors(summaryWords))
      lineErrors.push("Formatação de temperaturas em celsius");

    if (lineErrors.length > 0) {
      errors.push({
        id: object.name,
        line: index + 2,
        errors: lineErrors,
      });
    }
  });

  console.log("Erros aí: ", errors);
  return errors;
};

// ABAIXO TEMOS ALGUNS DOS POSSÍVEIS ERROS DE FORMATAÇÃO

// const possibleErrors = [
//   "caXnca",
//   "(r2)(r3)(r4)(r5)n+x-",
//   "1-(r2)-2-(r3)-3-(r4)imidazólio+x-",
//   "etOH",
//   "4<198>c",
//   "EC2Osp",
//   "pHE<225>",
//   "<109>",
//   "Fe3O4",
//   "cm-1",
//   "2000C",
//   "10¬ 5¬",
//   "CO~ 2~",
//   "^ 60^",
//   "<198> c",
//   "<198>c.",
//   "(^ 99m^tc).",
//   "Ch4",
//   "Nh3",
//   "C2H4",
//   "Co2",
//   "ócu1.o-palpebral con're1~mo",
//   "cxmm›1nm1",
//   "0,3 mmol l-1",
//   "[RuCl2(DCBz)(Me2SO)2]",
//   "[M(NO2)(X)nZ]S",
//   "[uo2(ac-ophen)]h2o",
//   "[M(L)(PR~ 3~)(O)n(X)P]",
//   "[M(O)n(L) (HL)Q(RO(H)m)r]",
//   "( o , o 1 -1 o% )",
//   "x105",
//   "700C",
//   "(5FCCAF e 5FCPABA)",
//   "0c",
//   "300oC",
//   "CuO, ZnO, TiO2, NiO, SiO2,",
//   "alfa-Ni(OH)2",
//   "cm3",
//   "(2-metoxi-4-[(2r,3r)-7-metoxi-3-metil-5-[(e)-prop-1-enil]-2,3-dihidro-1-benzofurano-2-il]fenol)",
//   "pT7BsXA",
//   "5,0mw.cm^-2^",
//   "20,0ma.cm^-2^",
//   "3,0 mol l-1",
//   "tr<225>1",
// ];
