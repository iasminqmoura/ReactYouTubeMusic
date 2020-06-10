import React from 'react';
import NavBar from '../components/nav-bar';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { User } from '../user';
import { Container, Content, Title, Center } from '../styles';
import { getFavorites, getLikedVideos, getMostPopular, getMostRelevant, getMostLiked, getMostViewed } from '../api';
import VideoList from '../components/video-list';
import { Colors } from '../colors';
import { FlatList } from 'react-native-gesture-handler';

export default class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoaded: false
        }

        this.categories = [{
            key: 'favorites',
            title: 'Meus favoritos',
            displayType: 'favorite',
            items: getFavorites
        }, {
            key: 'liked',
            title: 'Gostei',
            displayType: 'favorite',
            items: getLikedVideos
        }, {
            key: 'mostPopular',
            title: 'Mais populares',
            displayType: 'default',
            items: getMostPopular
        }, {
            key: 'mostRelevant',
            title: 'Mais relevantes',
            displayType: 'default',
            items: getMostRelevant
        }, {
            key: 'mostLiked',
            title: 'Mais bem avaliados',
            displayType: 'default',
            items: getMostLiked
        }, {
            key: 'mostViewed',
            title: 'Mais visualizados',
            displayType: 'default',
            items: getMostViewed
        }];
    }

    componentDidMount() {
        this.onComponentDidMountAsync();
    }

    async onComponentDidMountAsync() {
        // await this.logOut();
        let result = await AsyncStorage.getItem('userData');
        if(result != null)
            User.data = JSON.parse(result);
        User.hasChecked = true;

        if(User.data == null)
            this.props.navigation.replace('Login');
        else 
            this.setState({ isLoaded: true });
    }

    async logOut() {
        await AsyncStorage.clear();
        User.hasChecked = false;
        User.data = null;
    }

    onVideoLoadError(result) {
        if(result == 'Invalid Credentials' && !this.isChangingScreen) {
            this.props.navigation.replace('Login');
            this.isChangingScreen = true;
        }
    }

    onSearch(text) {
        this.props.navigation.push('Search', { text });
    }

    render() {
        if(this.state.isLoaded) {
            return (
                <Container>
                    <NavBar onSearch={this.onSearch.bind(this)} />
                    <Content>
                        <FlatList style={{ marginBottom: 64 }}
                                  data={this.categories} 
                                  renderItem={({ item, index }) => 
                                    <>
                                        <Title space={index != 0 ? 16 : 0}>{ item.title }</Title>
                                        <VideoList displayType={item.displayType} 
                                                   items={User.bufferedContent[item.key] != null ? User.bufferedContent[item.key] : item.items}
                                                   onError={this.onVideoLoadError.bind(this)}
                                                   bufferKey={item.key} />
                                    </>
                                  }>
                        </FlatList>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container>
                    <NavBar onSearch={this.onSearch.bind(this)} />
                    <Center style={{ flex: 1 }}>
                        <ActivityIndicator size="large" color={Colors.principal} />
                    </Center>
                </Container>
            );
        }
    }
}
