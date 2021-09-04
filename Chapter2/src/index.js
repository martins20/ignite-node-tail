const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/accounts", (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists.",
    });
  }

  app.get("/statements", (request, response) => {
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer) {
      return response.status(404).json({
        error: "Customer not found.",
      });
    }

    return response.json(customer.statement);
  });

  const createdCustomer = { id: uuidv4(), name, cpf, statement: [] };

  customers.push(createdCustomer);

  return response.status(201).json(createdCustomer);
});

app.listen(3333, () => console.log("⚙️  Api listening on port: 3333 ⚙️"));
