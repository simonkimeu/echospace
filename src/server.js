const WebSocket = require("ws");
const { joinRoom, leaveRoom, broadcast } = require("./rooms");

function createWsServer(server) {
  const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        ws.username = "anonymous";
            ws.room = "general";
                joinRoom("general", ws);
                    ws.send(JSON.stringify({ type: "info", message: "Connected to Echospace. Room: general" }));

                        ws.on("message", (data) => {
                              try {
                                      const msg = JSON.parse(data);

                                              if (msg.type === "setName") {
                                                        ws.username = msg.username;
                                                                  ws.send(JSON.stringify({ type: "info", message: `Username set to ${ws.username}` }));
                                                                          } else if (msg.type === "join") {
                                                                                    leaveRoom(ws.room, ws);
                                                                                              ws.room = msg.room;
                                                                                                        joinRoom(ws.room, ws);
                                                                                                                  ws.send(JSON.stringify({ type: "info", message: `Joined room: ${ws.room}` }));
                                                                                                                          } else if (msg.type === "message") {
                                                                                                                                    const outgoing = JSON.stringify({ type: "message", from: ws.username, room: ws.room, text: msg.text });
                                                                                                                                              broadcast(ws.room, outgoing, ws);
                                                                                                                                                      }
                                                                                                                                                            } catch {
                                                                                                                                                                    ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
                                                                                                                                                                          }
                                                                                                                                                                              });

                                                                                                                                                                                  ws.on("close", () => {
                                                                                                                                                                                        leaveRoom(ws.room, ws);
                                                                                                                                                                                            });
                                                                                                                                                                                              });

                                                                                                                                                                                                return wss;
                                                                                                                                                                                                }

                                                                                                                                                                                                module.exports = { createWsServer };