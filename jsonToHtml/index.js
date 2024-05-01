const jsonData = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

const jsonToHtml = (jsonData) => {
  const fragment = document.createDocumentFragment();
  // console.log('inside func')
  if (Array.isArray(jsonData)) {
    for (let key of jsonData) {
      // create dom element
      const element = document.createElement(key.type);
      // set dom attributes
      if (key.props) {
        for (let attr in key.props) {
          element.setAttribute(attr, key.props[attr]);
        }
      }
      // check for children
      if (Array.isArray(key.children)) {
        // recursively convert the children to dom and assign them
        for (let child of key.children) {
          // recursive call and attaching to present dom element
          element.appendChild(jsonToHtml(child));
        }
      } else {
        element.innerText = key.children;
      }
      fragment.appendChild(element);
    }
  } else {
    return jsonToHtml([jsonData]);
  }
  return fragment;
};
console.log(jsonToHtml(jsonData)); // the html will be visible in the console
