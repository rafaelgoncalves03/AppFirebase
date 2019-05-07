import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/model/idea';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService } from 'src/app/services/idea.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  idea: Idea = {
    name: '',
    notes: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private ideaService: IdeaService,
    private toastCtrl: ToastController,
    private router: Router 
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    let id = this.activatedRoute.snapshot
      .paramMap.get('id');
    if(id){
      this.ideaService.getIdea(id).subscribe(
        data => this.idea = data
      )
    }
  }

  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  addIdea(){
    this.ideaService.addIdea(this.idea)
      .then(
        () => {
          this.router.navigateByUrl('/');
          this.showToast('Sucesso! Add OK');
        }, err => this.showToast('ERROR.')
      )
  }

  deleteIdea(){
    this.ideaService.deleteIdea(this.idea.id)
    .then(
      () => {
        this.router.navigateByUrl('/');
        this.showToast('Sucesso! Delete OK');
      }, err => this.showToast('ERROR.')
    )
  }

  updateIdea(){
    this.ideaService.updateIdea(this.idea)
    .then(
      () => {
        this.router.navigateByUrl('/');
        this.showToast('Sucesso! Update OK');
      }, err => this.showToast('ERROR.')
    )
  }
}