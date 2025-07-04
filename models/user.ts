import mongoose, { Schema , model , models} from "mongoose";
import bcrypt from "bcryptjs";
import { connecToDatabase } from "../lib/db";

export interface IUser {
  email: string;
  password: string; 
 _id? : mongoose.Types.ObjectId;
 createdAt ? : Date;
 updatedAt ? : Date;

}

const userSchema = new Schema <IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    },
    
  password: 
  { type: String,
   required: true }, 
}
);
userSchema.pre("save", async function (next) {
 
  if (!this.isModified("password")) return next();
  {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
})

const User = models?.User ||model("User", userSchema); 

export default User; 




  