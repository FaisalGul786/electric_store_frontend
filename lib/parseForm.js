import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export async function parseForm(req) {
  const formData = await req.formData()

  const fields = {}
  const files = {}

  for (const [key, value] of formData) {
    if (value instanceof File) {
      if (!files[key]) files[key] = []
      const buffer = await value.arrayBuffer()
      files[key].push({
        filename: value.name,
        mimetype: value.type,
        size: value.size,
        data: Buffer.from(buffer),
      })
    } else {
      fields[key] = value
    }
  }

  return { fields, files }
}
