const path = require('path');
const fs = require('fs');

function formatfilePaths(prefix, filelist) {
  let fileListLin = filelist.map((element) => {
    let absolutePathWin = element.$.filename;
    let absolutePathLin = absolutePathWin
      .replace(/^[A-Z]:\\/, '/')
      .replace(/\\/g, '/');
    return `/media/d023975/1b343b28-fedd-46bd-bc2c-aa5edbbdab8d/EXTHD/C${absolutePathLin}`;
  });
  return fileListLin;
}

function copyFiles(targetFolder, fileList) {
  let prefix = `${targetFolder}/`;
  fileList.forEach((element) => {
    let srcfileName = element;
    console.log(srcfileName);
    let basename = path.basename(srcfileName);
    let destname = `${prefix}${basename}`;
    console.log(destname);
    copyFile(srcfileName, destname);
  });
}

module.exports = {
  formatfilePaths,
  copyFiles,
};

function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  return new Promise(function (resolve, reject) {
    rd.on('error', reject);
    wr.on('error', reject);
    wr.on('finish', resolve);
    rd.pipe(wr);
  }).catch(function (error) {
    rd.destroy();
    wr.end();
    throw error;
  });
}
