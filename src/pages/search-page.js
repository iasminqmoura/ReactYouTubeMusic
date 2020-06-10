import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/nav-bar';
import { Container, Title, Content, Center, Description } from '../styles';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Linking } from 'react-native';
import { Colors } from '../colors';
import { searchVideos } from '../api';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.route.params.text,
            errorMessage: null,
            isLoading: true,
            items: null
        };
    }

    componentDidMount() {
        this.executeSearch();
    }

    onSearch(text) {
        this.setState({
            ...this.state,
            text,
            isLoading: true
        });
        executeSearch();
    }

    executeSearch() {
        searchVideos({ q: this.state.text, maxResults: 50 }, this.onSearchComplete.bind(this));
    }

    onSearchComplete(success, result) {
        if(success) {
            result.forEach(item => item.key = item.id.videoId);

            this.setState({
                ...this.state,
                isLoading: false,
                items: result
            });
        }
        else {
            this.setState({
                ...this.state,
                isLoading: false,
                errorMessage: result,
                items: null
            });
        }
    }

    findThumbnail(item) {
        return Object.values(item.snippet.thumbnails).reduce((prev, curr) => {
            if(!prev)
                return curr;
            else 
                return curr.height > 0 && Math.abs(curr.height - 46) < Math.abs(prev.height - 46) ? curr : prev;
        });
    }

    render() {
        if(this.state.errorMessage != null) {
            return (
                <Container>
                    <NavBar hasPreviousPage={true} navigation={this.props.navigation} onSearch={this.onSearch.bind(this)} />
                    <Content style={{ flex: 1 }}>
                        <Title>Resultados:</Title>
                        <Center>
                            <Description color={Colors.principal}>{this.state.errorMessage}</Description>
                        </Center>
                    </Content>
                </Container>
            );
        }
        else if(this.state.isLoading) {
            return (
                <Container>
                    <NavBar hasPreviousPage={true} navigation={this.props.navigation} onSearch={this.onSearch.bind(this)} />
                    <Content style={{ flex: 1 }}>
                        <Title>Resultados:</Title>
                        <Center style={{ flex: 1 }}>
                            <ActivityIndicator size="large" color={Colors.principal} />
                        </Center>
                    </Content>
                </Container>
            );
        }
        else if(this.state.items == null || this.state.items.length == 0) {
            return (
                <Container>
                    <NavBar hasPreviousPage={true} navigation={this.props.navigation} onSearch={this.onSearch.bind(this)} />
                    <Content style={{ flex: 1 }}>
                        <Title>Resultados:</Title>
                        <Description color={Colors.principal}>Nenhum resultado encontrado.</Description>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container>
                    <NavBar hasPreviousPage={true} navigation={this.props.navigation} onSearch={this.onSearch.bind(this)} />
                    <Content>
                        <Title>Resultados:</Title>
                        <FlatList data={this.state.items}
                                  renderItem={({ item }) => (
                                    <Item onPress={event => Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`)}>
                                        <ItemImage source={{ uri: this.findThumbnail(item).url }} />
                                        <Description>{item.snippet.title}</Description>
                                    </Item>
                                  )} />
                    </Content>
                </Container>
            );
        }
    }
}

const Item = styled.TouchableOpacity`
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const ItemImage = styled.Image`
    height: 46px;
    width: 46px;
    margin-right: 16px;
`;
