import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../../services/message.service';
import { ModelService } from '../../../../services/model.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  dados: any = { status: 1 };

  @Input() data;

  constructor(
    private service: ModelService,
    private message: MessageService,
    private modalCtrl: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.dados.company_id = this.data.company_id;
    if (this.data.dados.uuid) {
      // this.dados = this.data.dados;
      this.getDados(this.data.dados.uuid);
    }
  }

  close(params = undefined) {
    this.modalCtrl.close(params);
  }

  getTitle() {
    if (this.dados.uuid) {
      return 'Alterar Usuário';
    } else {
      return 'Novo Usuário';
    }
  }

  getDados(uuid) {
    this.message.loading(true);
    this.service.getUser(uuid).subscribe((res: any) => {
      console.log(res);
      this.dados = res;
      this.message.loading();
    }, (erro) => {
      console.log(erro);
      this.message.showError(erro.error);
      this.message.loading();
    })
  }

  submit(form) {
    if (!form.valid) {
      console.log(form);
      return
    }

    if (this.dados.uuid) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.message.loading(true);
    this.service.updateUser(this.dados, this.dados.uuid).subscribe((res: any) => {
      this.message.loading();
      this.message.showSuccess(res.message);
      this.close(true);
    }, (erro) => {
      this.message.showError(erro.error);
      this.message.loading();
    })
  }

  create() {
    this.message.loading(true);
    this.service.createUser(this.dados).subscribe((res: any) => {
      this.message.loading();
      this.message.showSuccess(res.message);
      this.close(true);
    }, (erro) => {
      console.log(erro);
      this.message.showError(erro.error);
      this.message.loading();
    })
  }

}
