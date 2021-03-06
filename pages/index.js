import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SiGithub } from 'react-icons/si';
import appConfig from '../config.json';


function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
        ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 24px;
            font-weight: 600;
            }`
            }</style>
        </>
    );
}

export default function PaginaInicial() {
    //const username = 'lucaasmeiraf';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [userLocation, setUserLocation] = React.useState('');


    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[300],
                    backgroundImage: 'url(https://cutewallpaper.org/21/doge-wallpapers/Doge-Meme-Wallpaper-85-images-.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formul??rio */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' },
                            textAlign: 'center',
                            marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Au auau auau</Title>
                        <Text variant="body3" styleSheet={{
                            marginBottom: '32px',
                            color: appConfig.theme.colors.neutrals[300]
                        }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            required
                            placeholder='Usu??rio AuAu do GitHub'
                            value={username}
                            onChange={function (evento) {
                                const valor = evento.target.value; //Onde est?? o valor
                                fetch(`https://api.github.com/users/${valor}`)
                                    .then(response => response.json())
                                    .then(data => setUserLocation(data.location));

                                if (!valor.length < 2) {
                                   setUsername(valor) //Trocar o valor da variavel atrav??s do react e avisa quem precisa
                                }
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button disabled={username.length < 3}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formul??rio */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '250px',
                            padding: '50px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.6)",
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : `https://github.com/lucaasmeiraf.png`}
                        />

                        <a href={`https://github.com/${username}`}>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['200'],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            <SiGithub />&nbsp;{username.length < 3 ? 'lucaasmeiraf' : username}
                        </Text>
                        </a>
                        
                        <Text 
                        
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['200'],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username.length < 2 ? 'Brasilia, DF' : userLocation}
                        </Text>
                        
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}