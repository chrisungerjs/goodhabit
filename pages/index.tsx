import Head from 'next/head'
import AddHabit from '../components/AddHabit'
import Today from '../components/Today'
import { useGetHabitsQuery } from '../generated/graphql'

const Home: React.FC = () => {
  const { loading, error } = useGetHabitsQuery()
  if (loading) return <>Loading...</>
  if (error) return <>Error!</> 
  return (
    <>
      <Head>
        <title>GoodHabit</title>
      </Head>
      <h1>GoodHabit</h1>
      <AddHabit />
      <Today />
    </>
  )
}

export default Home
