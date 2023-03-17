import { SimpleRolesIsAuthorized } from '@blitzjs/auth'
import { Field_group, Product, ProductType, Product_variable, User, Variable_value } from 'db'
declare module '@blitzjs/auth' {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User['id']
      role: Role
      orgId: number
    }
  }
}

export type Role = 'ADMIN' | 'USER'

export interface IEditorUI {
  id: number
  title: string
  tab: IEditorTab[]
}

export interface IEditorTab extends IProductTypes {
  isDisabled?: boolean
  group?: IEditorGroup[]
  add?: () => void
  del?: () => void
  upd?: () => void
}
export interface IEditorGroup extends Field_group {
  field: IEditorItem[]
  isDisabled?: boolean
  add?: () => void
  del?: () => void
  upd?: () => void
}
export interface IEditorItem extends IProductFields {
  isDisabled?: boolean
  add?: () => void
  del?: () => void
  upd?: () => void
}

export interface IJSONProduct extends IProduct {
  group?: IProductGroups[]
}

export interface IGPTProduct {
  id: number
  logo?: string
  longdesc?: string
  order: number
  shortdesc?: string
  title: string
  typeId: number
  isCompare?: boolean
  group?: [
    {
      id: number
      typeId: number
      order: number
      title: string
      field?: [
        { id: number; id_group: number; order: number; title: string; unit: string; value?: any }
      ]
    }
  ]
}

export interface IProduct extends Product {
  id: number
  logo?: string
  longdesc?: string
  order: number
  shortdesc?: string
  title: string
  typeId: number
  isCompare?: boolean
  Variable_value?: []
}
export interface IProductTypes extends ProductType {
  id: number
  title: string
  order: number
}

export interface IProductGroups extends Field_group {
  id: number
  typeId: number
  order: number
  title: string
  field?: IProductFields[]
}

export interface IProductFields extends Product_variable {
  id: number
  id_group: number
  order: number
  title: string
  unit: string
  value?: any
}
export interface IProductFieldValues extends Variable_value {
  id: number
  id_variable: number
  id_product: number
  order: number
  value: string
}
