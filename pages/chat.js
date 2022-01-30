import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/Componentes/ButtonSendSticker.js';

let supabaseClient = null;

const userLocal = () => {
  if(typeof window !== 'undefined'){
    return window.localStorage.getItem('user');
  }
}

export async function getServerSideProps() {
  //Conexão com o SupaBase
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
    }
  };
}

function escutarMensagemTempoReal(adicionaMensagem){
  return supabaseClient
    .from('mensagens')
    .on('*', (resposta) => adicionaMensagem(resposta))
    .subscribe();
}

export default function PaginaDoChat({SUPABASE_ANON_KEY, SUPABASE_URL}) {
  const [mensagem, setMensagem] = React.useState('');
  const [listDeMensagem, setListDeMensagem] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', {ascending: false})
      .then(({ data }) => {
        setListDeMensagem(data);
        setCarregando(false);
      });

    escutarMensagemTempoReal((novaMensagem) => {
      if(novaMensagem.eventType === 'INSERT'){
        setListDeMensagem((valorAtualDoList) => {
          return [novaMensagem.new, ...valorAtualDoList];
        });
      }

      if(novaMensagem.eventType === 'DELETE'){
        setListDeMensagem((valorAtualDoList) => {
          const lista = valorAtualDoList
            .filter((mensagem) => { 
              if (mensagem.id != novaMensagem.old.id) return mensagem 
            });
          return [...lista];
        });
      }
    })

  }, []);

  function handleNovaMensagem(novaMensagem){
    if(novaMensagem.length >= 1){
      const mensagemUsuario = {
        de: userLocal(),
        texto: novaMensagem
      }

      supabaseClient
        .from('mensagens')
        .insert([mensagemUsuario])
        .then(({data}) => data);

      setMensagem('');
    }
  }

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
            padding: {xs: '8px', md: '32px'}
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
            padding: {xs: '8px', md: '24px'}
        }}
        >
          <MessageList mensagens={listDeMensagem} setListDeMensagem={setListDeMensagem} carregando={carregando}/>

          {/*form*/}
          <Box
            as="form"
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
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
                  overflowY: 'scroll',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(24, 28, 37, 0.8)',
                  marginRight: {xs: '8px', md: '16px'},
                  color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <ButtonSendSticker onStickerClick={(sticker) => handleNovaMensagem(':sticker: ' + sticker)} />

            <Button
              styleSheet={{
                borderRadius: '50%',
                minWidth: '48px',
                minHeight: '48px',
                fontSize: {xs: '15px', md: '18px'},
                marginLeft: '8px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} 
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
};

function MessageList(props) {

  function removerMensagem(id){
    //console.log(id) ta saindo o id que eu clico
    const mensagemRemovida = props.mensagens.filter((mensagem) => id !== mensagem.id);
    //console.log(mensagemRemovida) ta saindo o novo array com valores excluidos
    const {data} = supabaseClient
      .from('mensagens')
      .delete()
      .match({id: id})
      .then({data})

    props.setListDeMensagem(mensagemRemovida);
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          position: 'relative',
          color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      {props.carregando && (
        <Box
          styleSheet={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Text styleSheet={{color: '#9AA5B1', fontSize: {xs: '13px', 'md': '14px'}}}>
            Carregando mensagens...
          </Text>
        </Box>
      )}
      {props.mensagens.map((mensagem) => {

        const dbDate = new Date(mensagem.created_at).toLocaleString();
        const data = dbDate.slice(0, 10);
        const hora = dbDate.slice(11, 16);

        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              cursor: 'pointer',
              wordBreak: 'break-word',
              lineHeight: '1.4',
              fontSize: {xs: '14px', md: '16px'},
              hover: {
                  backgroundColor: 'rgba(145, 163, 182, 0.09)',
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box 
                styleSheet={{
                  display: 'flex',
                }}
              >
                
                <Image
                  styleSheet={{
                    width: {xs: '28px', md: '45px'},
                    height: {xs: '28px', md: '45px'},
                    borderRadius: '50%',
                    marginRight: {xs: '10px', md: '16px'}, 
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />

                <Text 
                  tag="strong"
                  styleSheet={{
                    fontSize: {xs: '12px', md: '16px'}
                  }}
                >
                  {mensagem.de}
                </Text>

                <Text
                  styleSheet={{
                    fontSize: '10px',
                    margin: {xs: '2px 10px', md: '5px 16px'},
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {data}
                </Text>
              </Box>

              {mensagem.de === userLocal() && (
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    removerMensagem(mensagem.id);
                  }}
                  buttonColors={{
                    contrastColor: '#FDFDFD',
                    mainColor: 'rgba(0, 0, 0, 0.0)',
                    mainColorStrong: 'rgba(255, 107, 107, .35)',
                  }}
                  colorVariant="negative"
                  iconName="FaRegTrashAlt"
                  />
              )}
              
            </Box>
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image 
                  src={mensagem.texto.replace(':sticker:', '')} 
                  styleSheet={{
                    maxWidth: {xs: '50%', md: '25%'}
                  }}
                />
              )
              : mensagem.texto
            }
            <Text
              styleSheet={{
                fontSize: '10px',
                margin: {xs: '2px 10px', md: '5px 8px'},
                float: 'right',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {hora}
            </Text>
          </Text>
        )
      })}

    </Box>
  )
};
