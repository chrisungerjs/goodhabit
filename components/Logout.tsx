import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Cotter from 'cotter'
import { Context } from '../util/context'

const Logout: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
  return (
    <section style={{
      inlineSize: '100vw',
      blockSize: '4rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      bottom: 0,
    }}>
      <Button
        onClick={() => {
          cotter.logOut()
          dispatch({
            type: "LOGGED_OUT_USER"
          })
        }}
      >
        Log out {state.user.identifier}
      </Button>
    </section>
  )
}

export default Logout
