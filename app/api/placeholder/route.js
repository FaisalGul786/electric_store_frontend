export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const width = searchParams.get('w') || '300'
  const height = searchParams.get('h') || '200'
  const text = searchParams.get('text') || 'Image'

  // Create a simple SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="40" fill="#10b981" opacity="0.2"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#888888" text-anchor="middle" dominant-baseline="middle">
        ${decodeURIComponent(text)}
      </text>
    </svg>
  `

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}
