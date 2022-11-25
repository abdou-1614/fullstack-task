import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const InputGroupe = ({name, onChangeHandler, error, value}) => {
  return (
    <FormControl isInvalid={error} >
        <FormLabel>{name}</FormLabel>
        <Input type='text' name={name} onChange={onChangeHandler} value={value} />
        {
            error && error.map((err) => {
                return <FormErrorMessage>{err}</FormErrorMessage>
            })
        }
    </FormControl>
  )
}

export default InputGroupe