## dev-post-assignment
A Next.js 15 project with Prisma and PostgreSQL, allowing users to log in, and perform operations based on their roles.

### Features
    User Roles:
    Admin: Can view all posts from all users.
    Regular User: Can create, view their own posts.
    Authentication: Secure login system with role-based access.
    Database: PostgreSQL with Prisma ORM.
    Seeding: Preloads the database with three users for testing.
### Technologies Used
    Frontend: Next.js 15
    Backend: Prisma
    Database: PostgreSQL
    Language: TypeScript

### Prerequisites
Node.js (>= 16.0.0)
PostgreSQL (Ensure the database is running)
npm or yarn


### Setup Instructions
1. Clone the Repository

```
git clone https://github.com/nahidnstu12/radius-theme-assignemt.git
cd radius-theme-assignemt
```

2. Install Dependencies
```
npm install
```

3. Configure Environment Variables
Create a .env file in the root of the project:
copy from .env.example and change your accordance

4. Setup the Database by docker
in terminal, go to /radius-theme-assignemt/docker
```
//to run postgres & pgadmin
docker-compose up -d 

//Run Prisma migrations to create the required tables:
npx prisma migrate dev --name init

```

5. Seed the Database
Run the seed script to create three sample users:

```bash
npm run seed
```

### Seeded Users
```
Admin User:
Email: admin@example.com
Password: password123
Regular User 1:
Email: user1@example.com
Password: password123
Regular User 2:
Email: user2@example.com
Password: password123
```


6. Start the Development Server
```
npm run dev
Visit the app at http://localhost:3015.
```


7. When user create post, for saving image, user need to create `public/uploads` folder otherwise this will throw error.

### Some snapshot from work

![Login Page](/public/snapshot/login.png)
![Admin Page](/public/snapshot/adminpage.png)
![Regular Page](/public/snapshot/regularPage.png)
![Create Page](/public/snapshot/createPosts.png)
