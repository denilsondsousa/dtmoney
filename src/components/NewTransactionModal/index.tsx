import { useState, FormEvent, useContext } from 'react';
import Modal from 'react-modal';

import { TransactionContext } from '../../TransactionContext';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    
    const {createNewTransaction} = useContext(TransactionContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit');
    const [category, setCategory] = useState('');
    
    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();     

        await createNewTransaction(
            {
                title,
                amount,
                category,
                type,
            }
        );

        setTitle('');
        setAmount(0);
        setType('deposit');
        setCategory('');        
        onRequestClose();
    }
    
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className="react-modal-content"
            overlayClassName="react-modal-overlay"
        > 
        <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
        >
            <img src={closeImg} alt='Fechar Modal' />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
                placeholder="Título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input
                placeholder="Valor"
                type="number"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox
                    type="button"
                    onClick={() => setType('deposit')}
                    isActive={type === 'deposit'}
                    activeColor='green'
                >
                    <img src={incomeImg} alt="Entradas" />
                    <span>Entradas</span>
                </RadioBox>
                <RadioBox
                    type="button"
                    onClick={() => setType('withdraw')}
                    isActive={type === 'withdraw'}
                    activeColor='red'
                >
                    <img src={outcomeImg} alt="Saídas" />
                    <span>Saídas</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input
                placeholder="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            <button type="submit">
                Cadastrar
            </button>
        </Container>
        </Modal>
    )
}