import { Button } from 'react-bootstrap'

const Logout: React.FC<{
  setIsLoggedIn: (arg: Boolean) => null
}> = ({ setIsLoggedIn }) => {
  return (
    <>
      <Button
        onClick={() => {
          localStorage.removeItem("ACCESS_TOKEN")
          setIsLoggedIn(false)
        }}
      >
        Logout
      </Button>
    </>
  )
}

export default Logout
