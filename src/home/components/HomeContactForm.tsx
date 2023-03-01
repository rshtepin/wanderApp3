import React, { useState } from 'react'
import { getAntiCSRFToken } from '@blitzjs/auth'

import {
  Box,
  Text,
  Input,
  Center,
  Textarea,
  Button,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import useDeviceSize from '../helpers/useDeviceSize'

const HomeContactForm = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputName, setInputName] = useState('')
  const [inputComment, setInputComment] = useState('')
  const [isFocusedEmail, setIsFocusedEmail] = useState(false)
  const [isFocusedName, setIsFocusedName] = useState(false)
  const [isFocusedTel, setIsFocusedTel] = useState(false)

  const handleInputEmailChange = (e) => setInputEmail(e.target.value)
  const handleInputPhoneChange = (e) => setInputPhone(e.target.value)
  const handleInputNameChange = (e) => setInputName(e.target.value)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [width, height] = useDeviceSize()

  const isErrorEmail = () => {
    return inputEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const isErrorPhone = () => {
    return inputPhone.match(
      /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/
    )
  }

  const isErrorName = () => {
    return inputName.match(/^([A-Z][a-z\-\']{1,50})|([А-Я][а-я\-\']{1,50})$/)
  }

  const sendMail = () => {
    const body = new FormData()
    body.append('email', inputEmail)
    body.append('name', inputName)
    body.append('tel', inputPhone)
    body.append('comment', inputComment)
    const antiCSRFToken = getAntiCSRFToken()
    const response = fetch('/api/nodemailer', {
      headers: {
        'anti-csrf': antiCSRFToken,
      },
      method: 'POST',
      body,
    }).then((res) => {
      onOpen()
      setInputComment('')
      setInputEmail('')
      setInputName('')
      setInputPhone('')
    })
  }
  return (
    <Box w={'100%'} minH={100} bg={'#b2a1ff'} color={'black'}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={'black'}>
          <Center>
            <VStack>
              <ModalHeader>Спасибо за обратную связь!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Сообщение отправлено</ModalBody>

              <ModalFooter>
                <Button colorScheme={'green'} mr={3} onClick={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </VStack>
          </Center>
        </ModalContent>
      </Modal>
      <Center>
        <Box w={'75%'} maxW={600}>
          <Text
            fontSize={width! > 800 ? '36px' : '19px'}
            fontWeight={500}
            color={'black'}
            textAlign={'center'}
            mt={8}
            mb={4}
          >
            Свяжитесь с нами и мы подберем инструменты для вашего бизнеса
          </Text>
          <FormControl isInvalid={!isErrorName()}>
            <Text color={'black'}>Фамилия Имя</Text>
            <Input
              type={'name'}
              bg={'whtie'}
              borderColor={'black'}
              value={inputName}
              onChange={(e) => handleInputNameChange(e)}
              placeholder={'Иванов Иван'}
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
            />
            {isErrorName() ? (
              <FormHelperText></FormHelperText>
            ) : isFocusedName ? (
              <FormErrorMessage mb={4}>Введите корректное Имя</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isInvalid={!isErrorEmail()}>
            <Text color={'black'}>Email:</Text>
            <Input
              type={'email'}
              bg={'whtie'}
              borderColor={'black'}
              value={inputEmail}
              onChange={(e) => handleInputEmailChange(e)}
              placeholder={'mail@example.ru'}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
            />
            {isErrorEmail() ? (
              <FormHelperText></FormHelperText>
            ) : isFocusedEmail ? (
              <FormErrorMessage mb={4}>Введите корректный Email</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isInvalid={!isErrorPhone()}>
            <Text color={'black'}>Телефон:</Text>
            <Input
              type="tel"
              bg={'whtie'}
              borderColor={'black'}
              value={inputPhone}
              onChange={(e) => handleInputPhoneChange(e)}
              placeholder={'+7 1234 567 890'}
              onFocus={() => setIsFocusedTel(true)}
              onBlur={() => setIsFocusedTel(false)}
            />
            {isErrorPhone() ? (
              <FormHelperText></FormHelperText>
            ) : isFocusedTel ? (
              <FormErrorMessage mb={4}>Введите корректный номер</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <Text color={'black'}>Коммментарий:</Text>
          <Textarea
            bg={'whtie'}
            borderColor={'black'}
            value={inputComment}
            mb={8}
            onChange={(e) => setInputComment(e.target.value)}
          ></Textarea>
          <Button
            type={'submit'}
            bg={'#00fe5f'}
            color={'black'}
            mb={20}
            isDisabled={isErrorEmail() && isErrorName() && isErrorPhone() ? false : true}
            onClick={sendMail}
          >
            Отправить
          </Button>
        </Box>
      </Center>
    </Box>
  )
}

export default HomeContactForm
