import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
export default function ChatPage() {
    const [mensagem, setMensagem] = useState('');
    const [mensagemList, setMensagemList] = useState([]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: mensagemList.length + 1,
            de: 'lucaasmeiraf',
            msg: novaMensagem,
        };
        setMensagemList([
            mensagem,
            ...mensagemList,
        ])
        setMensagem('');
    }
    
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://cutewallpaper.org/21/doge-wallpapers/Doge-Meme-Wallpaper-85-images-.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MensagemList mensagens={mensagemList} setMensagemList={setMensagemList}/>
                    {/* {mensagemList.map((mensagemAtual) => {
                        console.log(mensagemAtual);
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.msg}
                            </li>

                        );
                    })} */}
                    <Box 
                        as="form"
                        onSubmit={function (enviarMsg) {
                            enviarMsg.preventDefault();
                        handleNovaMensagem(mensagem);
                        }}
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => { //Captura se a tecla Enter está sendo pressionada e executa a func
                                const tecla = event;
                                if (tecla.key === 'Enter') {
                                    event.preventDefault();
                                    if(mensagem.trim() != ''){
                                        handleNovaMensagem(mensagem);
                                    }else{
                                        setMensagem('')
                                    }
                        }}}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '10px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            
                        />
                        
                        <Button disabled={mensagem === ''}
                            type='submit'
                            label='Enviar'
                            styleSheet={{
                                width: '20%',
                                height: '43px',
                                padding: '6px 8px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                                
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MensagemList(props) {
    //console.log(props);
    
    function handleRemovedMsg(messageId) {
        
        let novaLista = props.mensagens.filter((mensagem) => {
            if (mensagem.id != messageId) {
                console.log(mensagem.id)
                console.log(messageId)
                return mensagem;
            }    
        })
        props.setMensagemList([
            ...novaLista
        ])
    }

    return (
        <Box 
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
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
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',

                            }}
                        >
                            
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/lucaasmeiraf.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '12px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button     
                                onClick={ ()=> {
                                    
                                    handleRemovedMsg(mensagem.id)
                                }}                          
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[1010],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[1020],
                                }}
                                label='x'
                                styleSheet={{
                                    borderRadius: "50%",
                                    height: "30px",
                                    marginLeft: "90%",
                                    paddingLeft: "20px",
                                    marginRight: "0",
                                    width: "20px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    position: "relative",
                                    top: "-30px",
                                    background: "none"
                                }}>

                            </Button>
                        </Box>
                        {mensagem.msg}
                    </Text>
                );

            })}

        </Box>
    )
}