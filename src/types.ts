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
  id: Number
  typeId: Number
  order?: Number
  name: String
}
export interface IProductFields {
  id: Number
  id_group: Number
  order?: Number
  name: String
  unit: String
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
