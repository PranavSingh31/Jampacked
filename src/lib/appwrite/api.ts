import { INewUser, IUser } from "@/types";
import { ID, Query } from 'appwrite'
import { account, appwriteConfig, databases } from "./config";

//async function to create a new user account
//takes in a new user object in the form of INewUser, and returns a user object in the form of IUser
export async function createUserAccount(user: INewUser) {  
    try {
        const newAccount = await account.create( //create a new account using the appwrite api
            ID.unique(),
            user.email,
            user.password,
            user.number,
        );

        if(!newAccount) return Error('Account not created'); //if account creation fails, return error (due to appwrite error)

        const newUser = await saveUserToDB({ //save the user to the database
            accountId: newAccount.$id,
            email: newAccount.email,
            number: user.number,
            businessname: user.businessname,
            location: user.location,
        });
        return newUser; //return the new user object

    } catch (error) { //if there is an error, log it and return null
        console.log(error); 
        return null; 
    }
}

//async function to save a user to the database
//takes in a user object in the form of IUser, and returns a user object in the form of IUser
export async function saveUserToDB(user: IUser) {
    try {
        const newUser = await databases.createDocument( //create a new document in the database using the appwrite api
            appwriteConfig.databaseID,
            appwriteConfig.userCollection,
            ID.unique(),
            user,
        )

        return newUser;

    } catch (error) {
        console.log(error);
        return null;
    }
}

//async function to sign in a user
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
        return null;
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
            accountId: currentUser.documents[0].$id,
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
