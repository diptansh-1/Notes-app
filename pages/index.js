import Notes from '../components/notes'
import Addnote from "../components/addnote";
import Head from 'next/head';


export default function Home() {
  return (
    <>
    <Head>
      <title>Notes App</title>
      <link rel='icon' href='/Logo.png'/>
    </Head>
    <Notes/>
    <Addnote />

    </>
  )
}
