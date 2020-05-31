const fs = require('fs');
const util = require('util');
const ff = require('./filenameFormatter');
var parseString = require('xml2js').parseString;

const readFilePromise = util.promisify(fs.readFile);
const parseStringPromise = util.promisify(parseString);

const filename = 'nppSessionFileSample.xml';

readFilePromise(filename, 'utf8')
  .then(parseStringPromise)
  .then((result) => result.NotepadPlus.Session[0].mainView[0].File)
  .then((filelist) =>
    ff.formatfilePaths(
      '/media/UserABCD123/1b343b28-fedd-46bd-bc2c-aa5edbbdab8d/EXTHD/C',
      filelist
    )
  )
  .then((filelist) => {
    ff.copyFiles('/home/d023975/np++', filelist);
  })
  .catch((err) => {
    console.log('Error', err);
  });
