import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = '';
  senha: string = '';
  usuarios: any;
  usuario: string = '';

  constructor(private http: HttpClient, private alertController: AlertController) {}

  async mensagem(m: string) {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      subHeader: 'Retorno',
      message: m,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async verificar() {
    await this.http.get<any>('http://192.168.1.112/projetoiap/apijson.php').subscribe(data => {
      this.usuarios = data;
      //this.mensagem(JSON.stringify(this.usuarios));
      this.usuario = JSON.stringify(this.usuarios);
      //this.mensagem((this.usuario.indexOf(this.nome).toString()));
      // O indexOf faz a procura da string dentro de outra, se ele não encontrar ele retorna -1
      if ((this.usuario.indexOf(this.nome) !== -1) && (this.usuario.indexOf(this.senha) !== -1)){
        this.mensagem('Acesso Permitido');
      } else {
        this.mensagem('Acesso Negado');
      }
    });
  }

}
