const multer = require('multer');
const path = require('path');

// Upload 
const storage = multer.diskStorage({
    destination:'asstes/userProfile',
    filename:(req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});
const uploadProfile = multer({storage:storage});

module.exports = uploadProfile;