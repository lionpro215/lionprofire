import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { Database, set, update, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { observeInsideAngular } from '@angular/fire';
// import * as firebase from '@angular/fire'

// import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class AppComponent {
  getDatabase(store: any) {
    throw new Error('Method not implemented.');
  }
  title = 'LionPro-fire';

  todo: Task[] = [
    {
      title : 'reparer mon pc',
      description: "aller che le maintenancier reparer mon pc"
    },
    {
      title: 'achever ma tache de la semaine',
      description: "utiliser angular et firebase afin de terminer ma tache"
    },
    {
      title : 'reparer mon pc',
      description: "aller che le maintenancier reparer mon pc"
    },
    {
      title: 'achever ma tache de la semaine',
      description: "utiliser angular et firebase afin de terminer ma tache"
    }
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  // editTask(list: string, task: Task): void{}
  // drop(event: CdkDragDrop<Task[]|null>): void{
  //   if (event.previousContainer === event.container) {
  //     return
  //   }
  //   if (!event.container.data || !event.previousContainer.data) {
  //     return
  //   }
  //   transferArrayItem(
  //     event.previousContainer.data,
  //     event.container.data,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
  // editTask(list: string, task: Task): void {}

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
        alert('la tache a ete ajouter')
      });
  }


  //**********fonction firebase**********

  // constructor(private dialog: MatDialog, private store: Database) {}

  // todo = this.getd ('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  // todo = this.getDatabase(this.store).collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  // inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  // done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  // addTask(task:any){
    // set(ref(this.store, 'todo/' + id)){

    // }
    // set(ref(this.store, 'todo/' + task.id), {
    //   title: task.title,
    //   description: task.description,
    // });

  // }

}
