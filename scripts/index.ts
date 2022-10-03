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

    const readmePath = path.resolve(__dirname, 'templates', 'readme.ejs');
    const htmlPath = path.resolve(__dirname, 'templates', 'html.ejs');

    const readme = fs.readFileSync(readmePath);
    const html = fs.readFileSync(htmlPath);

    const readmeOutput = ejs.render(readme.toString(), { projectList });
    const htmlOutput = ejs.render(html.toString(), { projectList });

    fs.writeFileSync('./README.md', readmeOutput);
    fs.writeFileSync('./index.html', htmlOutput);
  } catch (error) {
    console.log(error);
  }
})();
