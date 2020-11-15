import { CotterValidateJWT } from 'cotter-node'
import { CotterAccessToken } from 'cotter-token-js'

export const context = async ({ req }) => {
  console.log(req.headers)
  if (!('authorization' in req.headers)) return { user: null }
  const auth = await req.headers.authorization
  const bearer = auth.split(' ')
  const token = bearer[1]
  let valid = false
  try {
    valid = await CotterValidateJWT(token)
  } catch (err) {
    console.log(err)
    valid = false
  }
  if (!valid) return { user: null }
  const decoded = new CotterAccessToken(token)
  const userEmail = decoded.payload?.identifier
  return { user: userEmail }
}