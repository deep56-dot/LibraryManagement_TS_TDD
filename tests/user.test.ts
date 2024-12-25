import {User} from "../src/models/User"

describe("User Class",()=>{
    test("Should successfully create a valid user instance", () => {
            const user = new User("Deep", User.Role.LIBRARIAN);
            expect(user).toBeDefined();
            
          });
})