# Echospace

A real-time WebSocket chat server built with Node.js and Express.
Echospace allows multiple clients to connect simultaneously, set usernames,
join named rooms, and exchange messages instantly — all over a persistent
WebSocket connection. Messages are broadcast to all other clients in the
same room in real time.

## Install

git clone https://github.com/simonkimeu/echospace.git
cd echospace
npm install

## Run

node src/index.js
Server starts on http://localhost:3002

## Connect & Test

Install wscat to test from terminal:
npm install -g wscat
wscat -c ws://localhost:3002

## Commands (send as JSON)

# Set your username (do this first)
{"type":"setName","username":"simon"}

# Join a specific room (default is "general")
{"type":"join","room":"dev"}

# Send a message to everyone in your room
{"type":"message","text":"Hello everyone!"}

## Example Session

< {"type":"info","message":"Connected to Echospace. Room: general"}
> {"type":"setName","username":"simon"}
< {"type":"info","message":"Username set to simon"}
> {"type":"message","text":"Anyone here?"}
< {"type":"message","from":"morris","room":"general","text":"Yes, hello!"}

## How It Works

1. Each client connects via WebSocket and is placed in the "general" room
2. Clients can set a username and switch rooms at any time
3. Messages are broadcast to all other clients in the same room
4. The server tracks rooms using a Map of Sets

## Tech Stack
- Node.js
- Express (HTTP server base)
- ws (WebSocket library)
- In-memory room and client management

## Author
Simon Kimeu — github.com/simonkimeu