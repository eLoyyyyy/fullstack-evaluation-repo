import '../styles/globals.css'
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
