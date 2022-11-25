import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Stack,
  } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/contextWraper'
import InputGroupe from './InputGroupe'


export default function DrawerExample() {
    const { isOpen, onOpen, onClose, Create, error, Update, setError, user } = useContext(GlobalContext)
    const [ form, setForm ] = useState({})
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
      setForm(user)
    }, [user])
    const onAdd = () => {
        Create(form, setForm)
    }
    const onUpdate = () => {
      Update(form, setForm, form?.id)
    }
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={() => {
              onClose()
              setError({})
              setForm({})
            }} />
            <DrawerHeader>Create</DrawerHeader>
  
            <DrawerBody>
                <Stack spacing={'26px'} >
                <InputGroupe name='fullName' value={form?.fullName} onChangeHandler={onChangeHandler} error={error.fullName} />
                <InputGroupe name='email' value={form?.email} onChangeHandler={onChangeHandler} error={error.email} />
                <InputGroupe name='description' value={form?.description} onChangeHandler={onChangeHandler} error={error.description} />
                </Stack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={() => {
              onClose()
              setError({})
              setForm({})
            }}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => {
                form.id ? onUpdate() : onAdd()
                }} >Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }