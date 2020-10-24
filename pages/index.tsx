import Head from 'next/head'
import { useState } from 'react'
import AddHabit from '../components/AddHabit'
import Today from '../components/Today'
import { useGetHabitsQuery } from '../generated/graphql'
import { Button } from 'react-bootstrap'

const Home: React.FC = () => {
  const [isAddHabit, setIsAddHabit] = useState(false)
  const { loading, error } = useGetHabitsQuery()
  if (loading) return <>Loading...</>
  if (error) return <>Error!</>
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      <h1 style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 .2rem',
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
      {isAddHabit ? <AddHabit setIsAddHabit={setIsAddHabit} /> : null}
      <Today />
    </>
  )
}

export default Home
