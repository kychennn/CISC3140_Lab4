## Documenting API endpoints
The objective of this lab is to build a backend API using a combination of SQL and JavaScript to enable users to view data that is stored in a database as well as update data.

* ## `GET   /api/car`
* ##  `GET   /api/cars/{Car_ID}`
### Resource Description
GET REST API Request, HTTP Method Type: GET
### Endpoints and methods
Get the results from Car table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Year | Optional | The car's year | INT |
| Make | Optional | The car's make | TEXT |
| Model | Optional | The car's model | TEXT |
| Judge_ID | Optional | The judge'ID for each car | TEXT |
| Judge_Name | Optional | The judge'name for each car | TEXT |

###  Request example & Response example and schema

Get the results of all cars present in the CSV file

![get_all_car](https://user-images.githubusercontent.com/81440356/166629297-fab17d8a-ddd1-4d27-8e70-238a532a4232.png)

Get the result of single car with Car_ID

![get_single_car](https://user-images.githubusercontent.com/81440356/166631124-954487bf-7061-4fab-a9cc-6457fbc97634.png)

Get results of all cars information with queries: model=TLX&year=2015

![get_car_withQueries](https://user-images.githubusercontent.com/81440356/166629978-647d2481-0265-41f6-8796-d162ad9a0091.png)


* ## `GET   /api/owner`
* ## `GET   /api/owner/{Car_ID}`
### Resource Description
GET REST API Request, HTTP Method Type: GET
### Endpoints and methods
Get the results from Owner table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Name | Optional | Name of car's owner | TEXT |
| Email | Optional | Email address of car's owner | TEXT |
### Request example & Response example and schema

Get the results of all the car owners contact information

![get_all_owner](https://user-images.githubusercontent.com/81440356/166630305-be2b0594-4a09-4067-8429-1bc7f10f7322.png)

Get the result of single car owner contact information with Car_ID

![get_single_owner](https://user-images.githubusercontent.com/81440356/166631464-9065d5e6-326e-4299-b96b-7b18438bcb4d.png)

Get results of all car owners contact information with queries: name=Hernando&email=honoland13@japanpost.jp

![get_owner_withQueries](https://user-images.githubusercontent.com/81440356/166630507-b9d6b1e9-a823-4adc-8c82-6ed5757f57bd.png)



* ##  `POST   /api/car/`
### Resource Description
Create REST API Request, HTTP Method Type: POST
### Endpoints and methods
Insert new car data record(s) to Car table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Year | Optional | The car's year | INT |
| Make | Optional | The car's make | TEXT |
| Model | Optional | The car's model | TEXT |
| Judge_ID | Optional | The judge'ID for each car | TEXT |
| Judge_Name | Optional | The judge'name for each car | TEXT |
### Request example & Response example and schema

Insert a single new car data record to Car table

![post_single_car](https://user-images.githubusercontent.com/81440356/166631192-f3053431-8b7e-49e9-998f-dd20f7a02be9.png)

Insert multiple new car data records to Car table

![post_mult_car](https://user-images.githubusercontent.com/81440356/166631146-b320be12-b3c3-4e30-8745-fd2b370ed142.png)




* ##  `POST   /api/owner/`
### Resource Description
Create REST API Request, HTTP Method Type: POST
### Endpoints and methods
Insert new owner data record(s) to Owner table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Name | Optional | Name of car's owner | TEXT |
| Email | Optional | Email address of car's owner | TEXT |
### Request example & Response example and schema

Insert a single new owner data record to Owner table

![post_single_owner](https://user-images.githubusercontent.com/81440356/166631282-d1abb4e3-778d-4bf0-886b-7bed34d1ed88.png)

Insert multiple new owner data records to Owner table

![post_mult_owner](https://user-images.githubusercontent.com/81440356/166631629-0ec81690-577b-40ea-80be-6666e979ab50.png)


* ## `PATCH   /api/cars/{Car_ID}`
### Resource Description
Update REST API Request, HTTP Method Type: PATCH
### Endpoints and methods
Update a car data record to Car table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Year | Optional | The car's year | INT |
| Make | Optional | The car's make | TEXT |
| Model | Optional | The car's model | TEXT |
| Judge_ID | Optional | The judge'ID for each car | TEXT |
| Judge_Name | Optional | The judge'name for each car | TEXT |
### Request example & Response example and schema

Update a car data record to Car table with Car_ID

![patch_car](https://user-images.githubusercontent.com/81440356/166631991-563799c5-511f-42dd-ad4a-9b6922e0eb17.png)



* ##  `PATCH   /api/owner/{Car_ID}`
### Resource Description
Update REST API Request, HTTP Method Type: PATCH
### Endpoints and methods
Update a owner data record to Owner table
### Parameters
| Name | Required/optional | Description | Type |
| ---------------------- | ----------------- | ----------- | ---- |
| Car_ID | Optional | Unique ID number identifying each car | INT |
| Name | Optional | Name of car's owner | TEXT |
| Email | Optional | Email address of car's owner | TEXT |
### Request example & Response example and schema

Update a owner data record to Owner table with Car_ID

![patch_owner](https://user-images.githubusercontent.com/81440356/166631989-b5280342-a0d4-444f-98ac-c66242de9c7c.png)