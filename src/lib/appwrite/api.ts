import { INewUser } from "@/types";
import { ID } from 'appwrite'
import { account, appwriteConfig, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.number,
        );

        if(!newAccount) throw new Error('Account not created');

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            number: user.number,
            businessname: user.businessname,
            location: user.location,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId:string;
    email:string;
    number:string;
    businessname:string;
    location:string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollection,
            ID.unique(),
            user,
        )

        return newUser;

    } catch (error) {
        console.log(error);
        return error;
    }
}