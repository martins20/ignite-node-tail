const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// Middleware

const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({
      error: "Customer not found.",
    });
  }

  request.customer = customer;

  return next();
};

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

  const createdCustomer = { id: uuidv4(), name, cpf, statement: [] };

  customers.push(createdCustomer);

  return response.status(201).json(createdCustomer);
});

// app.use(verifyIfExistsAccountCPF);

app.get("/statements", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post("/deposits", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    type: "credit",
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return response.status(201).json(statementOperation);
});

app.listen(3333, () => console.log("⚙️  Api listening on port: 3333 ⚙️"));
