# [gem-slack](https://github.com/Gem-Guys/Gem-Slack#readme) *1.0.0*

> Slack Clone with additional features


### database/Models/Files.js


#### addFile(newFile) 

Adds a File to the database




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newFile | `STRING`  | File saved to db. | &nbsp; |




##### Returns


- `Void`



#### getFiles() 

Retrieves all Files from the database






##### Returns


-  A promise that will get all Files.




### database/Models/Messages.js


#### initMessage() 

Initialize Message Table






##### Returns


- `Void`



#### addMessage(newMessage) 

Adds a message to the database




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newMessage | `Object`  | Message saved to db. | &nbsp; |




##### Returns


- `Void`



#### getMessages() 

Retrieves all Messages from the database sorted by date created






##### Returns


-  A promise that will get all Messages.



#### getRoomMessages() 

Retrieves all Messages from the provided room sorted by date created






##### Returns


-  A promise that will get all Messages from the provided room.




### database/Models/Rooms.js


#### addRoom(newRoom) 

Adds a room to the database




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newRoom | `STRING`  | - Room name saved to db. | &nbsp; |




##### Returns


- `Void`



#### getRooms() 

Retrieves all Rooms from the database






##### Returns


-  A promise that will get all rooms.



#### getRoomById(id) 

Retrieves a room with the provided id




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `STRING`  | Target ID | &nbsp; |




##### Returns


-  A promise that will get room with provided ID




### database/Models/User.js


#### addUser(newUser) 

Adds a user to the database




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newUser | `Object`  | User data saved to db. | &nbsp; |




##### Returns


- `Void`



#### updateUser(name, room) 

Update Users room to the provided room




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `STRING`  | Name of User | &nbsp; |
| room | `STRING`  | Name of new Room | &nbsp; |




##### Returns


-  update reports



#### getUsers() 

Retrieves all Users from the database






##### Returns


-  A promise that will get all users.



#### getUserById(name) 

Retrieves the user by Name




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `STRING`  | - name of user | &nbsp; |




##### Returns


-  A promiese that will return the user




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
