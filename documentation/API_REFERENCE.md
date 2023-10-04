### API Reference

- By default, API endpoints require an `authentication token` either in the Cookies or the Authorization Header as `Bearer <token>`.
- If a token is provided in both the Cookies and the Authorization Header, the token from the Authorization Header takes precedence.

#### Example

```bash
curl http://54.167.130.123/api/app/fetchTask/1
    -H 'Authorization: Bearer <token>
```

#### Auth Routes

| Feature  | Type | Route                                 | Access |
| -------- | ---- | ------------------------------------- | ------ |
| Login    | POST | http://54.167.130.123/api/auth/login    | Public |
| Register | POST | http://54.167.130.123/api/auth/register | Public |

#### Admin Routes

| Feature             | Type | Route                                    | Access    |
| ------------------- | ---- | ---------------------------------------- | --------- |
| Get all tasks added | POST | http://54.167.130.123/api/admin/fetchTasks | Protected |
| Create a new Task   | POST | http://54.167.130.123/api/admin/createTask | Protected |

#### App Routes

| Feature                 | Type | Route                                      | Access    |
| ----------------------- | ---- | ------------------------------------------ | --------- |
| Get total points        | POST | http://54.167.130.123/api/app/points         | Protected |
| Compelete a Task        | POST | http://54.167.130.123/api/app/completeTask   | Protected |
| Get all completed tasks | POST | http://54.167.130.123/api/app/completedTasks | Protected |
| Get all tasks added     | POST | http://54.167.130.123/api/app/fetchTasks     | Protected |
| Get a specific task     | GET  | http://54.167.130.123/api/app/fetchTask/:id  | Protected |
