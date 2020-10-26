import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!email) return setError('please enter a valid email address')
    if (!password) return setError('please enter a password')
    if (!(password === confirmPassword)) return setError('passwords do not match')
    
  }

  return (
    <>
      <h2 className="m-2">Sign Up:</h2>
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



const Test: React.FC = () => {
  return (
    <>
      <Register />
    </>
  )
}

export default Test
