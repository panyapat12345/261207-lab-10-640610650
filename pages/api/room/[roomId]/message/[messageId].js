import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();
    const idx = rooms.findIndex((room) => room.roomId === roomId);
    if (idx === -1) {
      res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const idxMess = rooms[idx].messages.findIndex(
        (message) => message.messageId === messageId
      );
      if (idxMess === -1) {
        res.status(404).json({ ok: false, message: "Invalid message id" });
      } else {
        rooms[idx].messages.splice(idxMess, 1);
        writeDB(rooms);
        res.json({ ok: true });
      }
    }
  }
}
