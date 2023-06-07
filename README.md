# Doc-Abode-Technical-Assessment

Considering the time constraints, I made the choice to develop the entire project using pure JavaScript. In retrospect, I realize that TypeScript would have been more suitable for a project of this nature, especially when dealing with multiple payloads and generating requests.

</p>
<em>
The project employs the MVC (Model-View-Controller) software design pattern. Given additional time, I would have implemented the clean domain pattern in the following manner:

<ol>
  <li>Entities (Mongoose models and their abstraction)</li>
  <li>Use Cases (lies outside the Entities layer, contains login and rules related to the behavior and design of the system)</li>
  <li>Interface Adapters (Controllers)</li>
  <li>Routes</li>
  <li>Frameworks and Drivers (Infrastructure Layer)</li>
</ol>
</em>

## `Getting started`

<ol>
  <li>git pull repo</li>
  <li>nvm use</li>
  <li>npm i</li>
  <li style="color:red">npm run start</li>
</ol>

### `Testing`

`Jest`

<p style="color:grey">
npm run test:unit:watch OR
npm run test:unit</p>

## `API`

The API has the following endpoints:

### List Jobs

**Endpoint**: `/jobs - GET`

Returns list of available jobs

```javascript
//Response
[
  {
    type: "SHIFT",
    priceInPence: 9900,
    contactEmail: "tomekand1@gmail.com",
    status: "COMPLETED",
    updatedAt: null,
    id: "74f14bdf-d59e-4a93-90d8-ac00e75abe74",
    createdAt: "2023-06-07T19:09:35.074Z",
  },
];
```

### Create a New Job

**Endpoint**: `/jobs - POST`

```javascript
// RequestBody
{
"type":"SHIFT",
"priceInPence":9900,
"status":"COMPLETED",
"contactEmail":"tomekand1@gmail.com"
}
// Response
 {
	"type": "SHIFT",
	"priceInPence": 9900,
	"contactEmail": "tomekand1@gmail.com",
	"status": "COMPLETED",
	"updatedAt": null,
	"id": "74f14bdf-d59e-4a93-90d8-ac00e75abe74",
	"createdAt": "2023-06-07T19:09:35.074Z"
}
```

### Get Job by ID

**Endpoint**: `/jobs/{id} - GET`

```javascript

// Response
 {
	"type": "SHIFT",
	"priceInPence": 9900,
	"contactEmail": "tomekand1@gmail.com",
	"status": "COMPLETED",
	"updatedAt": null,
	"id": "74f14bdf-d59e-4a93-90d8-ac00e75abe74",
	"createdAt": "2023-06-07T19:09:35.074Z"
}
```

### Update Job by ID

**Endpoint**: `/jobs/{id} - PATCH`

Only the `contactEmail` and `status` attributes can be updated.

```javascript
//Request body
{
"status":"ASSIGNED",
"contactEmail":"tomekand1@op.pl" // optional
}

//Response
ok(
    "Item id: 28144457-ccda-4145-9a99-fda22467caa8 has been successfully updated"
)
```

### Delete Job by ID

**Endpoint**: `/jobs/{id} - DELETE`

```javascript
//Response
ok(
  "Item id: 28144457-ccda-4145-9a99-fda22467caa8 has been successfully deleted"
);
```
