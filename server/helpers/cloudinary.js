const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dtnblvact',
    api_key: '841431862868595',
    api_secret: '_MMjjS5NEubdkyAkixicaoRWwV4',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}