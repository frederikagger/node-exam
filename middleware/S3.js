const aws = require("aws-sdk");
const uuid = require("uuid");

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});


//todo: refactor to middleware 
const upload = async (image) => {
  const name = uuid.v4() + '.jpeg';
  await s3.putObject({
    Key: name,
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: 'image/jpeg',
    Body: image,
    ACL: 'public-read'
  }).promise();
  return name;
}

module.exports = upload;
