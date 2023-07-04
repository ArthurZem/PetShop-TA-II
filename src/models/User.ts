export default class User {
    private login: string;
    private password: string;

    constructor(login: string, password: string){
        this.login = login;
        this.password = password;
    }

    public getLogin(): string{
        return this.login;
    }

    public getPassword(): string{
        return this.password;
    }


}