import React from 'react';
import styled from 'styled-components';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Text, Image } from 'react-native';
import { Colors } from '../colors';

import logo from '../../assets/logo.png';
import { TextInput } from 'react-native-gesture-handler';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPreviousPage: props.hasPreviousPage ?? false,
            hasSearchButton: props.hasSearchButton ?? true,
            isSearching: false
        };
    }

    onBackButtonClick() {
        this.props.navigation.pop();
    }

    onSearchButtonClick() {
        this.setState({
            ...this.state,
            isSearching: true
        });
    }

    onCancelSearchButtonClick() {
        this.setState({
            ...this.state,
            isSearching: false
        });
    }

    onSubmitSearchButtonClick() {
        if(this.searchText && this.searchText.length > 0 && this.props.onSearch)
            this.props.onSearch(this.searchText);
    }

    renderLeft() {
        if(this.state.hasPreviousPage) {
            return (
                <ContainerItem justify="flex-start">
                    <Icon name="arrow-back" color={Colors.fonte} size={20}
                          onPress={ event => this.onBackButtonClick() } />
                </ContainerItem>
            );
        }
        else {
            return (
                <ContainerItem justify="flex-start">
                    <Logo source={logo} />
                </ContainerItem>
            );
        }
    }

    renderRight() {
        if(this.state.hasSearchButton) {
            return (
                <ContainerItem justify="flex-end">
                    <Icon name="search" color={Colors.fonte} size={20}
                          onPress={event => this.onSearchButtonClick()} />
                </ContainerItem>
            );
        }
        else {
            return null;
        }
    }

    renderSearch() {
        return (
            <Container style={{ justifyContent: 'center', marginHorizontal: 16, flexDirection: 'row' }}>
                <Icon name="arrow-back" color={Colors.fonte} size={20} style={{ alignSelf: 'center' }}
                      onPress={event => this.onCancelSearchButtonClick()} />
                <TextInput style={{ flex: 1, marginLeft: 16, color: Colors.fonte }} placeholder="Pesquisar" autoFocus={true}
                           onChangeText={text => this.searchText = text}
                           onSubmitEditing={event => this.onSubmitSearchButtonClick()} />
                <Icon name="search" color={Colors.fonte} size={20} style={{ alignSelf: 'center' }}
                      onPress={event => this.onSubmitSearchButtonClick()} />
            </Container>
        );
    }

    render() {
        if(!this.state.isSearching) {
            return (
                <Container>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Container>
            );
        }
        else {
            return (
                <Container>
                    {this.renderSearch()}
                </Container>
            );
        }
    }
}

const Container = styled.View`
    height: 50px;
    background-color: ${Colors.barraNavegacao};
    display: flex;
`;

const ContainerItem = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: ${props => props.direction ?? 'row'};
    justify-content: ${props => props.justify ?? 'center'};
    align-items: ${props => props.align ?? 'center'};
    margin: ${props => props.marginVertical ?? 0}px ${props => props.marginHorizontal ?? 16}px;
`;

const Logo = styled.Image`
    width: 77px;
    height: 20px;
`;
