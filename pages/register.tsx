import { useState, SyntheticEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useRegisterMutation, useLoginMutation } from '../generated/graphql'

const Register: React.FC = () => {
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!email) return setError('please enter a valid email address')
    if (!password) return setError('please enter a password')
    if (password !== confirmPassword) return setError('passwords do not match')
    try {
      const registered = await register({ variables: { email, password } })
      if (!registered) return setError('user already exists, log in')
      const loggedIn = await login({ variables: { email, password } })
      if (!loggedIn) return setError('server error, try again')
    } catch (err) {
      console.warn(err)
      setError('server error, try again')
    }
  }
  return (
    <>
      <h2 className="m-2">Register:</h2>
      <Form 
        className="m-2"
        onSubmit={handleRegister}
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
        <Form.Control
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register
