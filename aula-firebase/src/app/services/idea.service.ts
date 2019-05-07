import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../model/idea';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  ideas: Observable<Idea[]>;
  ideaCollection: AngularFirestoreCollection<Idea>;

  constructor( private afs: AngularFirestore ) { 
    this.ideaCollection = this.afs.collection<Idea>('ideas');
    //this.ideas = this.ideaCollection.valueChanges();
    this.ideas = this.ideaCollection.snapshotChanges().
      pipe(
        map( actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          } );
        } )
      );
   }

  getIdeas(): Observable<Idea[]>{
    return this.ideas;
  }

  getIdea(id: string): Observable<Idea>{
    return this.ideaCollection.doc<Idea>(id).valueChanges().
      pipe(
        take(1),
        map ( idea =>{
          idea.id = id;
          return idea;
        } )
      );
  }

  addIdea(idea: Idea): Promise<DocumentReference>{
    return this.ideaCollection.add(idea);
  }

  updateIdea(idea: Idea): Promise<void>{
    return this.ideaCollection.doc(idea.id).
      update({
        name:idea.name, notes:idea.notes
      });
  }

  deleteIdea(id: string): Promise<void>{
    return this.ideaCollection.doc(id).delete();
  }
}