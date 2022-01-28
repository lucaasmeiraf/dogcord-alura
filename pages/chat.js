import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);



export default function ChatPage() {
    const [mensagem, setMensagem] = useState('');
    const [mensagemList, setMensagemList] = useState([]);
    const router = useRouter();
    const nomeLogado = router.query.username;

    React.useEffect(() => {
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({ data }) => {
        console.log('Dados da consulta: ', data);
        setMensagemList(data);
    });
    }, []); 
    

    function handleNovaMensagem(novaMensagem) {
        const mensagemEnv = {
           // id: mensagemList.length + 1,
            de: nomeLogado,
            msg: novaMensagem,
        };

        supabaseClient
        .from('mensagens')
        .insert([
            mensagemEnv
        ])

        .then(({ data }) => {
            console.log('Criando MSG: ', data)
            setMensagemList([
            data[0],
            ...mensagemList,
        ])
        })
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
                    label='Sair'
                    href="/"
                />
            </Box>
        </>
    )
}

function MensagemList(props) {
    //console.log(props);
    
    function deletarMsg(messageId) {
        
        // apagando mensagem do servidor
        supabaseClient
        .from('mensagens')
        .delete()
        .match({id: messageId})
        .then((resp) => {
            console.log('Mensagem deletada: ', resp)
        });

        // apagando mensagem da tela
        let novaLista = props.mensagens.filter((mensagem) => {
            if (mensagem.id != messageId) {
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
                marginBottom: '15px',
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
                                marginBottom: '-10px',

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
                                src={`https://github.com/${mensagem.de}.png`}
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
                                type='button'
                                label={<MdDeleteOutline />}
                                onClick={ ()=> {
                                    
                                    deletarMsg(mensagem.id)
                                }}                          
                                styleSheet={{
                                    height: '10px',
                                    width: '20px',
                                    marginLeft: '95%',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[999],
                                    }
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