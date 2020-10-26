import { Form, Button } from 'react-bootstrap'

const Register: React.FC = () => {
  return (
    <>
      <h2 className="m-2">Sign Up:</h2>
      <Form className="m-2">
        <Form.Control
          type="email"
          placeholder="email"
        />
        <Form.Control
          type="password"
          placeholder="password"
          />
        <Form.Control
          type="password"
          placeholder="confirm password"
          />
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem 0',
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
    <Register />
  )
}

export default Test
