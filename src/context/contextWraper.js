import { createContext, useState } from 'react'
import axios from 'axios'
import { useDisclosure, useToast } from '@chakra-ui/react'

export const GlobalContext = createContext() 


export default function Wrapper({ children }) {
    const [users, setUsers] = useState()
    const toast = useToast()
    const [error, setError] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState()
    const fetcher = () => {
        axios.get('https://nest-todos-api.onrender.com/todo').then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const Delete = (id) => {
        axios.delete(`https://nest-todos-api.onrender.com/todo/${id}`).then(res => {
            setUsers(users.filter((e) => e.id !== id))
            toast({
                title: 'Todo Deleted Successful!',
                status: 'success',
                duration: 4000,
                isClosable: true
            })
        }).catch(err => {
            console.log(err.response.data)
        })
    }
    const Create = (form, setForm) => {
        axios.post('https://nest-todos-api.onrender.com/todo', form).then(res => {
            setUsers([
                ...users,
                res.data
            ])
            console.log(res.data)
            toast({
                title: 'Todo Created Successful!',
                status: 'success',
                duration: 4000,
                isClosable: true
            })
            setError({})
            setForm({})
            onClose()
        }).catch(err => {
            setError(err.response.data.message[0])
            // console.log(err.response.data.message[0])
        })
    }
    const FindOne = async (id) => {
        await axios.get(`https://nest-todos-api.onrender.com/todo/${id}`).then(res => {
            setUser(res.data)
        }).catch(err => {
            setError(err.response.data.error)
        })
    }
    const Update = (form, setForm, id) => {
        axios.put(`https://nest-todos-api.onrender.com/todo/${id}`, form).then(res => {
            setUsers([
                ...users,
                setForm
            ])
            toast({
                title: 'Todo Updated Successful!',
                status: 'success',
                duration: 4000,
                isClosable: true
            })
            setError({})
            setForm({})
            onClose()
            fetcher()
        }).catch(err => {

            setError(err.response.data.error)
        })
    }
    return (
        <GlobalContext.Provider value={{ fetcher, users, Delete, isOpen, onOpen, onClose, Create, error, FindOne, setError, Update, user }} >
        {children}
        </GlobalContext.Provider>
    )
        
}