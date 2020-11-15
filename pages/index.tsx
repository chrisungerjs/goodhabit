import { useEffect, useContext, useState } from 'react'
import Head from 'next/head'
import Cotter from 'cotter'
import { Button } from 'react-bootstrap'
import { Context } from '../util/context'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Today from '../components/Today'
import AddHabit from '../components/AddHabit'
import { useGetHabitsQuery } from '../generated/graphql'

const Home: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  useEffect(() => {
    try {
      const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
      const user = cotter.getLoggedInUser()
      if (!user) return
      dispatch({
        type: "LOGGED_IN_USER",
        payload: user,
      })
    } catch (err) {
      console.log(err)
    }
  }, [])
  const [isAddHabit, setIsAddHabit] = useState(false)
  return (
    <section style={{
      maxInlineSize: '30rem',
      margin: '0 auto',      
    }}>
      <Head>
        <title>GoodHabit</title>
      </Head>
      {state.user.ID ? (
        <>
          <h1 style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 .25rem',
            margin: '2rem 0',
          }}>
            <span>
              GoodHabit
            </span>
            <Button
              onClick={() => setIsAddHabit(!isAddHabit)}
            >
              +
            </Button>
          </h1>
          {isAddHabit ? <AddHabit setIsAddHabit={setIsAddHabit} index={-1} /> : null}
          <Today />
          <Logout />
        </>
        ) : (
          <Login />
          )}
    </section>
  )
}

export default Home
