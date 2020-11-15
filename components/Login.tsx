import { useContext, useEffect } from 'react'
import Cotter from 'cotter'
import { Context } from '../util/context'
import { useGetHabitsQuery } from '../generated/graphql'

const Login: React.FC = () => {
  const { dispatch } = useContext(Context)
  const { client } = useGetHabitsQuery()
  useEffect(() => {
    try {
      const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
      cotter
        .signInWithLink()
        .showEmailForm()
        .then(response => {
          console.log('response object:', response)
          dispatch({
            type: "LOGGED_IN_USER",
            payload: cotter.getLoggedInUser()
          })
        })
        .catch(err => console.log(err))
        client.resetStore()
    } catch (err) {
      console.log(err)
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
