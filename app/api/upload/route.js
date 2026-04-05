import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')

    if (!image) {
      return Response.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return Response.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: 'Image must be less than 10MB' },
        { status: 400 }
      )
    }

    // Convert image to buffer
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = image.name.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${Math.random().toString(36).slice(2)}.${extension}`
    
    // Create public/uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    
    // Save file to public/uploads
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/uploads/${filename}`

    return Response.json({
      url: publicUrl,
      filename: filename,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json(
      { error: 'Failed to upload image', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * CLOUDINARY INTEGRATION (Ready for future use)
 * 
 * When you have Cloudinary credentials, uncomment the code below and replace
 * the POST function above. Add these environment variables to your project:
 * - CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 * 
 * import { v2 as cloudinary } from 'cloudinary'
 * 
 * cloudinary.config({
 *   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 *   api_key: process.env.CLOUDINARY_API_KEY,
 *   api_secret: process.env.CLOUDINARY_API_SECRET,
 * })
 * 
 * export async function POST(request) {
 *   try {
 *     const formData = await request.formData()
 *     const image = formData.get('image')
 * 
 *     if (!image) {
 *       return Response.json({ error: 'No image provided' }, { status: 400 })
 *     }
 * 
 *     const arrayBuffer = await image.arrayBuffer()
 *     const buffer = Buffer.from(arrayBuffer)
 * 
 *     const result = await new Promise((resolve, reject) => {
 *       const stream = cloudinary.uploader.upload_stream(
 *         { resource_type: 'auto', folder: 'techstore-products' },
 *         (error, result) => (error ? reject(error) : resolve(result))
 *       )
 *       stream.end(buffer)
 *     })
 * 
 *     return Response.json({ url: result.secure_url, publicId: result.public_id })
 *   } catch (error) {
 *     console.error('Upload error:', error)
 *     return Response.json({ error: 'Failed to upload image' }, { status: 500 })
 *   }
 * }
 */
