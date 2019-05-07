import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from 'src/app/model/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {

  ideas: Observable<Idea[]>;

  constructor( private ideaService: IdeaService ) { }

  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }

}