export function imageFilter (req, file: Express.Multer.File, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = true;
        cb(null, false);
    }

    cb(null, true);
}