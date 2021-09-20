import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input{
        width: 100%;
        height: 4rem;
        padding: 0 1.5rem;
        border-radius: 0.25rem;

        border: 1px solid #D7D7D7;
        background-color: #E7E9EE;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder{
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    button[type="submit"]{
        width: 100%;
        height: 4rem;
        padding: 0 1.5rem;
        border-radius: 0.25rem;
        border: 0;
        margin-top: 1.5rem;

        background: var(--green);
        color: #FFF;

        font-size: 1rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.95);
        }
    }
`;

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

interface RadioProps{
    isActive: boolean;
    activeColor: 'green' | 'red';
}

const colors = {
    green: '#33CC95',
    red: '#E52E4D'
}

export const RadioBox = styled.button<RadioProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    background: ${(props) => 
        props.isActive ? 
        transparentize(0.9, colors[props.activeColor]) :
        'transparent'};

    display: flex;
    align-items: center;
    justify-content: center;

    transition: border-color 0.2s;

    img{
        width: 20px;
        height: 20px;
    }

    span{
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-size);
    }

    &:hover{
        border-color: ${darken(0.1, '#d7d7d7')}
    }
`;