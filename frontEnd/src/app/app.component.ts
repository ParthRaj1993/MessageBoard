import { Component,OnInit,Inject } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    this.getMessages();
  }

 constructor(private http:Http,
 public dialog: MdDialog) { }
  title = 'app';
  topic :string;
  message: string;
  messages :any;
  _id:string;
  _message:string;
  _topic:string;
  edit :string;
  url='http://localhost:8000/home';

onEdit(id,topic,text){
console.log(id+text);
this._id=id;
this._topic=topic;
this._message=text;
this.editDialog();
}
 getMessages(){
   this.http.get(this.url)
    .map((response: Response) =>response.json()).subscribe(
      (data: any) => {
        this.messages=data;
      }
    )
 }

editDialog() : void{
  let dialogRef = this.dialog.open(createOrEditMessage, {
      width: '400px',
      data: { _id: this._id,_topic:this._topic, _message: this._message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.getMessages();
    });
}
   openDialog(): void {
    let dialogRef = this.dialog.open(createOrEditMessage, {
      width: '400px',
      data: { topic: this.topic, message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.getMessages();
    });
  }
}



@Component({
  selector: 'createOrEditMessage',
  templateUrl: 'createOrEditMessage.html',
    styleUrls: ['./createOrEditMessage.css']
})

export class createOrEditMessage {
url='http://localhost:8000/';
newMessage:any={
  "topic":"",
  "message":""
}
updateMessage:any={
  "_id":"",
  "topic":"",
  "message":""
}
  constructor(
    public dialogRef: MdDialogRef<createOrEditMessage>,private http:Http,
    @Inject(MD_DIALOG_DATA) public data: any) { }
  _id=this.data._id;
  _message=this.data._message;
  _topic=this.data._topic;
  onNoClick(): void {
    this.dialogRef.close();
    console.log('-----'+this._message+this._topic);
  }

    onSend(topic,message): void {
      console.log(topic+message);
    this.sendMessage(topic,message);
  }

   sendMessage(topic,message){
     this.newMessage.topic=topic;
     this.newMessage.message=message;
   const body= this.newMessage;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
     this.http.post(this.url+'save',body,{
      headers:headers
    }).map((data : Response) => data.json()).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
      this.dialogRef.close(this.newMessage);
 }

   onSave(id,topic,message){
    // alert(topic+id+message);
     this.updateMessage._id=id.trim();
     this.updateMessage.topic=topic;
     this.updateMessage.message=message;
   const body= this.updateMessage;
    const headers= new Headers();
    headers.append('Content-Type','application/json');
     this.http.post(this.url+'update',body,{
      headers:headers
    }).map((data : Response) => data.json()).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
      this.dialogRef.close(this.updateMessage);
 }

}
