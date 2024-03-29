export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};

export type INewUser = {
    accountId: string;
    businessname: string;
    location: string;
    number: string;
    email: string;
    password: string;
};

export type IUser = {
    accountId:string;
    email:string;
    number:string;
    businessname:string;
    location:string;
};