export class User {
   // firstName: string;
    //lastName: string;

    constructor(public firstName: string, 
                public lastName: string,
                public email: string,
                public drinkPreference: string,
                public hobbies?: string[] // les hobbies sont optionnelles grace au ? et public permet de recuperer chacune des données dans une autre classe
                ){
        //this.firstName = firstName;
        //this.lastName = lastName;
    }
}