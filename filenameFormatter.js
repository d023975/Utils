const path = require('path');
const fs = require('fs');

function formatfilePaths(prefix, filelist) {
  let fileListLin = filelist.map((element) => {
    let absolutePathWin = element.$.filename;
    let absolutePathLin = absolutePathWin
      .replace(/^[A-Z]:\\/, '/')
      .replace(/\\/g, '/');
    return `${absolutePathWin}`;
  });
  return fileListLin;
}

function copyFiles(targetFolder, fileList) {
  let prefix = targetFolder;
  fileList.forEach((element) => {
    let srcfileName = element;
    let basename = path.basename(srcfileName);
    let destname = prefix+basename;
    console.log('src:  '+ srcfileName);
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
