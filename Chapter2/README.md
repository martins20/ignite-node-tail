# Chapter 2 

## FinApi - Finantial Api

### Requirements

- [x] Must be possible to create an account.
- [x] Must be possible to search the bank statement of the client.
- [x] Must be possible to make a deposit.
- [x] Must be possible to make a withdrawal.
- [x] Must be possible to search the bank statement by date.
- [x] Must be possible to update the client account data.
- [x] Must be possible to get the client account data.
- [ ] Must be possible to delete an account.

### Business Rules

- [x] It shouldn't be possible to create an account with an existing CPF.
- [x] It shouldn't be possible to make a deposit with an nonexistent account.
- [x] It shouldn't be possible to search a bank statement with an nonexistent account.
- [x] It shouldn't be possible to make a withdrawal with an nonexistent account.
- [x] It shouldn't be possible to make a withdrawal if the balance is insufficient.
- [ ] It shouldn't be possible to delete an nonexistent account.


### Tips

- Inside of project you'll find the insomnia file to test the routes.