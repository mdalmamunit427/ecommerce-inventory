import { Types } from "mongoose"

export type TUser = {
    _id: Types.ObjectId,
    email: string,
    password: string,
    role: string
}