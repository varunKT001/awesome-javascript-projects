import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const ignored = ['build', 'scripts', '.git', 'node_modules', '.github'];

(async function main() {
  try {
    const direntList = fs.readdirSync(path.resolve('./projects'), {
      withFileTypes: true,
    });

    const projectList = direntList.filter((dirent) => {
      if (dirent.isDirectory() && !ignored.includes(dirent.name)) return true;
      return false;
    });

    const templatePath = path.resolve(__dirname, 'templates', 'template.ejs');

    const template = fs.readFileSync(templatePath);
    const output = ejs.render(template.toString(), { projectList });

    fs.writeFileSync('./README.md', output);
  } catch (error) {
    console.log(error);
  }
})();
