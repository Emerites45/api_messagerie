import { Component, inject, Injector, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceMessagerieService } from '../../core/services/service-messagerie.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';



export interface User {
  id: string;
  name: string;
  avatarUrl: string; // URL for the user's profile picture
}

export interface Message {
  contenu: string;
   etat: number;
   chatid: string
 }
 
 

 var Users: User[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1LHr8cXDBl7rruQhCJGDgdkP_a7f2EtnwBQWZap8drLJv05juxanEDmvW4FlYsWBxzw&usqp=CAU' },
  { id: '2', name: 'Bob', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1LHr8cXDBl7rruQhCJGDgdkP_a7f2EtnwBQWZap8drLJv05juxanEDmvW4FlYsWBxzw&usqp=CAU' },
  { id: '3', name: 'Charlie', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1LHr8cXDBl7rruQhCJGDgdkP_a7f2EtnwBQWZap8drLJv05juxanEDmvW4FlYsWBxzw&usqp=CAU' }
];


@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.scss'
})
export class MessagerieComponent implements OnInit {

 
 id_group = signal("")
  message: string = '';
  messages: string []= []
 
  a= signal("")
  messageservice= inject(ServiceMessagerieService)
  private _injector : Injector = inject(Injector);
  allgetmessages = this.messageservice.messages;
  allmessages: Message[] | undefined;
   

  

  ngOnInit(): void {
    
       
    this.messageservice.getallMessagers("66f010f8df659e49f49f2218").subscribe(
      messages => {
        this.allmessages = messages; // Mettez à jour allmessages avec les messages récupérés
        this.allmessages.forEach(message => {
          console.log("Message:", message); // Affiche chaque message dans la console
        });
      }
    )
   
    this.messageservice.getMessages().subscribe((message: string) => {
        this.messages.push(message);
        console.log("je suis le message recu "+message)
    });
}

  form: FormGroup;

 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        Message: [''],
        search: ['']
    });
}


/*
update_status(new_value: string){
  this.messages.update(()=> new_value)
 
 // this.status_effect()
}
*/

  onSignup() {
    // Handle form submission logic here
    console.log(this.form.value);
  }

  joinGroup(id:string){
     this.id_group.set('6866aaa6b8d05becf0d846a5')
        this.messageservice.join_group(this.id_group())
      
  }


  sendMessage() {
    console.log(this.form.valid)
     
    if (this.form.value.Message) {
      const newmessage : Message ={
              chatid: "66f010f8df659e49f49f2218",
              contenu: this.form.value.Message,
              etat:0,
      }
        this.messageservice.sendMessage(this.form.get('Message')?.value);
        this.message = '';

        this.messageservice.addMessager(newmessage).subscribe({
          next: response => {
            console.log('Message envoyé:', response);
          },
          error: error => {
            console.error('Erreur lors de l\'envoi du message:', error);
          },
          complete: () => {
            console.log('Envoi du message terminé');
          }
    });
    }
}
  onUserClick(user: User): void {
    // Ici, vous pouvez gérer ce qui se passe lors du clic sur un utilisateur
    console.log(`Vous avez cliqué sur ${user.id}`);
    this.id_group.set(user.id)
    // Vous pouvez également naviguer vers une autre page ou afficher plus d'informations
    // Par exemple, si vous avez un service de navigation :
    // this.router.navigate(['/user', user.id]);

   this.messageservice.hello()
  }

  users= Users;
}
