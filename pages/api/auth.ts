import { User } from '../../generated/graphql'
import cookies from '../../util/cookies'
import { verify, sign } from 'jsonwebtoken'
import { connectToDatabase } from '../../util/db'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const handler = async (req, res) => {
  let payload: any = null
  const token = req.cookies.refreshToken
  if (!token) return res.send({ ok: false, accessToken: '' })
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET!)
  } catch (err) {
    console.warn(err)
    return res.send({ ok: false, accessToken: '' })
  }
  const { db } = await connectToDatabase()
  const user = await db
    .collection('users')
    .findOne({ _id: payload.userId })
  sendRefreshToken(res, createRefreshToken(user))
  return res.send({ ok: true, accessToken: createAccessToken(user)})
}
  
export const sendRefreshToken = cookies((res, token: string) => {
    res.cookie('refreshToken', token, { httpOnly: true })
})

export const createAccessToken = (user: User) => {
    const TWO_HOURS = 1000 * 60 * 60 * 2
    return sign({ userId: user._id }, ACCESS_TOKEN_SECRET!, { expiresIn: TWO_HOURS })
}

export const createRefreshToken = (user: User) => {
    const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7
    return sign({ userId: user._id }, REFRESH_TOKEN_SECRET!, { expiresIn: SEVEN_DAYS })
}

export default handler
