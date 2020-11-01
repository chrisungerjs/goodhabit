import Head from 'next/head'
import { useState } from 'react'
import AddHabit from '../components/AddHabit'
import Today from '../components/Today'
import { useGetHabitsQuery } from '../generated/graphql'
import { Button } from 'react-bootstrap'
import Login from '../components/Login'
import Logout from '../components/Logout'
import { useEffect, useContext } from 'react'
import Cotter from 'cotter'
import { Context } from '../util/context'

const Home: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  useEffect(() => {
    const cotter = new Cotter('ca212de7-300a-4354-a178-24f474b3ae69')
    const user = cotter.getLoggedInUser()
    if (!user) return
    dispatch({
      type: "LOGGED_IN_USER",
      payload: user,
    })
  }, [])
  const [isAddHabit, setIsAddHabit] = useState(false)
  const { loading, error, data } = useGetHabitsQuery()
  if (loading) return <>Loading...</>
  if (error) return <>Error!</>
  const index = data.habits?.length
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      {state.user.ID ? (
        <>
          <Logout />
          <h1 style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 .25rem',
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
          {isAddHabit ? <AddHabit setIsAddHabit={setIsAddHabit} index={index} /> : null}
          <Today />
        </>
        ) : (
          <Login />
        )}
    </>
  )
}

export default Home
