const components = {} as any;
const requireTemplate = require.context(".?vue-template", false, /\.svg$/);
requireTemplate.keys().forEach((fileName) => {
  const name = "Svg" + fileName.replace(/^\.\//, "").replace(/\.svg$/, "");
  const withRender = requireTemplate(fileName);
  components[name] = withRender({});
});
export { components };
