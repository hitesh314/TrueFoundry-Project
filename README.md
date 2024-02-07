I have created the backend service using REST Apis and SQL Databases
Web Frameworks used -> Node.js, Express.js(Backend)
Database used -> Clickhouse (Sql)

API Endpoints and Examples:

1.User Authentication:

--POST /api/authenticate/login
Input: JSON with email and password (example: "email": "example@example.com", "password": "password123")
Output: JSON with user info and success message (example: "userId": 123, "name": "John Doe", "email": "example@example.com", "message": "Login successful.")

--POST /api/authenticate/register
Input: JSON with full name, email, and password (example: "fullName": "Jane Doe", "email": "jane@example.com", "password": "securepassword")
Output: JSON with registered user info and success message (example: "userId": 124, "name": "Jane Doe", "email": "jane@example.com", "message": "The user has been registered successfully.")

2.User Prompts:

--POST /api/chatgpt/request
Input: JSON with prompt message and user ID (example: "promptMessage": "Tell me a joke.", "userId": 123")
Output: JSON with generated response (example: "result": "Why don't scientists trust atoms? Because they make up everything!")

3.Prompt Statistics:

--POST /api/requests/history
Input: JSON with user ID and time period (example: "userId": 123, "timePeriod": 7")
Output: JSON array with past request details (example: includes request ID, user ID, created time, status, prompt, response, token counts, and response time)
