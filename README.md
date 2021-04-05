# plantopi
PlantoPi.

In order to use this project, you must follow the next instructions:

 download the project: it can be done in different ways, for instance:

     -Copy the link located in "code" ( https://github.com/CxGarcia/thesis-project.git )

     -By using the terminal go to the folder where the project will be store, then write 
     "git clone https://github.com/CxGarcia/thesis-project.git"

     -Another option could be by using Download ZIP

 Once you have got everything, use your terminal to run npm install on the server and client folder, so all the dependencies  will be installed.

Now all the dependencies are installed. However, you will also need to create new files where environment variables will be.

   On the server-side, you will need two new files:

     -.env :
     MQTT_BROKER_IP= "Broker IP"
     MQTT_PORT= "MQTT o mosquito PORT"
     WS_PORT= "Web socekt PORT"
     HTTP_PORT="HTTP or Nest.js Port"

    -ormconfig.json: this file will contain the variables related to the database, you will an example below.
    [
     {
       "type": "postgres",
       "host": "localhost",
       "name": "development",
       "port": 5432,
       "username": "xxxxxx",
       "password": "xxxxxxx",
       "database": "thesisdb",
       "entities": ["dist/**/*.entity.js"],
       "synchronize": true,
       "dropSchema": true
     },
     {
        "type": "postgres",
        "name": "test",
        "host": "localhost",
          "username": "xxxxxxx",
        "password": "xxxxxxx",
        "database": "thesistestdb",
        "entities": ["dist/**/*.entity.js"],
        "synchronize": true,
       "dropSchema": true
      }
    ]

   You must repeat this process on the client-side, creating a new file call .env:

      -.env 
      REACT_APP_SOCKET_HOST="URL base where the socket will send information, we used http://localhost" 
      REACT_APP_SOCKET_PORT=""Socket Port, we used 3002"
      REACT_APP_API_HOST="URL base where  Nest.js  will send information, we used http://localhost" 
      REACT_APP_API_PORT="PORT where react will work, by default its 3001 but it can be changed"
      
 Lastly, create the databases on PostgreSQL, and once you execute the commands below, the tablas will be generated automatically
 
 Once you have the set up ready, there are different ways to make the software works, but keep in mind, it always will be done by the terminal.

    -the shortest way is by running  ###"npm run dev"  from the root folder,
    it will start the whole project, including client   and server.

  Another option is running the server and the client from different commands.

    -from the server folder can be run "npm start" and only the server will be working.
    -from the client folder can be run "npm start" and only the client will be working.   
    
 
