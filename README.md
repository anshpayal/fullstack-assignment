# Objective:
The goal of this assignment is to evaluate your proficiency in developing a web application using
Angular for the frontend and NestJS for the backend. This assignment will focus on creating a
web application that involves forms, tables, and the ability to generate, download, and view PDF
documents based on the data in the table.

### Functionalties:
- User form component
- User table Component: See all users which are get added from user form.
- Delete the user from table
- Edit the user from table
- Generate the pdf of user-table content.
- PDF view within the application

### Instruction to run locally:
1. Navigate to the backend directory:
```
cd backend
cd nestjs-backend
```

2. Install dependencies:
```
npm install
```

3. Setup Database:
```
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Replace with your MySQL host
      port: 3306, // Replace with your MySQL port
      username: 'your_username', // Replace with your MySQL username
      password: 'your_password', // Replace with your MySQL password
      database: 'userdata', // Replace with your desired database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
})
```

5. Start the backend server:
```
npm run start
```

6. Navigate to the frontend directory:
```
cd ../frontend
cd angular-frontend
```

7. Install dependencies:
```
npm install
```

8. Start the Angular development server:
```
ng serve
```

### Library Used: 
- @nestjs/typeorm: This is the official NestJS module for TypeORM integration.
- mysql: This is the MySQL driver for TypeORM.
- typeorm: This is the TypeORM library itself.
- jspdf: A library to generate PDFs in JavaScript. 
- jspdf autotable:  Table plugin for jsPDF. Generate PDF tables with Javascript.
- ng2-pdf-viewer: PDF Viewer Component for Angular 5+