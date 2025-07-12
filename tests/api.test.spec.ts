import { base } from "@faker-js/faker";
import {test,expect} from "@playwright/test";
const addStudentAPIBody = require('../testdata/add_student_api_body.json');
const header = require('../testdata/headers.json');
const cread = require('../testdata/register_success_dynamic_body.json')
import {stringFormat} from '../utils/common';



test("POST - Add student api", async ({ request }) => {
  const apiResponse = await request.post("https://thetestingworldapi.com/api/studentsDetails", {
    data: addStudentAPIBody,
  });

  console.log("Status:", apiResponse.status());
  const text = await apiResponse.text();
  console.log("Response body:", text);

  try {
    const response = JSON.parse(text);
    console.log("Parsed JSON:", response);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
});
let ID:number; 
let baseURL:string = "https://reqres.in/api"


test("REQRES - GET api request",async ({request})=>{

  const path = "/users?page=2"
  const response = await request.get(`${baseURL}${path}`, {headers:header})
  const responseBody = await response.json()
  console.log(responseBody)
  // ID = responseBody.data[0].id
  expect(response.status()).toBe(200)
  expect(responseBody.data[0].id).toBe(7)
  expect(responseBody.total).toBe(12)
  expect(responseBody.total_pages).toBe(2)
  expect(responseBody.per_page).toBe(6)
  expect(responseBody.page).toBe(2)

});

test("REQRES -  api request",async ({request})=>{
  // const url = `/users/${ID}`;
  const response = await request.get(`${baseURL}/users/7`,
    {headers:header})
  const responseBody = await response.json()
  console.log(responseBody)
  expect(response.status()).toBe(200)
  expect(responseBody.data.id).toBe(7)
  expect(responseBody.data.email).toBe("michael.lawson@reqres.in")
  expect(responseBody.data.first_name).toBe("Michael")
  expect(responseBody.data.last_name).toBe("Lawson")
});


test("REQRES -  User not found 404",async ({request})=>{
  const response = await request.get(`${baseURL}/users/23`,{headers:{"x-api-key": "reqres-free-v1"}})
  expect(response.status()).toBe(404)

});

test("REQRES -  List Resource ",async ({request})=>{
  let URL:string = "https://reqres.in/api/unknown"

  const response = await request.get(`${URL}`,{headers:header})
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)

});

test("REQRES -  Single Resource ",async ({request})=>{
  let URL:string = "https://reqres.in/api/unknown"

  const response = await request.get(`${URL}/2`,{headers:header})
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)

});

test("REQRES -  Single Resource Not Found 404 ",async ({request})=>{
  let URL:string = "https://reqres.in/api/unknown"

  const response = await request.get(`${URL}/23`,{headers:header})
  expect(response.status()).toBe(404)
  const responseBody = await response.json();
  console.log(responseBody)

});

let responseID:number;
test("REQRES -  POST  Create Resource ",async ({request})=>{

  const response = await request.post(`${baseURL}/users`,
    {headers:header,data: { name: "JOHN", job: "leader" }}

  );
  expect(response.status()).toBe(201)
  const responseBody = await response.json();
  responseID = responseBody.id;

});

test("REQRES -  PUT  Update Resource ",async ({request})=>{

  const response = await request.put(`${baseURL}/users/${responseID}`,
    {headers:header, data: { name: "Glenn", job: "Cricketer" }}

  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)
});

test("REQRES -  PATCH  Partial Update Resource ",async ({request})=>{

  const response = await request.patch(`${baseURL}/users/${responseID}`,
    {headers:header,data: {job: "Developer"}}
  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)
});

test("REQRES -  DELETE   Resource ",async ({request})=>{

  const response = await request.delete(`${baseURL}/users/${responseID}`,
    {headers:header}

  );
  expect(response.status()).toBe(204)
 
});

let token:string;
test("REQRES -  REGISTER Successful ",async ({request})=>{

  const response = await request.post(`${baseURL}/register`,
        {headers:header,
     data: { email: "eve.holt@reqres.in",password: "pistol"}}

  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)
 token = await responseBody.token;

});

// *******************Dynamic input*******************

test("REQRES -  REGISTER Successful with Dynamic input ",async ({request})=>{

var credentialsBody = stringFormat(
    JSON.stringify(cread),
    "eve.holt@reqres.in",
    "pistol"
  );


  // const credentials = stringFormat(cread,"eve.holt@reqres.in","pistol");
  const response = await request.post(`${baseURL}/register`,
        {headers:header,
    //  data: { email: "eve.holt@reqres.in",password: "pistol"}}
         data:JSON.parse(credentialsBody) }


  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)
 token = await responseBody.token;

});

// **************************************


test("REQRES -  REGISTER UnSuccessful ",async ({request})=>{

  const response = await request.post(`${baseURL}/register`,
        {headers:header,
     data: { email: "eve.holt@reqres.in"}}

  );
  expect(response.status()).toBe(400)
  const responseBody = await response.json();
  console.log(responseBody)

});

test("REQRES -  LOGIN Successful ",async ({request})=>{

  const response = await request.post(`${baseURL}/login`,
        {headers:header,
     data: {email: "eve.holt@reqres.in",password: "cityslicka"}}

  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)

});
test("REQRES -  LOGIN UnSuccessful ",async ({request})=>{

  const response = await request.post(`${baseURL}/login`,
        {headers:header,
     data: {email: "eve.holt@reqres.in"}}

  );
  expect(response.status()).toBe(400)
  const responseBody = await response.json();
  console.log(responseBody)

});

test("REQRES -  DELAY Response ",async ({request})=>{

  const response = await request.get(`${baseURL}/users?delay=3`,
        {headers:header}

  );
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)

});

