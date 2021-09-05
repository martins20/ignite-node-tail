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

const getCustomerBalace = (statement) => {
  const balance = statement.reduce((accumulator, opperation) => {
    if (opperation.type === "credit") {
      return accumulator + opperation.amount;
    }

    return accumulator - accumulator.amount;
  }, 0);

  return balance;
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

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getCustomerBalace(customer.statement);

  if (balance < amount) {
    return response.status(400).json({
      error: "Insufficient funds.",
    });
  }

  const statementOperation = {
    amount,
    type: "debit",
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return response.status(201).json(statementOperation);
});

app.get("/statements/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const formatedDate = new Date(date + "00:00").toDateString();

  const foundStatementsByDate = customer.statement.filter(
    (statement) => statement.created_at.toDateString() === formatedDate
  );

  return response.json(foundStatementsByDate);
});

app.put("/accounts", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).json();
});

app.get("/accounts", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete("/accounts", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(204).json();
});

app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const customerBalance = getCustomerBalace(customer.statement);

  return response.json({ balance: customerBalance });
});

app.listen(3333, () => console.log("⚙️  Api listening on port: 3333 ⚙️"));
