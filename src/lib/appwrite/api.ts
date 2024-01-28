import { INewUser, IUser } from "@/types";
import { ID, Query } from 'appwrite'
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

export async function signInAccount(user: {
    email: string;
    password: string;
}) {
    try {
        const session = await account.createEmailSession(
            user.email,
            user.password,
        );
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getCurrentUser(): Promise<IUser | null> {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error('No current user');

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollection,
            [Query.equal('accountId', currentAccount.$id)],
        );

        if (!currentUser || currentUser.documents.length === 0) throw new Error('No current user');

        return { 
            id: currentUser.documents[0].$id,
            email: currentUser.documents[0].email,
            number: currentUser.documents[0].number,
            businessname: currentUser.documents[0].businessname,
            location: currentUser.documents[0].location
        } as IUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}
