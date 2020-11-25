import { Injectable } from "@angular/core";
import {MessageService} from 'primeng/api';
// import swal from 'sweetalert';
@Injectable()
export class AlertService {
  constructor(private messageService: MessageService){}
      addSingle(severity,message,detail) {
        this.messageService.add({severity:severity, summary: message, detail:detail});
    }

    addMultiple() {
        this.messageService.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
                                    {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
    }

    clear() {
        this.messageService.clear();
    }

}
