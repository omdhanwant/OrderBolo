import { Injectable } from '@angular/core';
import { schema } from 'ngx-editor';
import { DOMSerializer } from 'prosemirror-model';
import { Subject } from 'rxjs';


@Injectable()
export class UtilService {
   loading = new Subject<boolean>();
  constructor(){}


  showLoader(){
    this.loading.next(true);
  }

  hideLoader(){
    this.loading.next(false);
  }

  // to read the data form the cookies
  getCookieData(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  generateHTMLFormJsonDoc(jsonDoc){
    const contentNode = schema.nodeFromJSON(jsonDoc);
    const html: DocumentFragment = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);
    return html;
    }

    titleCase(str): string {
      str = str.toLowerCase();
      str = str.split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    }
}


