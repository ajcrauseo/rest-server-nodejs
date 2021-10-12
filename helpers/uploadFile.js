const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  availableExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  folder = '',
) => {
  return new Promise((res, rej) => {
    const { file } = files;

    // Extraer extension
    const nameSplit = file.name.split('.');
    const extension = nameSplit[nameSplit.length - 1];

    // Validar extension
    if (!availableExtensions.includes(extension)) {
      return rej(
        `Extension ${extension} invalid. It must be one of these: ${availableExtensions}`,
      );
    }

    // Renombrar archivo con identificador unico
    const tempName = `${uuidv4()}.${extension}`;
    // Crear el path para los uploads
    const uploadPath = path.join(
      `${__dirname}/../uploads/${folder ? folder + '/' : ''}${tempName}`,
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        rej(err);
      }

      res(uploadPath);
    });
  });
};

module.exports = {
  uploadFile,
};
