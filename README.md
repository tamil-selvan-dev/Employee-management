# Employee Management System
This project contains dashboards for the superuser,admin and users and we can see and access the datas in this and this will givw you a idea about how a dashborad for a company will be look like.
## Features
 - Manage Employees Datas.
 - Track Projects history.
 - Api endpoints to do crud operations for employees, products,tasks,jobs.
 - Implemented login access for the Dashboards.
## Installation
 1. Clone the repository:
    ```shell
    git clone [https://github.com/Gururaj-21/Library-Management.git](https://github.com/tamil-selvan-dev/Employee-management.git)
    cd .\Employee-management\
    ```
 2. Create a virtual environment and activate it:
    ```shell
    python -m venv venv
    source venv/bin/activate 
    ```
 3. Install the requirements:
    ```shell
    pip install -r requirements.txt
    ```
 4. Apply Migrations:
    ```shell
    python manage.py makemigrations
    python manage.py migrate
    ```
 5. Start the development server:
    ```shell
    python manage.py runserver
    ```
## Requirements
- Python3
- Django
- Rest Frame Work
- Sqlite3
### Using Postman Collections

To easily test the API endpoints, you can use Postman collections. Follow these steps:

1. **Install Postman:**

    Download and install Postman from the [official website](https://www.postman.com/downloads/).

2. **Import the Collection:**

    - Open Postman.
    - Click on the `Import` button.
    - Select the `File` tab.
    - Click `Choose Files` and select the `api collection.postman_collection` file provided in this repository.

3. **Using the Requests:**

    - Open the imported collection.
    - Each folder contains requests for CRUD operations for borrowers, books, and borrowing history.
    - Click on any request to open it.
    - Click `Send` to execute the request.
## Credentials
You can Create the users in registers But, if you want access the existing data you can use this below Credentials.
- Superuser(Dashboard): Email: super@gmail.com | Password: super
- Admin(Dashboard): Email: admin@gmail.com | Password: admin
- User(Dashboard):
  - Email: tamil@gmail.com | Password: tamil
  - Email: guru@gmail.com | Password: guru
  - Email: karan@gmail.com | Password: karan
  - Email: karthick@gmail.com | Password: karthick
  - Email: santhosh@gmail.com | Password: santhosh
  - Email: sujith@gmail.com | Password: sujith
  - Email: vijay@gmail.com | Password: vijay
  - Email: vignesh@gmail.com | Password: vignesh
  - Email: kavin@gmail.com | Password: kavin
  - Email: sethu@gmail.com | Password: sethu
## Output Model
For the output of the project ypu can visit the **output.docx**, in that file you can see the images of the dashboards
## Django
- first in the login we can give a email and password for access the dashboards if you want to create a user account you can create on the register.
- if you want to access the superuser and admin dashboards use the above credentials for that.
- in **superuser** dasboard we can see the employees,products,tasks and jobs datas.
- we can only see the datas in it we can't change or delete the datas
- in **admin** dashboard we can access the datas that we accesssed in the superuser dashboard and extar we can also access the leave datas of employees.
- in **admin** dashboard we can change the datas in it.
- next in the **user** dashboard we can see the task details of the particular login users datas and also we can apply for the leave also.
- so this is the datas that we are accessing and the functionalities in the project.  
