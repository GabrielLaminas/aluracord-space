import { Box, Button, Image } from '@skynexui/components';
import { useRouter } from 'next/router';

export default function PaginaErro(){
  const roteamento = useRouter();
  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: "#FFFFFF",
        }}
      >
        <Image
          src='https://raw.githubusercontent.com/GabrielLaminas/aluracord-space/9d1b8537b04a86907ae1cec29eb630a7063119e4/public/Monster%20404%20Error-rafiki.svg'
          styleSheet={{
            width: '530px',
          }}
        />
        <Button
          iconName="home"
          type='submit'
          label='Página Inicial'
          onClick={() => roteamento.push('/')}
          buttonColors={{
            contrastColor: '#FDFDFD',
            mainColor: '#2f2f47',
            mainColorLight: '#414162',
            mainColorStrong: '#414162',
          }}
        >
        </Button>
      </Box>
    </>
  );
}
