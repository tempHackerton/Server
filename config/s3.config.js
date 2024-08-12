import multer from "multer";
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import dotenv from "dotenv";
import path from 'path';
import jwt from 'jsonwebtoken';

AWS.config.update({
    accessKeyId: process.env.S3_KEYID,  // keyID 입력 
    secretAccessKey: process.env.S3_PRIVATE_KEY, // 시크릿 키 입력
    region: process.env.REGION, // 버킷 생성 리전 입력
})

const s3= new AWS.S3()

const allowedExtensions = ['.png','jpg','.jpeg','.bmp']



export const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket : process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            const userId=req.userId 
            const videoId=req.query.videoId ?? ''
            const extension = path.extname(file.originalname)
            cb(null,`user/${userId}/videos/${videoId}/_${videoId+'.'+file.originalname.split('.').pop()}`);// 객체의 키로 고유한 식별자 이기 때문에 겹치면 안됨
          },
        acl: 'public-read-write'
    })

})



  
  