import type { NextPage } from "next";

import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Villkostnader</title>
        <meta
          name="description"
          content="En webbplats dedikerad till att tydliggöra och minska fasta kostnader för villaägare."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Villakostnader.se</h1>
        <p>Hjälper dig minska dina kostnader</p>
      </main>
    </div>
  );
};

export default Home;
