import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function PaginaDoChat() {
  const [mensagem, setMensagem] = React.useState('');
  const [listDeMensagem, setListDeMensagem] = React.useState([]);

  function handleChangeTextArea(event){
    const mensagens = event.target.value; 
    setMensagem(mensagens);
  }

  function handlePress(event){
    const enviar = event.key;

    if(enviar === 'Enter' || enviar === 'NumpadEnter'){
      event.preventDefault();
      handleNovaMensagem(mensagem);
    }
  }

  function handleNovaMensagem(novaMensagem){
    const mensagemUsuario = {
      id: listDeMensagem.length + 1,
      de: 'gabriellaminas',
      texto: novaMensagem
    }
    setListDeMensagem([mensagemUsuario, ...listDeMensagem])
    setMensagem('');
  }

  return (
    <>
      {/*bg-page*/}
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: "#434860",
          backgroundImage: 'url(https://github.com/GabrielLaminas/aluracord-space/blob/main/public/bg-body.png?raw=true)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
      >

        {/*container-mensagem*/}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: 'rgba(36, 39, 52, 0.9)',
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
        
        <Header/>

        {/*mensagens-user*/}
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: 'rgba(58, 63, 85, 0.6)',
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '24px',
        }}
        >
          <MessageList mensagens={listDeMensagem} />

          {/*form*/}
          <Box
            as="form"
            styleSheet={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex',
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={mensagem}
              onChange={handleChangeTextArea}
              onKeyPress={handlePress}
              styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(24, 28, 37, 0.8)',
                  marginRight: '16px',
                  color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <Button 
              iconName="arrowRight"
              onClick={() => handleNovaMensagem(mensagem)}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: '#7289D9',
                mainColorLight: '#4E6AD0',
                mainColorStrong: '#4E6AD0',
              }}
            />
          </Box>
          {/*form*/}

        </Box>
        {/*mensagens-user*/}

        </Box>
        {/*container-mensagem*/}

      </Box>
      {/*bg-page*/}
    </>
  );
};


function Header() {
  return (
      <>
        <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <Text variant='heading5' styleSheet={{color: '#FDFDFD'}}>
              Chat
          </Text>
          <Button
              variant='tertiary'
              colorVariant='neutral'
              label='Logout'
              href="/"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.neutrals["300"],
                mainColorLight: '#4E6AD0',
                mainColorStrong: 'white',
              }}
          />
        </Box>
      </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              cursor: 'pointer',
              hover: {
                  backgroundColor: 'rgba(145, 163, 182, 0.09)',
              }
            }}
          >
          <Box
            styleSheet={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Image
              styleSheet={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                marginRight: '16px',
              }}
              src={`https://github.com/gabriellaminas.png`}
            />

            <Text tag="strong">
              {mensagem.de}
            </Text>

            <Text
              styleSheet={{
                fontSize: '10px',
                margin: '5px 16px',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {(new Date().toLocaleDateString())}
            </Text>
          </Box>
            {mensagem.texto}
          </Text>
        )
      })}

    </Box>
  )
}