export interface Orders {
   id:number;
   user_id:string;
   document_id:string;
   name:string;
   address:string;
   mobile:string;
   city:string;
   state:string;
   pin_code:string;
   amount:string
   status:string;
   created_at:Date;
   updated_at:Date;
}