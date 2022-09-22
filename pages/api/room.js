import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomData = [];
    rooms.map((room) => {
      const data = {
        roomId: room.roomId,
        roomName: room.roomName,
      };
      roomData.push(data);
    });
    res.json({ ok: true, rooms: roomData });
  }
}
