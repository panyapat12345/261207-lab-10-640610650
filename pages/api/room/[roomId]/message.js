import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const idx = rooms.findIndex((room) => room.roomId === roomId);
    if (idx === -1) {
      res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      res.json({ ok: true, messages: rooms[idx].messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const idx = rooms.findIndex((room) => room.roomId === roomId);

    if (idx === -1) {
      //not found
      res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      if (typeof req.body.text === "string") {
        // correct body
        const newMessage = { messageId: uuidv4(), text: req.body.text };
        rooms[idx].messages.push(newMessage);
        writeDB(rooms);
        res.json({ ok: true, message: newMessage });
      } else {
        // incorrect body
        res.status(400).json({ ok: false, message: "Invalid text input" });
      }
    }
  }
}
