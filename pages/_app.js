function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: 'Lexend Deca', sans-serif;
      }
      body {
        font-family: 'Lexend Deca', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
      
      ul::-webkit-scrollbar, 
      textarea::-webkit-scrollbar {
        width: 5px;
      }
      ul::-webkit-scrollbar-thumb, textarea::-webkit-scrollbar-thumb{
        background-color: rgba(36, 39, 52, .7);
        border-radius: 50px;
      }
        
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  )
}