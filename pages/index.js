import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
                text-align: center;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [user, setUser] = React.useState('GabrielLaminas');
  const roteamento = useRouter();
  //api: https://api.github.com/users/gabriellaminas
  
  function handleSubimitChat(event){
    event.preventDefault();
    roteamento.push('/chat');
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: "#434860",
          backgroundImage: 'url(https://github.com/GabrielLaminas/aluracord-space/blob/main/public/bg-body.png?raw=true)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%', maxWidth: '375px',
            borderRadius: '8px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgba(50, 50, 72, 0.9)',
          }}
        >

          <Titulo tag="h2">Boas vindas de volta!</Titulo>

          <Text 
            variant="body3" 
            styleSheet={{ marginTop: '16px', color: appConfig.theme.colors.neutrals[300] }}>
            {appConfig.name}
          </Text>

          <Box
            styleSheet={{
              margin: '32px 0',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '50%'
            }}
          
          >
            <Image
              styleSheet={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
              }}
              src={`https://github.com/${user}.png`}
            />

            <Text
              variant="body4"
              styleSheet={{
                position: 'absolute',
                bottom: '0px',
                color: appConfig.theme.colors.neutrals["000"],
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: '8px 0 16px 0',
                width: '100%',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              {user}
            </Text>
          </Box>

          {/*Formulário*/}
          <Box 
            as="form" 
            onSubmit={handleSubimitChat}
            styleSheet={{width: '100%'}}
          >
      
            <TextField
              placeholder='user'
              fullWidth
              value={user}
              onChange={({target}) => setUser(target.value)}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: '#101418',
                  mainColorHighlight: '#7289D9',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              styleSheet={{marginTop: '5px'}}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: '#7289D9',
                mainColorLight: '#4E6AD0',
                mainColorStrong: '#4E6AD0',
              }}
            />
          </Box>
          {/*Formulário*/}
        </Box>
      </Box>
    </>
  );
}