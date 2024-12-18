export interface IUser {
    id: number;               
    user: any;             
    email: string;            
    person_id: number;       
    person: IPerson;    
  }
  
  export interface IPerson {
    id: number;               // ID único de la persona
    ci?: string | null | undefined;      
    name?: string | null | undefined;    
    lastname?: string | null | undefined; 
    address?: string | null | undefined;  
    phone?: string | null | undefined;    
    photo?: string | null | undefined;    
  }
  