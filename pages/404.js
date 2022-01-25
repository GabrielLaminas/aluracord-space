import { Box, Button, Text, TextField, Image } from '@skynexui/components';

export default function PaginaErro(){
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: "#FFFFFF",
        }}
      >
          <Box  
            styleSheet={{
              width: '550px',
              height: '550px',
              backgroundImage: 'url()',
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
            }}
          />
      </Box>
    </>
  );
}
