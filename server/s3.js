require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    accessKeyId,
    secretAccessKey,
    region
});

// uploads a file to s3
function uploadFile(file) {
    console.log(file)

    if (file) {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        }
    
        console.log(uploadParams);
    
        return s3.upload(uploadParams).promise();
    }
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
    console.log(fileKey)
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

// deletes a file from s3
function deleteFile(fileKey) {
    console.log(fileKey)
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.deleteObject(deleteParams).promise();
}
exports.deleteFile = deleteFile;