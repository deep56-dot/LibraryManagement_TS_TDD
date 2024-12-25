export class User {
    static Role = { LIBRARIAN: "LIBRARIAN", USER: "USER" };
  
    constructor(private name: string, private role: string) {
      if (!name || name.trim() === "") throw new Error("Name should not be null or empty");
      if (!Object.values(User.Role).includes(role)) throw new Error("Invalid user role");
    }
  
    getName(): string {
        return this.name;
      }
}
  