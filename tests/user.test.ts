import {User} from "../src/models/User"

describe("User Class",()=>{
    test("Should successfully create a valid user instance", () => {
            const user = new User("Deep", User.Role.LIBRARIAN);
            expect(user).toBeDefined();
          });
          test("Should throw exception when Name is null or empty", () => {
            expect(() => new User("", User.Role.LIBRARIAN)).toThrow(
              "ISBN should not be null or empty"
            );
          });
          test("Should throw exception when Role is invalid", () => {
            expect(() => new User("", "My Role")).toThrow(
              "ISBN should not be null or empty"
            );
          });
})