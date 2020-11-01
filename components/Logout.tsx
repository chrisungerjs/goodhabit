import { Button } from 'react-bootstrap'
import Cotter from 'cotter'
import { useContext } from 'react'
import { Context } from '../util/context'

const Logout: React.FC = () => {
  const { dispatch } = useContext(Context)
  const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
  return (
    <>
      <Button
        onClick={() => {
          cotter.logOut()
          dispatch({
            type: "LOGGED_OUT_USER"
          })
        }}
      >
        Logout
      </Button>
    </>
  )
}

export default Logout
