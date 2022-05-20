import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo{
  constructor(
    public id:number,
    public description:string,
    public done:boolean,
    public targetDate:Date
  ){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  message='';
  todos !:Todo[]
  // [
  //   new Todo(1,'Learn to dance',false,new Date()),
  //   new Todo(2,'Become an expert at angular',false,new Date()),
  //   new Todo(3,'Visit India',false,new Date())
  // ]

  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos()
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('rahul').subscribe(
      response=>{
        console.log(response);
        this.todos=response;
      }
    )
  }

  deleteTodo(id: any){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('rahul',id).subscribe(
      response=>{
        console.log(response)
        this.message=`Delete of Todo ${id} successful! `;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id:any){
    console.log(`update todo ${id}`);
    this.router.navigate(['todos',id])
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }

}
