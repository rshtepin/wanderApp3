import React from 'react'
import { IProductTypes } from 'src/types'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center } from '@chakra-ui/react'

interface ProductTypesProps {
  type: IProductTypes[]
  onChange: (type: IProductTypes) => void
}
const ProductTypesMenu = ({ type, onChange }: ProductTypesProps) => {
  return (
    <Center>
      <Tabs
        bg={'blackAlpha.0'}
        w={'100%'}
        overflow={'hidden'}
        onChange={(e) => onChange(type[e]!)}
        colorScheme={'green'}
      >
        <TabList>
          {type.map((tab, index) => (
            <Tab key={index}>{tab.title}</Tab>
          ))}
        </TabList>
      </Tabs>
    </Center>
  )
}
export default ProductTypesMenu
