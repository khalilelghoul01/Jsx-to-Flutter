const element = require('./classes/Text');
const { componentToWidget } = require('./core/widget');
const fs = require('fs');

const configFile = './transpiler.config.json';
const config = fs.existsSync(configFile) && require(configFile);
const { folder, dist } = config;
(config.folder && fs.existsSync(config.folder)) ||
  fs.mkdirSync(config.folder, { recursive: true });
(config.dist && fs.existsSync(config.dist)) || fs.mkdirSync(config.dist);

componentToWidget(
  fs.readFileSync((folder && folder + 'home.jsx') ?? 'src/home.jsx', 'utf-8'),
  (dist && dist + 'home') ?? 'src/home'
);
