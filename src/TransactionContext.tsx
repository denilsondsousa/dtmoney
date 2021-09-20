import {createContext, ReactNode, useEffect, useState} from 'react';
import { api } from './services/api';

interface TransactionProps {
    children: ReactNode,
}

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionContextData {
    transactions: Transaction[],
    createNewTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionsProvider({children}: TransactionProps){
    
    const [transactions, setTransections] = useState<Transaction[]>([]);

    useEffect(()=> {
        api('transactions')
        .then(response => setTransections(response.data.transactions));
    }, []);

    async function createNewTransaction(transactionInput: TransactionInput){
        const  response  = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const { transaction } = response.data;

        setTransections([...transactions, transaction])
    }

    return(
        <TransactionContext.Provider value={{transactions, createNewTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}