import React from 'react'
import { Typography, Button, Box, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './LoginPage.css'

const LoginPage = () => {

    const backgroundTheme = createTheme({
        palette: {
            primary: {
                main: '#343333',
                inputtext: 'white',
                inputbar: '#5E695F',
                button: '#40E317',
            },
        },
        spacing: 1,
    });

    const textTheme = createTheme({
        palette: {
            primary: {
                main: '#1CB82C',
                content: 'white',
                link: '#2AFF25'
            },
        },
        typography: {
            title: {
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '4rem',
            },
            inputheader: {
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: 24,
            },
            content: {
                fontFamily: 'Roboto',
                fontWeight: 900,
                fontSize: 17,
                lineHeight: 1.6,
            }
        },
        spacing: 1,
    })

  return (
    // CONTAINER
    <ThemeProvider theme={backgroundTheme}>
        <Box
            sx={{
                width: '50vw',
                height: '55vh',
                backgroundColor: 'primary.main',
                px: 40,
                pt: 20,
                pb: 10,
                borderRadius: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            {/* LOGIN TEXT */}
            <ThemeProvider theme={textTheme}>
                <Box  sx={{ mt: 0, }}>
                    <Typography variant='title' color='primary.main'>
                        Login
                    </Typography>
                </Box>
            </ThemeProvider>
            
            {/* INPUT */}
            <Box component="form" noValidate 
                sx={{ 
                    mt: '3.5%', 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <ThemeProvider theme={textTheme}>
                    <Typography variant='inputheader' color='primary.main'>
                        Email
                    </Typography>
                </ThemeProvider>
                <TextField
                    margin="none"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{
                        backgroundColor: 'primary.inputbar',
                        mt: 8,
                        input: {
                            color: 'primary.inputtext',
                            height: 0,
                        },
                    }}
                />
                <ThemeProvider theme={textTheme}>
                    <Box  sx={{ mt: '2%', }}>
                        <Typography variant='inputheader' color='primary.main'>
                            Login
                        </Typography>
                    </Box>
                </ThemeProvider>
                <TextField
                    margin="none"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{
                        backgroundColor: 'primary.inputbar',
                        mt: 8,
                        input: {
                            color: 'primary.inputtext',
                            height: 0,
                        },
                    }}
                />
            </Box>

            {/* LOGIN BUTTON */}
            <Button variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: 'primary.button'}}>
                LOGIN
            </Button>

            {/* TEXT AT BOTTOM */}
            <ThemeProvider theme={textTheme}>
                <Box  sx={{ mt: '3.5%', textAlign: 'left',}}>
                    <Typography variant='content' color='primary.content'>
                        Or <Typography variant='content' color='primary.link'> Create Your Account </Typography> 
                        now to build your own personalised calendar!
                    </Typography>
                </Box>
            </ThemeProvider>
        </Box>
    </ThemeProvider>
  )
}

export default LoginPage