
export interface GazetteCertificate {
   user_id: number;
   old_name: string;
   new_name: string;
   address: string;
   mobile: string;
   pin_code: string;
   reason_of_change_name: string;
   birth_date: string;
 }

 export interface AdharCard {
   user_id: number;
   full_name: string;
   pan_card: string;
   full_address: string;
   city: string;
   state: string;
   pin_code: string;
   birth_date: string;
   filenames: File[];
 }
