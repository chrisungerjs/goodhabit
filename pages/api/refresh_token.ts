import cookies from '../../util/cookies'

const sendRefreshToken = (req, res) => {
  // const { token = '' } = req.body
  const token = 'test'
  res.cookie('refreshToken', token, { httpOnly: true })
}

export default cookies(sendRefreshToken)