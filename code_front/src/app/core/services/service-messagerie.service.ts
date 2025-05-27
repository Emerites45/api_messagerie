import { inject, Injectable, Signal, signal } from '@angular/core';
import io from 'socket.io-client';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
interface Chat {
 
  members: Array<string>;
}


 export interface Message {
 contenu: string;
  etat: number;
  chatid: string
}




@Injectable({
  providedIn: 'root'
})
export class ServiceMessagerieService {


   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  
  private http = inject(HttpClient);
    messages = signal<Message[]>([])
  readonly url = 'http://localhost:3000/api/messages';
  constructor() { }


  
  addMessager(message: Message): Observable<Message> {

    const geturl=`${this.url}`
   //console.log("je suis url"+ geturl)
  return this.http.post<Message>(geturl,message );
}
  getallMessagers(id: string): Observable<Message[]> {
      const geturl=`${this.url}/${id}`
     //console.log("je suis url"+ geturl)
    return this.http.get<Message[]>(geturl).pipe(tap(messages =>{ this.messages.set(messages)}));
  }

  hello (){
    console.log("hello");
  };

  private socket = io('http://localhost:3000');


  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  join_group(id: string): void{

    this.socket.emit('join_group', id);
  }
  getMessages(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }
}
