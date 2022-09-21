import Head from "next/head";
import Script from "next/script";
import AuthState from "../context/AuthState";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cool library</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" />
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}
export default MyApp;