import { Button } from 'react-bootstrap'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <>
      <main style={{
        height: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
      }}>
        <h1 style={{ margin: '.25rem' }}>GoodHabit</h1>
        <section style={{
          height: '40%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <Link href="/login">
            <a>
              <Button>
                login
              </Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button>
                register
              </Button>
            </a>
          </Link>
          <Button onClick={() => console.log('DEMO')}>
            Demo
          </Button>
        </section>
      </main>
    </>
  )
}

export default Home
