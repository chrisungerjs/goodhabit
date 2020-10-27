import { useState, SyntheticEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLoginMutation } from '../generated/graphql'

const Login: React.FC = () => {
  const [login] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!email) return setError('please enter a valid email address')
    if (!password) return setError('please enter a password')
    try {
      const loggedIn = await login({ variables: { email, password } })
      if (!loggedIn) return setError('try again')
    } catch (err) {
      console.warn(err)
      setError('server error, try again')
    }
  }
  return (
    <>
      <h2 className="m-2">Login:</h2>
      <Form 
        className="m-2"
        onSubmit={handleLogin}
      >
        <Form.Control
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <section style={{ height: '2rem', color: 'red', textAlign: 'center' }}>
          {error ? error : null}
        </section>
        <section style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Button
            type="submit"
            variant="info"
          >
            Submit
          </Button>
        </section>
      </Form>
    </>
  )
}

export default Login
