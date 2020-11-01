import Cotter from 'cotter'
import { useEffect } from 'react'

const Login: React.FC<{
  setIsLoggedIn: (arg: Boolean) => null
}> = ({ setIsLoggedIn }) => {
  useEffect(() => {
    try {
      const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
      cotter
        .signInWithLink()
        .showEmailForm()
        .then(payload => {
          localStorage.setItem("ACCESS_TOKEN", payload.oauth_token.access_token)
          setIsLoggedIn(true)
        })
        .catch(err => console.log(err))
    } catch (err) {
      console.log(':', err)
    }
  }, [])
  return (
    <>
      <section
        id="cotter-form-container"
        style={{ blockSize: '100vh' }}
      >
      </section>
    </>
  )
}

export default Login
