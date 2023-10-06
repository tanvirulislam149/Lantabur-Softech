import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [lang, setLang] = useState([]);
  const [selectedLang, setSelectedLang] = useState();


  const config = {
    headers: {
      'X-RapidAPI-Key': '9b72d5335dmsh775fee76efa7afcp11edb8jsn8bbc3f37884a',
      'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com'
    }
  };

  useEffect(() => {
    axios.get('https://text-to-speech27.p.rapidapi.com/speech/lang', config)
      .then((res) => {
        let array = [];
        Object.entries(res.data).map(entry => {
          let key = entry[0];
          let value = entry[1];
          const data = { langKey: key, langName: value };
          array.push(data);
        })
        setLang(array);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <Head>
        <title>Text-to-speech</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form>
          <h1 className={styles.title}>Text-to-speech</h1>
          <div className={styles.inputCont}>
            <label htmlFor="text">Input text: </label> <br />
            <textarea className={styles.inputField} name="text" id="" cols="90" rows="7"></textarea> <br />
            <label htmlFor="text">Language: </label> <br />
            <select className={styles.language} value={selectedLang} name="cars" id="cars">
              {
                lang.map(l => <option key={l.langKey} onClick={() => setSelectedLang(l.langKey)} value={l.langKey}>{l.langKey}: {l.langName}</option>)
              }
            </select>
            <button className={styles.button}>Submit</button>
          </div>
        </form>
      </main>
    </>
  )
}
