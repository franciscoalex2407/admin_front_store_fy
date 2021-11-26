import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../../services/message.service';
import { ModelService } from '../../../../services/model.service';

@Component({
  selector: 'app-busness-form',
  templateUrl: './busness-form.component.html',
  styleUrls: ['./busness-form.component.scss']
})
export class BusnessFormComponent implements OnInit {

  dados: any = { tipo: 1 };
  loadingCep: boolean = false;

  @Input() data;

  constructor(
    private service: ModelService,
    private message: MessageService,
    private ref: ChangeDetectorRef,
    private modalCtrl: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.data.uuid) {
      // this.dados = this.data;
      this.getDados(this.data.uuid);
    }
  }

  close(params = undefined) {
    this.modalCtrl.close(params);
  }

  getTitle() {
    if (this.dados.uuid) {
      return 'Alterar Cadastro';
    } else {
      return 'Novo Cadastro';
    }
  }

  getDados(uuid) {
    this.message.loading(true);
    this.service.getEmpresa(uuid).subscribe((res: any) => {
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
    this.service.updateEmpresa(this.dados, this.dados.uuid).subscribe((res: any) => {
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
    this.service.createEmpresa(this.dados).subscribe((res: any) => {
      this.message.loading();
      this.message.showSuccess(res.message);
      this.close(true);
    }, (erro) => {
      console.log(erro);
      this.message.showError(erro.error);
      this.message.loading();
    })
  }

  getAddress() {
    this.message.loading(true);
    this.service.getAdress(this.dados.cep).subscribe((resp: any) => {
      console.log(resp);
      this.dados.logradouro = resp.logradouro;
      this.dados.numero = resp.unidade;
      this.dados.bairro = resp.bairro;
      this.dados.cidade = resp.localidade;
      this.dados.uf = resp.uf;
      this.dados.ibge = resp.ibge;
      this.message.loading();
    })
  }

}
