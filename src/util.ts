export const enumToOptions = (e: Object) =>
  Object.entries(e).map(([value, label]) => ({ value, label }))
