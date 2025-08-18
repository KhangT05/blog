const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    }
});
const uploadCloud = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});
module.exports = uploadCloud;