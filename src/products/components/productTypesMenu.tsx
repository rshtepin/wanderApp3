import React from 'react'
import { IProductTypes } from 'src/types'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

interface ProductTypesProps {
  type: IProductTypes[]
  onChange: (type: IProductTypes) => void
}
export function ProductTypesMenu({ type, onChange }: ProductTypesProps) {
  return (
    <Tabs
      bg={'white'}
      w={'100%'}
      borderRadius={6}
      overflow={'hidden'}
      onChange={(e) => onChange(type[e])}
    >
      <TabList>
        {type.map((tab, index) => (
          <Tab key={index}>{tab.title}</Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
