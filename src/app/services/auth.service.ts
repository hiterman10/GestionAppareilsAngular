export class AuthService{

 isAuth =false;

 signIn(){
     return new Promise(
         (resolve, reject)=>{
        setTimeout(
            () => {
                this.isAuth = true; //verification de l'état connecté de l'utilisateur
                resolve(true);
            }, 2000
        ) ;   
         }, 
     );
 }

 signOut() {
     this.isAuth = false;
 }
}