import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const filename = url.searchParams.get("filename");
    if (!filename) return new Response("Missing filename", { status: 400 });

    const client = new S3Client({
      region: "auto",
      endpoint: env.R2_ENDPOINT,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY,
        secretAccessKey: env.R2_SECRET_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: filename,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 });
    return new Response(JSON.stringify({ url: signedUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}