import React from 'react';
import styled from 'styled-components';
import { Colors } from './colors';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${Colors.fundo};
`;

export const Content = styled.View`
    margin: 16px;
`;

export const Description = styled.Text`
    color: ${props => props.color ?? Colors.fonte};
    font-size: 14px;
    margin-top: ${props => props.space ?? 0}px;
`;

export const Link = styled(Description)`
    color: ${Colors.principal};
`;

export const Title = styled(Description)`
    font-size: 20px;
`;

export const Center = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
