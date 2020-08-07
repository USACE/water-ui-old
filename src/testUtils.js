export const findElementById = (wrapper, val) => {
    return wrapper.find(`#${val}`);
  };
  
  export const findElementByClassName = (wrapper, val) => {
    return wrapper.find(`.${val}`);
  };
  
  export const findByTestAttr = (wrapper, val) => (
    wrapper.find(`[data-test="${val}"]`)
  );
  
  export const findByElementType = (wrapper, elementType) => {
    return wrapper.find(elementType);
  };
  
  export const simulateButtonClick = (wrapper,
    buttonId,
    numberOfClicks = 1) => {
    const button = findByTestAttr(wrapper, buttonId);
    for (let i = 0; i < numberOfClicks; i++) {
      button.simulate("click");
    }
  };