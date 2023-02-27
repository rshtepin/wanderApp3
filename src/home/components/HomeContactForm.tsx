import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Input,
  Center,
} from '@chakra-ui/react'

const HomeContactForm = () => {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''
  return (
    <Box w={'100%'} minH={100} bg={'#b2a1ff'}>
      <Center>
        <Box w={'75%'}>
          <Text fontSize={'lg'} fontWeight={500} color={'black'} textAlign={'center'}>
            Свяжитесь с нами и мы подберем инструменты для вашего бизнеса
          </Text>

          <Input
            type="name"
            value={input}
            onChange={handleInputChange}
            placeholder={'Иванов Иван'}
          />
          <Input type="email" value={input} onChange={handleInputChange} placeholder={'Email'} />
        </Box>
      </Center>
    </Box>
  )
}

export default HomeContactForm
