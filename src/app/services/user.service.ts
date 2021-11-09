import { Subject } from "rxjs";
import { User } from "../models/user.model";

export class UserService {
    private users: User[] = [
     {
         firstName: 'Herman',
        lastName: 'Fodjo',
        email: 'djiloherman@gmail.com',
        drinkPreference: 'Pamplemousse',
        hobbies:[
            'Etudier',
            'Manager',
        ]
    }
    ];
    userSubject = new Subject<User[]>();


    emitUsers(){
        this.userSubject.next(this.users.slice());  // permet de faire une copie 
    }

    addUsers(user: User){
        this.users.push(user);
        this.emitUsers();
    }
}