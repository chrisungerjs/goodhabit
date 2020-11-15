import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Cotter from 'cotter'
import { Context } from '../util/context'
import Router from 'next/router'

const Logout = () => {
  const { state, dispatch } = useContext(Context)
  const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
  return (
    <section style={{
      blockSize: '4rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBlockStart: '2rem',
    }}>
      <Button
        onClick={() => {
          try {
            cotter.logOut()
            dispatch({
              type: "LOGGED_OUT_USER"
            })
            Router.reload()
          } catch (err) {
            console.log(err)
          }
        }}
      >
        Log out {state.user.identifier}
      </Button>
    </section>
  )
}

export default Logout
