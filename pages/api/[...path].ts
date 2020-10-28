import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.API_URL || 'http://localhost:3000/api/graphql'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    const pathname = url.parse(req.url).pathname
    const isLogin = pathname === 'api/login'
    const cookies = new Cookies(req, res)
    const authToken = cookies.get('auth-token')
    req.url = req.url.replace(/^\/api/, '')
    req.headers.cookie = ''
    if (authToken) {
      req.headers['auth-token'] = authToken
    }
    // @ts-ignore
    proxy.once('proxyRes', (proxyRes, req, res) => {
      if (isLogin) {
        let apiResponseBody = ''
        proxyRes.on('data', (chunk) => {
          apiResponseBody += chunk
        })
        proxyRes.on('end', () => {
          try {
            const { authToken } = JSON.parse(apiResponseBody)
            const cookies = new Cookies(req, res)
            cookies.set('auth-token', authToken, {
              httpOnly: true,
              sameSite: 'lax',
            })
            res.status(200).json({ loggedIn: true })
            resolve()
          } catch (err) {
            reject(err)
          }
        })
      } else {
        resolve()
      }
    })
    proxy.once('error', reject)
    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: isLogin,
    })
  })
}