const rooms = new Map();

function joinRoom(room, client) {
  if (!rooms.has(room)) rooms.set(room, new Set());
    rooms.get(room).add(client);
    }

    function leaveRoom(room, client) {
      if (rooms.has(room)) rooms.get(room).delete(client);
      }

      function broadcast(room, message, sender) {
        if (!rooms.has(room)) return;
          rooms.get(room).forEach((client) => {
              if (client !== sender && client.readyState === 1) {
                    client.send(message);
                        }
                          });
                          }

                          function getRooms() {
                            return [...rooms.keys()];
                            }

                            module.exports = { joinRoom, leaveRoom, broadcast, getRooms };