export const workAround = (props: any) => {
  const newObj = Object.assign({}, props);
  newObj.fill = newObj['style']['tintColor'];
  delete newObj.style.tintColor;
  return newObj;
};
