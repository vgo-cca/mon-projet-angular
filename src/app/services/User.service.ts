import { Subject } from "rxjs";
import { User } from "../models/User.model";

export class UserService {
    private users: User[] = [
        new User('Will', 'Alexander', 'will@will.com', 'jus d\'orange', ['coder', 'boire du café'])
    ];
    userSubject = new Subject<User[]>();

    emitUsers(){
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User){
        this.users.push(user);
        this.emitUsers();
    }
}