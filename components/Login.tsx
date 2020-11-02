import { useContext, useEffect } from 'react'
import Cotter from 'cotter'
import { Context } from '../util/context'

const Login: React.FC = () => {
  const { dispatch } = useContext(Context)
  useEffect(() => {
    try {
      const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
      cotter
        .signInWithLink()
        .showEmailForm()
        .then(payload => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: cotter.getLoggedInUser()
          })
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
