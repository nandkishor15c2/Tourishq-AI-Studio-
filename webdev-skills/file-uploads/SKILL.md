---
name: file-uploads
description: Handle file uploads in web applications including multipart forms, S3/cloud storage, image processing, and upload progress tracking. Use this skill whenever the user needs to implement file uploads, store files to S3 or Cloudinary, handle image uploads, validate file types, show upload progress, or generate presigned URLs. Trigger for "file upload", "S3 upload", "presigned URL", "multipart form", "image upload", "Cloudinary", "UploadThing", or "drag and drop upload".
---

# File Uploads

Handle file uploads with cloud storage, validation, and progress tracking.

## UploadThing (Easiest for Next.js)

```bash
npm install uploadthing @uploadthing/react
```

```ts
// lib/uploadthing.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@/auth';

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 4 } })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.userFile.create({ data: { url: file.url, userId: metadata.userId } });
      return { url: file.url };
    }),

  documentUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => ({ url: file.url })),
} satisfies FileRouter;

// app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next';
import { uploadRouter } from '@/lib/uploadthing';
export const { GET, POST } = createRouteHandler({ router: uploadRouter });
```

```tsx
// components/ImageUpload.tsx
'use client';
import { useUploadThing } from '@/lib/uploadthing';
import { useDropzone } from 'react-dropzone';

export function ImageUpload({ onUpload }) {
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing('imageUploader');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 4,
    onDrop: async (files) => {
      const uploaded = await startUpload(files);
      if (uploaded) onUpload(uploaded.map(f => f.url));
    },
  });

  return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
      <input {...getInputProps()} />
      {isUploading ? <p>Uploading...</p> : <p>Drop images here or click to select</p>}
    </div>
  );
}
```

## S3 Direct Upload (Presigned URLs)

```ts
// lib/s3.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}
```

```ts
// app/api/upload/presign/route.ts
export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  // Validate file type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowed.includes(fileType)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
  }

  const key = `uploads/${Date.now()}-${fileName}`;
  const url = await getPresignedUploadUrl(key, fileType);

  return NextResponse.json({ url, key, publicUrl: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}` });
}
```

```tsx
// Client: Upload directly to S3
async function uploadFile(file: File) {
  // 1. Get presigned URL
  const { url, publicUrl } = await fetch('/api/upload/presign', {
    method: 'POST',
    body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  }).then(r => r.json());

  // 2. Upload to S3 directly (no server bandwidth)
  await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });

  return publicUrl;
}
```

## File Validation

```ts
// lib/upload-validation.ts
export function validateFile(file: File, options: {
  maxSizeMB?: number;
  allowedTypes?: string[];
}) {
  const { maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;

  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`File too large. Max ${maxSizeMB}MB`);
  }
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed`);
  }
}
```
