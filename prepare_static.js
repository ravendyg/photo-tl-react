const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

if (!fs.existsSync(path.join(__dirname, 'build'))) {
    fs.mkdirSync(path.join(__dirname, 'build'));
}
fs.writeFileSync('./build/index.html', fs.readFileSync('./index.html', { encoding: 'utf8' }));

execSync('cp -r ./assets ./build');
