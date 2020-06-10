import React from 'react';
import NavBar from '../components/nav-bar';
import * as Google from 'expo-google-app-auth';
import { Linking, AsyncStorage } from 'react-native';
import { Container, Content, Title, Description, Link, Center } from '../styles';
import { User } from '../user';

export default class LoginPage extends React.Component {
    async logIn() {
        try {
            const { type, accessToken, user } = await Google.logInAsync({
                clientId: '226786051892-50nuqcjkdfifnkae8eac9o61nl18epum.apps.googleusercontent.com',
                scopes: [
                    'https://www.googleapis.com/auth/youtube.readonly'
                ]
            });
            
            if(type === 'success') {
                user.token = accessToken;
                User.data = user;
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                
                this.props.navigation.replace('Home');
            }
            else {
                alert(`Não foi possível fazer log-in.\nResultado: '${type}'.`);
            }
        } 
        catch ({ message }) {
            alert(`Não foi possível fazer log-in.\nResultado: '${message}'.`);
        }
    }

    render() {
        return (
            <Container>
                <NavBar hasSearchButton={false} />
                <Content>
                    <Title>Log-in</Title>
                    <Description>Para acessar a API do YouTube é necessário a autenticação.</Description>
                    <Description>
                        É necessário um navegador para fazer o log-in no Google. 
                        Caso esteja usando o GenyMotion, é necessário instalar um navegador como o Chrome (o navegador padrão não funcionará). 
                        Acesse <Link onPress={event => Linking.openURL('https://github.com/iasminqmoura/ReactYouTubeMusic')}>https://github.com/iasminqmoura/ReactYouTubeMusic</Link> para mais informações.
                    </Description>
                    <Description space={16}>Clique no botão abaixo para fazer log-in com sua conta Google.</Description>
                    <Center>
                        <Link space={16}
                              onPress={event => this.logIn()}>Log-in</Link>
                    </Center>
                    <Description space={32}>
                        Para que fosse possível autenticar no Expo, foi utilizado o expo-google-app-auth que faz log-in pelo navegador.
                        É possível utilizar a autenticação do próprio dispositivo (expo-google-sign-in), porém o aplicativo teria que estar compilado.
                    </Description>
                </Content>
            </Container>
        );
    }
}
