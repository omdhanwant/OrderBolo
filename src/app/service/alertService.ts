import { Injectable } from "@angular/core";
import swal from 'sweetalert';
@Injectable()
export class AlertService {
  constructor(){}

  getAlertInstance(){
    return swal;
  }

}
