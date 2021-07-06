const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');


const srcFolder = path.join(__dirname, 'src');

const log = function (...args) {
  console.log(chalk.green(...args));
};

function isMarkdown(file) {
  return /\.md$/.test(file);
}

function hasAnnotation(file) {
  const buffer = fs.readFileSync(file);
  return /@styleguide/g.test(buffer.toString());
}

const componentsWithMD = [];
const componentsWithAnnotation = [];

function findComponentsWithMD(folder, map) {
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (isMarkdown(filePath)) {
        const jsxFile = filePath.replace('.md', '.jsx');
        if (fs.existsSync(jsxFile)) {
          componentsWithMD.push(jsxFile);
          if (hasAnnotation(jsxFile)) {
            componentsWithAnnotation.push(jsxFile);
          }
        }
      }
    } else {
      findComponentsWithMD(filePath, map);
    }
  });
}

findComponentsWithMD(srcFolder);

const components = componentsWithAnnotation.length ? componentsWithAnnotation : componentsWithMD;

log('Components', `\n${components.join('\n')}`);

module.exports = {
  components,
  serverHost: 'localhost.bb.com.br',
  styleguideDir: 'public',
  title: 'Style Guide',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/client/components/styleguide/Wrapper'),
  },
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.s?css$/,
          include: /(node_modules\/src|react-datepicker|fullcalendar)/,
          loaders: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader?precision=10'],
        },
      ],
    },
    plugins: [
      new OpenBrowserPlugin({ url: 'http://localhost.bb.com.br:6060' }),
    ],
  },
};

