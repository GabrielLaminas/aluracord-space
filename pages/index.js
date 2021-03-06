import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components';
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
  const [dados, setDados] = React.useState(null);
  const roteamento = useRouter();

  React.useEffect(() => {
    async function initFetch(){
      try{
        const response = await fetch(`https://api.github.com/users/${user}`);
        const userJson = await response.json();
        setDados(userJson); 
      }
      catch(e){
        console.log(Error(e))
      }
    }
    initFetch();
  }, [user]);

  function handleChange({target}){
    setUser(target.value);
  }

  function handleSubimitChat(event){
    event.preventDefault();
    window.localStorage.setItem('user', user.toLowerCase());
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
            backgroundColor: 'rgba(36, 39, 52, 0.9)',
          }}
        >

          <Titulo tag="h2">Boas vindas de volta!</Titulo>

          <Text 
            variant="body3" 
            styleSheet={{ 
              marginTop: '16px', 
              color: appConfig.theme.colors.neutrals[300] 
            }}>
            {appConfig.name}
          </Text>
          
          {/*Avatar*/}
          <Box
            styleSheet={{
              margin: '32px 0 16px 0',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          
          >
            <Image
              styleSheet={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
              }}
              src={
                `${user.length > 2 
                  ? `https://github.com/${user}.png` 
                : 'https://raw.githubusercontent.com/GabrielLaminas/aluracord-space/19aa1a8c044da3ae427db7a5510fac85c9773f2c/public/undraw_male_avatar.svg'}`}
            />

            <Text
              variant="body4"
              styleSheet={{
                position: 'absolute',
                bottom: '0px',
                color: appConfig.theme.colors.neutrals["000"],
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '8px 0 16px 0',
                width: '100%',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              {`${user.length > 2 ? user : 'desconhecido'}`}
            </Text>
          </Box>
          {/*Avatar*/}

          {/*Infos*/}
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row'
              },
              gap: '8px'
            }}
          >
            <Box styleSheet={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <Icon 
                name="FaUserFriends" 
                label="Icon Component" 
                styleSheet={{ color: appConfig.theme.colors.neutrals[200]}}
              />
              {dados && (
                <Text 
                styleSheet={{
                  fontSize: '12px',
                  color: appConfig.theme.colors.neutrals[300]
                }}
                >
                { dados["followers"] || dados["following"]
                  ? dados["followers"] + ' followers - ' + dados["following"] + ' following'
                  : '-'}
              </Text> 
              )}
              
            </Box>
            
            <Box styleSheet={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <Icon 
                name="FaRegBookmark" 
                label="Icon Component"
                size="1.4ch" 
                styleSheet={{ color: appConfig.theme.colors.neutrals[200]}}
              />
              <Text 
                styleSheet={{
                  fontSize: '12px',
                  color: appConfig.theme.colors.neutrals[300]
                }}
              >
                {dados && dados["public_repos"] ? dados["public_repos"] + ' repo' : '-'}
              </Text> 
            </Box>
          </Box> 
          {/*Infos*/}

          {/*Formul??rio*/}
          <Box 
            as="form" 
            onSubmit={handleSubimitChat}
            styleSheet={{width: '100%'}}
          >
      
            <TextField
              placeholder='user do github'
              fullWidth
              value={user}
              onChange={handleChange}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: '#101418',
                  mainColorHighlight: '#7289D9',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              styleSheet={{
                margin: '24px 0 0 0'
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              disabled={user.length > 2 ? false : true}
              styleSheet={{marginTop: '5px'}}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: '#7289D9',
                mainColorLight: '#4E6AD0',
                mainColorStrong: '#4E6AD0',
              }}
            />
          </Box>
          {/*Formul??rio*/}
        </Box>
      </Box>
    </>
  );
}

