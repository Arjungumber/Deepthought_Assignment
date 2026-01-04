# Task 2 – Nudge API Documentation

## Nudge Creation Page Wireframe

### Description
- User can tag an event which they want to create a nudge about and give this nudge a title.
- User should be able to upload an image which will be shown as a cover for the nudge.
- User can add a time at which they want to send the nudge.
- The nudge will have a description.
- Each nudge will also have an icon and one-line invitation which will be shown where the nudge is minimized or when it is shown along with an event/article.

---

## Nudge Object Data Model

| Field           | Type     | Description |
|-----------------|---------|-------------|
| event_id        | ObjectId | ID of the event this nudge is associated with |
| name            | string  | Title of the nudge |
| description     | string  | Detailed description |
| schedule        | ISO Date String | Time at which the nudge should be sent |
| image           | string (URL or file) | Cover image of the nudge uploaded by user |
| icon            | string/file | Icon uploaded by user |
| invitation_text | string  | One-line invitation shown along with the event/article |
| created_at      | ISO Date String | Timestamp of creation |
| updated_at      | ISO Date String | Timestamp of last update |

---

## API Structure

### Nudge Api's
### 1. Create a Nudge


- **Endpoint:** `POST /nudges`
- **Description:** Creates a new nudge for a selected event.
- **Request Type:** POST
- **Payload Example:**
```json
{
  "event_id": "65a9f0d7e1b9c3a12f123456",
  "name": "Morning Yoga Reminder",
  "description": "Join us for a calming yoga session.",
  "schedule": "2026-01-10T07:00:00Z",
  "image":"file upload (cover image)",
  "icon":"file upload (icon image)",
  "invitation_text": "Join the morning yoga session!"
}
```
**Response Example : (201) Created**
```json
{
  "success": true,
  "message": "Nudge created successfully",
  "data": {}
}
```

### 2. Get All Nudges (with Pagination)

- **Endpoint:** `GET /nudges?page=1&limit=10&event_id=<optional>`
- **Description:** Fetches a paginated list of nudges. If `event_id` is provided, only nudges for that event are returned.  
- **Query Parameters:**
  - `page` (optional, default 1)
  - `limit` (optional, default 10)
  - `event_id` (optional) → filter nudges by event
- **Request Type:** GET
- **Response (200 OK):**
```json
{
  "success": true,
  "total": 5,
  "nudges": []
}
```
### 3. Get Nudge By Id 
- **Endpoint:** `GET /nudges/:id`
- **Description:** Fetches a single nudge by its `id`.
- **Response (200 OK):**
```json
{
  "success": true,
  "nudge": {}
}
```
- **Error (404 Not Found):**
```json
{
  "success": false,
  "message": "Nudge not found"
}
```
### 4. Update a Nudge
- **Endpoint:** `PUT /nudges/:id`
- **Description:** Updates an existing nudge.
- **Payload Example (JSON / multipart-form)**
```json
{
  "name": "Updated Nudge Title",
  "schedule": "2026-01-12T09:00:00Z",
  "image": "optional file upload (cover image)",
  "icon": "optional file upload (icon image)",
  "invitation_text": "Updated invitation text"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Nudge updated successfully"
}
```
### 4. Delete a Nudge
- **Endpoint:** `DELETE /nudges/:id`
- **Description:** Deletes a nudge permanently.
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Nudge deleted successfully"
}
```