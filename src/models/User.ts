export class User {
    static Role = { LIBRARIAN: "LIBRARIAN", USER: "USER" };
  
    constructor(private name: string, private role: string) {
      if (!name || name.trim() === "") throw new Error("Name should not be null or empty");
    }
  
    
}
  