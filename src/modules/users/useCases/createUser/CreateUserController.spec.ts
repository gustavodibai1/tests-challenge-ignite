import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database";

import { app } from "../../../../app";

let connection: Connection;

describe("Create User Controller", () => {
    beforeAll( async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to crete a new user", async() => {

        const passwordHash = await hash("user", 8);
        
        const response = await request(app)
        .post("/users")
        .send({
            name: "gustavodibai2",
            email: "gustavo2@dibai.com.br",
            password: passwordHash,
        });

        console.log(response.body);

        expect(response.status).toBe(201);
    });
});