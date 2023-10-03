import arErrors from "./errors/ar.json";
export const errorsMapper = (errorName) => {
  const isArray = Array.isArray(errorName);
  if (isArray) {
    return errorName.map((err) => `- ${arErrors[err] ?? err}`);
  } else {
    return arErrors[errorName] ?? errorName;
  }
};
