import { Button, Grid, GridItem, Heading } from '@chakra-ui/react'
import GroupsEditor from 'src/products/Editor/components/GroupsEditor'
import FieldsEditor from 'src/products/Editor/components/FieldsEditor'
import TypesEditor from 'src/products/Editor/components/TypesEditor'
import React, { useState } from 'react'

interface IEditorUIProps {
  menubuttons: any
}

function EditorUI({ menubuttons }: IEditorUIProps) {
  const [currentComponent, setCurrentComponent] = useState<String>('fields')

  function Main() {
    switch (currentComponent) {
      case 'types':
        return <TypesEditor />
      case 'groups':
        return <GroupsEditor />
      case 'fields':
        return <FieldsEditor />
      default:
        return <FieldsEditor />
    }
  }

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h="100vh"
      w="50vw"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" area={'header'} textAlign="center">
        Редактор
      </GridItem>
      <GridItem pl="2" bg="blackAlpha.100" textAlign="center" area={'nav'} borderRadius={10}>
        <Heading mt={2} mb={2} size="md">
          Меню
        </Heading>

        <Button
          w="90%"
          colorScheme="blue"
          mb={2}
          size="xs"
          onClick={() => setCurrentComponent('types')}
        >
          Типы
        </Button>
        <Button
          w="90%"
          colorScheme="blue"
          mb={2}
          size="xs"
          onClick={() => setCurrentComponent('groups')}
        >
          Группы
        </Button>
        <Button
          w="90%"
          colorScheme="blue"
          mb={2}
          size="xs"
          onClick={() => setCurrentComponent('fields')}
        >
          Поля
        </Button>
      </GridItem>
      <GridItem pl="2" area={'main'}>
        <Main />
      </GridItem>
      <GridItem pl="2" bg="black" color="white" area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  )
}

export default EditorUI
