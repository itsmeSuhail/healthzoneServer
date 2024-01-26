# HealthZone Server


**Introduction:**

HealthZone Server is a robust system designed to manage hospitals, psychiatrists, patients, and images with a focus on efficiency, error handling, and data validation.It provides a set of well-defined APIs for performing CRUD operations on hospitals, psychiatrists, patients, and images. Additionally, the server is equipped with features like caching, handling concurrent requests, API rate limiting, and data compression to ensure optimal performance.

 # Table of Contents
- [Features](#features)
- [Endpoint](#endpoints)
- [Libraries](#libraries)
- [Download Database and Api Files](#downloads)
- [Preview Images](#preview)
- [About](#about)
## Features

- **Efficient CRUD Operations:**
  - Add, retrieve, update, and delete hospitals, psychiatrists, patients, and images with ease.

- **Detailed Information Retrieval:**
  - Retrieve detailed information about hospitals, psychiatrists, and patients, including their associations.

- **Caching:**
  - Utilizes caching mechanisms to optimize performance by storing frequently accessed data.

- **Concurrent Request Handling:**
  - Handles concurrent requests gracefully to ensure data consistency and reliability.

- **API Rate Limiting:**
  - Implements rate limiting to prevent abuse and ensure fair API usage.
  - Users are allowed a maximum of 100 requests within a 5-minute time window.

- **Data Compression:**
  - Compresses data before transmission to enhance bandwidth efficiency and reduce latency.


## Endpoints

### Hospital

- **Add Hospital:**
  - Endpoint: `POST /api/v1/hospital/add`
  - Description: Add hospital details.
  ```javascript
  const link="http://localhost:3001/api/v1/hospital/add"
  const body={"name":"Naveen Hospital", "location":"Delhi"}
  ```
 
 - **Hospital Details By Id:**
  - Endpoint: `GET /api/v1/hospital/details/:id`
  - Description: Retrieve hospital name, psychiatrist array, total count, and total patient.
  ```javascript
  const link="http://localhost:3001/api/v1/hospital/details/456789012345"
  ```

- **Get All Hospitals:**
  - Endpoint: `GET /api/v1/hospital/getAll`
  - Description: Retrieve information about all hospitals.
  ```javascript
  const link="http://localhost:3001/api/v1/hospital/getAll"
  ```

- **Get Hospital by Id:**
  - Endpoint: `GET /api/v1/hospital/get/:id`
  - Description: Retrieve information about a specific hospital.
  ```javascript
   const link="http://localhost:3001/api/v1/hospital/get/456789012345"
  ```

- **Update Hospital By Id:**
  - Endpoint: `PUT /api/v1/hospital/update/:id`
  - Description: Update specific hospital details.
  -only given fields can be updated
  ```javascript
   const link="http://localhost:3001/api/v1/hospital/update/456789012345"
   const body={"name":"Naveen Hospital", "location":"Delhi"}
  ```
  

- **Delete Hospital By Id:**
  - Endpoint: `DELETE /api/v1/hospital/delete/:id`
  - Description: Delete a specific hospital.
  ```javascript
   const link="http://localhost:3001/api/v1/hospital/delete/456789012345"
  ```

### Psychiatrist

- **Add Psychiatrist:**
  - Endpoint: `POST /api/v1/psychiatrist/add`
  - Description: Add psychiatrist.
  ```javascript
   const link="http://localhost:3001/api/v1/psychiatrist/add"
   const body={
        "email": "dfs@gmail.com",
        "phone": "+918990785632",
        "password": "P1t04krj",
        "name": "vasu",
        "hospitalId": "1706176600"
    }
  ```

- **Psychiatrist Details By Id:**
  - Endpoint: `GET /api/v1/psychiatrist/details/:id`
  - Description: Retrieve psychiatrist name and details of all their patients.
  ```javascript
  const link="http://localhost:3001/api/v1/psychiatrist/details/400478901234"
  ```

- **Get All Psychiatrists:**
  - Endpoint: `GET /api/v1/psychiatrist/getAll`
  - Description: Retrieve information about all psychiatrists.
  ```javascript
  const link="http://localhost:3001/api/v1/psychiatrist/getAll"
  ```

- **Get Psychiatrist by Id:**
  - Endpoint: `GET /api/v1/psychiatrist/get/:id`
  - Description: Retrieve information about a specific psychiatrist.
  ```javascript
  const link="http://localhost:3001/api/v1/psychiatrist/get/400478901234"
  ```

- **Update Psychiatrist By Id:**
  - Endpoint: `PUT /api/v1/psychiatrist/update/:id`
  - Description:  Update specific psychiatrist details.
  ```javascript
  const link="http://localhost:3001/api/v1/psychiatrist/update/400478901234"
  //one of these fields value can be updated
  const body={
        "email": "dfs@gmail.com",
        "phone": "+918990785632",
        "name": "vasu",
        }
  ```

- **Delete Psychiatrist By Id:**
  - Endpoint: `DELETE /api/v1/psychiatrist/delete/:id`
  - Description: Retrieve information about a specific psychiatrist.
  ```javascript
  const link="http://localhost:3001/api/v1/psychiatrist/delete/400478901234"
  ```

### Patient

- **Add Patient:**
  - Endpoint: `POST /api/v1/patient/add`
  - Description: Add patient. details.
  ```javascript
  const link="http://localhost:3001/api/v1/patient/add"
  //send this data as form-data in postman
  const body={"name":"vasu", "email":"strong@gmail.com","phone":"+918368992566","password":"Rz3bg5556","address":"purple light,near school","image":"image data","psychiatrist":"100145678901"}
  ```

- **Get All Patients:**
  - Endpoint: `GET /api/v1/patient/getAll`
  - Description: Retrieve information about all patients.
  ```javascript
  const link="http://localhost:3001/api/v1/patient/getAll"
  ```

- **Get Patient by Id:**
  - Endpoint: `GET /api/v1/patient/get/:id`
  - Description: Retrieve information about a specific patient.
  ```javascript
   const link="http://localhost:3001/api/v1/patient/get/170620117013"
  ```

- **Update Patient by Id:**
  - Endpoint: `PUT /api/v1/patient/update/:id`
  - Description:  Update specific patient details.
  ```javascript
   const link="http://localhost:3001/api/v1/patient/update/170620117013"
   //one of these fields can be updated
   const body={"name":"vasu", "email":"strong@gmail.com","phone":"+918368992566","address":"purple light,near school"}
  ```

- **Delete Patient by Id:**
  - Endpoint: `DELETE /api/v1/patient/delete/:id`
  - Description:  Delete a specific patient.
  ```javascript
   const link="http://localhost:3001/api/v1/patient/delete/170620117013"
  ```

### Image
- **Get Image By Name**
  - Endpoint: `GET /api/v1/image/get/:imagename`
  - Description:  Retrieve a specific image using imagename.
  ```javascript
  //bydefault i'm storing image in db and storing its whole path in patient field.
  //this link would be available to patient
   const file name="af12ef1c9061d1cde199e8098ae4520d.jpg";
   const path="http://localhost:3001/api/v1/image/get/"
   const link="http://localhost:3001/api/v1/image/get/af12ef1c9061d1cde199e8098ae4520d.jpg"
  ```

## Libraries 

- [mysql2](https://www.npmjs.com/package/mysql2)
  - Purpose: Used for interacting with the database
- [apicache](https://www.npmjs.com/package/apicache)
  - Purpose: Used for handling API response caching.
- [compression](https://www.npmjs.com/package/compression)
  - Purpose: Used for data compression.
- [cluster](https://www.npmjs.com/package/cluster)
  - Purpose: Used for handling multiple requests through clustering.
- [rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible)
  - Purpose: Used for API rate limiting.
- [multer](https://www.npmjs.com/package/multer)
  - Purpose: Used for handling image uploads.
- [validator](https://www.npmjs.com/package/validator)
  - Purpose: Used for field validation.
- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)
  - Purpose: Used for validating phone numbers with country codes.






## Important*
- Configure the database after installing the application.
- Set the following variables in the .env file:
    ```javascript
    DB_HOSTNAME=127.0.0.1
    DB_NAME=healthzone
    DB_USERNAME=root
    DB_PASSWORD=1
    ```

## Downloads
  - Downoad Files from [**DownloadFiles**](https://github.com/itsmeSuhail/healthzoneServer/tree/master/DownloadFiles) folder.Else given below

   **mysql Database File**
   - All tables and values ​​are present to execute task.
   - file link => [healthzoneDb](https://github.com/itsmeSuhail/healthzoneServer/blob/master/DownloadFiles/healthzone.sql) 
   ```bash
    # Open cmd
    # Navigate to the download file path
    # Execute the following command to import the database
    mysql -u root -p <databasename> < healthzone.sql

   # Don't forget to add the database name in the .env file
   ```

   **Postman Api's Folder**
   - folder link => [postman Api endPoints](https://github.com/itsmeSuhail/healthzoneServer/blob/master/DownloadFiles/healthzone_server.postman_collection.json)
   ```bash
   # Open Postman
   # Select the "Import" option
   # Choose the file path of the Postman API collection

   ```
  ## Preview
  ***Server Images***
  
   ![1](https://github.com/itsmeSuhail/healthzoneServer/assets/98868023/52ec3bb1-9d5e-42d0-9e09-36b3d28cb3d1)
  ![2](https://github.com/itsmeSuhail/healthzoneServer/assets/98868023/1bbce2ab-9d7e-4a62-9177-37fe5e22f105)
  ![3](https://github.com/itsmeSuhail/healthzoneServer/assets/98868023/f8198063-eda2-40c1-95ce-8e89f4ef22f1)
  ![4](https://github.com/itsmeSuhail/healthzoneServer/assets/98868023/96f2f6d7-698d-4c98-ba9e-033e235b9138)


**Getting Started:**

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## About
**Created By:** Mr Suhail
- Email address letxandy@gmail.com
