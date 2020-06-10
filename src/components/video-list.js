import React from 'react';
import styled from 'styled-components';
import Icon from '@expo/vector-icons/MaterialIcons';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Center, Description } from '../styles';
import { Colors } from '../colors';
import { ActivityIndicator, Image, Linking } from 'react-native';
import { User } from '../user';

export default class VideoList extends React.Component {
    constructor(props) {
        super(props);

        this.factories = {
            favorite: this.renderFavoriteItem.bind(this),
            default: this.renderDefaultItem.bind(this)
        };

        this.state = {
            displayType: props.displayType,
            items: props.items,
            isLoading: typeof props.items == 'function',
            errorMessage: null,
            itemHeight: props.itemHeight ?? 150
        };

        if(this.state.isLoading) {
            // Carregar items
            this.state.items(this.onItemsLoaded.bind(this));
        }
    }

    onItemsLoaded(success, result) {
        if(success) {
            result.forEach((item, index) => item.key = item.id.videoId);
            User.bufferedContent[this.props.bufferKey] = result;

            this.setState({
                ...this.state,
                isLoading: false,
                items: result
            });
        }
        else {
            if(this.props.onError)
                this.props.onError(result);

            this.setState({
                ...this.state,
                isLoading: false,
                items: null,
                errorMessage: result
            })
        }
    }

    renderItems() {
        if(this.state.errorMessage != null) {
            return (
                <Center>
                    <Description color={Colors.principal}>{this.state.errorMessage}</Description>
                </Center>
            );
        }
        else if(this.state.isLoading) {
            return (
                <Center>
                    <ActivityIndicator size="large" color={Colors.principal} />
                </Center>
            );
        }
        else {
            return (
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={this.state.items}
                          renderItem={({ item, index }) => this.factories[this.state.displayType](item, index) }>
                </FlatList>
            );
        }
    }

    render() {
        if(Array.isArray(this.state.items) && this.state.items.length == 0) {
            return (
                <Container>
                    <Description color={Colors.principal}>Não há videos.</Description>
                </Container>
            );
        }
        else {
            return (
                <Container> 
                    { this.renderItems() }
                </Container>
            );
        }
    }

    renderFavoriteItem(item, id) {
        let thumbnail = Object.values(item.snippet.thumbnails).reduce((prev, curr) => {
            if(!prev)
                return curr;
            else 
                return curr.height > prev.height ? curr : prev;
        });

        return (
            <FavoriteItem key={id} height={this.state.itemHeight} space={id != 0 ? 8 : 0}
                          onPress={event => Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`)}>
                <FavoriteItemBox>
                    <FavoriteItemImage source={{ uri: thumbnail.url }} height={this.state.itemHeight} />
                    <FavoriteItemImageCenter>
                        <Icon name="play-arrow" color="white" size={36} />
                    </FavoriteItemImageCenter>
                    <ItemDetails height={this.state.itemHeight}>
                        <Description>{item.snippet.title}</Description>
                    </ItemDetails>
                </FavoriteItemBox>
            </FavoriteItem>
        );
    }

    renderDefaultItem(item, id) {
        let thumbnail = Object.values(item.snippet.thumbnails).reduce((prev, curr) => {
            if(!prev)
                return curr;
            else 
                return curr.height > prev.height ? curr : prev;
        });

        return (
            <DefaultItem key={id} height={this.state.itemHeight} space={id != 0 ? 8 : 0}
                         onPress={ event => Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`) }>
                <DefaultItemBox>
                    <DefaultItemImage source={{ uri: thumbnail.url }} resizeMode="cover" blurRadius={3} />
                    <DefaultItemCover />
                    <DefaultItemImage source={{ uri: thumbnail.url }} resizeMode="cover" style={{ margin: 24 }} />
                </DefaultItemBox>
                <ItemDetails height={this.state.itemHeight}>
                    <Description>{item.snippet.title}</Description>
                </ItemDetails>
            </DefaultItem>
        );
    }
}

const Container = styled.View`
    width: 100%;
`;

const ItemDetails = styled.View`
    position: absolute;
    top: ${props => props.height}px;
    left: 0;
    right: 0;
    height: 30px;
    justify-content: center;
`;

// Default Item Styles

const DefaultItem = styled.TouchableOpacity`
    height: ${props => props.height + 30}px;
    width:  ${props => props.height}px;
    margin-left: ${props => props.space ?? 0}px;
`;

const DefaultItemBox = styled.View`
    position: absolute;
    top: 0;
    bottom: 30px;
    left: 0;
    right: 0;
`;

const DefaultItemCover = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.color ?? Colors.principal};
    opacity: ${props => props.opacity ?? .33};
`;

const DefaultItemImage = styled.Image`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

// Favorite Item Styles

const FavoriteItem = styled.TouchableOpacity`
    height: ${props => props.height + 30}px;
    width: ${props => (props.height / 1080) * 1920}px;
    border-radius: 6px;
    margin-left: ${props => props.space ?? 0}px;
`;

const FavoriteItemBox = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const FavoriteItemImage = styled.Image`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${props => props.height}px;
    width: ${props => (props.height / 1080) * 1920}px;
    border-radius: 6px;
`;

const FavoriteItemImageCenter = styled.View`
    position: absolute;
    top: 0;
    bottom: 30px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
