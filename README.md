# King-James-Node-Backend
 
# Table of Contents

 - Description
 - Prerequisites
 - Installation
 - Usage
 - Configuration
 - API Routes

 # Description
This repository contains the source code for an Express.js server. This server is designed to provide APIs to store brand name,and brand images and also to retreive them. It serves as a backend for the King James React App which is a technical assessment for Full Stack Developer position at Accenture.

# Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- npm package manager.

# Installation
To install and run this server, follow these steps:

## Clone the repository:

 git clone https://github.com/seko17/King-James-Node-Backend.git

## Change to the project directory:

  cd King-James-Node-Backend

## Install dependencies:

  npm install

## Start the server:

  node server

The server will start and listen on the specified port.

# API Routes

This is a list of API routes

## Get list of every brand

### Request

`GET /thing/data/any`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/any

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get list and sort alphabetically

### Request

`GET /thing/data/order`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/order

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get list and filter by First letter A - G

### Request

`GET /thing/data/AG`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/AG

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get list and filter by First letter H - N

### Request

`GET /thing/data/HN`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/HN

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get list and filter by First letter O - U

### Request

`GET /thing/data/OU`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/OU

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get list and filter by First letter V - Z

### Request

`GET /thing/data/VZ`

    curl -i -H 'Accept: application/json' http://localhost:8383/data/VZ

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []


## Create a brand

### Request

`POST /addBrand/`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:8383/addBrand

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

  {
    "name":"BBC",
    "url": "https://firebasestorage.googleapis.com/v0/b/king-james-backend.appspot.com/o/bbc-black.svg?alt=media&token=2551b864-1953-4096-a274-1040f59f1072"
}

