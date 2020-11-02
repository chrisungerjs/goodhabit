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
        .then(() => {
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
      <h1 style={{
        padding: '0 .25rem',
        margin: '2rem 0',
      }}>GoodHabit</h1>
      <section
        id="cotter-form-container"
        style={{
          blockSize: '50vh',
        }}
      >
      </section>
    </>
  )
}

export default Login
