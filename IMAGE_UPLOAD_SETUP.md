# Image Upload & Storage Setup

## Current Implementation (Local Storage)

Images uploaded from the admin dashboard are saved to `public/uploads/` directory and served as static files.

### How It Works:

1. **Admin uploads image** via Product Modal form
2. **Frontend** sends FormData with image file to `/api/upload`
3. **Backend** (/app/api/upload/route.js):
   - Receives the image file
   - Validates file type (must be image) and size (max 10MB)
   - Saves to `public/uploads/` with unique filename
   - Returns public URL: `/uploads/filename.jpg`
4. **Frontend** stores the public URL in the product data
5. **ProductCard** displays the image from the public URL

### File Structure:
```
public/
  uploads/
    1712345678-abc123.jpg
    1712345679-def456.png
```

## Future: Cloudinary Integration

To switch to Cloudinary, follow these steps:

### 1. Get Cloudinary Credentials
- Sign up at [https://cloudinary.com](https://cloudinary.com)
- Go to Settings → API Keys
- Copy your Cloud Name, API Key, and API Secret

### 2. Add Environment Variables
In your Vercel project settings or `.env.local`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Cloudinary
```bash
npm install cloudinary
# or
pnpm add cloudinary
```

### 4. Update `/app/api/upload/route.js`

Replace the current file with the Cloudinary code (see commented section at bottom of upload route):

```javascript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 })
    }

    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'techstore-products' },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      stream.end(buffer)
    })

    return Response.json({ url: result.secure_url, publicId: result.public_id })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
```

That's it! No frontend changes needed - the API response format is identical.

## Testing Image Upload

1. Go to Admin Dashboard (`/admin`)
2. Click "Add Product" button
3. Fill in the form and select an image
4. Submit the form
5. Image will be uploaded and stored
6. View the products page to see the image displayed

## Troubleshooting

### Images Not Displaying
- Check if file was saved to `public/uploads/`
- Verify image URL is correct in browser console
- Check image file permissions
- Try a different image format (JPG, PNG, GIF)

### Upload Fails
- Ensure file is an image (JPG, PNG, GIF, etc.)
- Check file size is under 10MB
- Check API endpoint is working: POST `/api/upload`
- Check browser console for error details

### With Cloudinary
- Verify environment variables are set correctly
- Check Cloudinary API credentials in dashboard
- Ensure folder name matches (default: 'techstore-products')
