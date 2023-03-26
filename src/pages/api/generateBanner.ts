// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fontsSync, textSync, Fonts } from 'figlet'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== 'POST') return
  const { text, font } = JSON.parse(req.body)
  res.status(200).json({text: textSync(text, font)})
}
