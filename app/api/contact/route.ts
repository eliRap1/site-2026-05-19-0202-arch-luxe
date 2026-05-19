import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const message = formData.get('message')?.toString() || ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const entry = `[${new Date().toISOString()}] Name: ${name} | Email: ${email} | Message: ${message}\n`
    const logPath = path.join(process.cwd(), 'submissions.log')
    fs.appendFileSync(logPath, entry, 'utf8')

    return NextResponse.redirect(new URL('/?submitted=1', req.url))
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
