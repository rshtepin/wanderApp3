import { SimpleRolesIsAuthorized } from '@blitzjs/auth'
import { Field_group, User } from 'db'
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
  group: IEditorGroup[]
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
export interface IProduct {
  id: number
  logo?: string
  longdesc?: string
  order: number
  shortdesc?: string
  title: string
  typeId: number
  Variable_value?: []
}
export interface IProductTypes {
  id: number
  title: string
  order?: number
}

export interface IProductGroups {
  id: number
  typeId: Number
  order?: Number
  title: string
  fields?: IProductFields[]
}
export interface IProductFields {
  id: number
  id_group: number
  order?: number
  title: string
  unit?: string
}
export interface IProductFieldValues {
  id: number
  id_variable: number
  id_product: number
  order?: number
  value?: string
}
