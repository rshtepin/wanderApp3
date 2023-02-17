import { SimpleRolesIsAuthorized } from '@blitzjs/auth'
import { User } from 'db'

export type Role = 'ADMIN' | 'USER'

export interface IProduct {
  id: Number
  logo?: String
  longdesc?: String
  order: Number
  shortdesc?: Number
  title: String
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
  title: String
  fields?: IProductFields[]
}
export interface IProductFields {
  id: Number
  id_group: number
  order?: Number
  title: String
  unit?: String
}

declare module '@blitzjs/auth' {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User['id']
      role: Role
    }
  }
}
