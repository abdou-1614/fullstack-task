import { Avatar, Box, Button, Td, Tr } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { GlobalContext } from '../context/contextWraper'

const Row = ({ id, fullName, email, description }) => {
  const { Delete, onOpen, FindOne } = useContext(GlobalContext)
  return (
    <Tr>
    <Td>
        <Avatar name={fullName} />
    </Td>
    <Td>{fullName}</Td>
    <Td>{email}</Td>
    <Td>{description}</Td>
    <Box display={'flex'} gap={'2'} mt={'3'} alignItems={'center'} justifyContent={'center'} >
        <Button colorScheme={'blue'}>
            <AiFillEdit fontSize={'21px'}  onClick={() => { onOpen(); FindOne(id) }} />
        </Button>
        <Button colorScheme={'red'} onClick={() => Delete(id)} >
            <AiFillDelete fontSize={'21px'}/>
        </Button>
    </Box>
  </Tr>
  )
}

export default Row