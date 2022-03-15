# i-t-t-w-s-d-server

## Auth Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /auth/login             | POST      | authentication  | 
| /auth/register          | POST      | authentication  | 

## User Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /user          | GET      | index  | 
| /user/:username| GET      | show  | 

## Score Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /scores                            | GET       | index  | 
| /scores/username/:username         | GET       | show  | 
| /scores/cat/:cat                   | GET       | show  | 
| /scores/username/:username/cat/:cat| GET       | show  |  
| /scores/leadersboard               | GET       | show  |  
| /scores/username/:username         | DELETE    | destroy |  


