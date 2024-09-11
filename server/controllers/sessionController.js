const axios = require('axios');

exports.saveRoomId = (req, res) => {
    const roomId = req.body.roomId;

    // Oda ID'sini kaydetme işlemi (örn. veritabanına kaydetme)
    // Burada veritabanı kodları ekleyebilirsiniz

    // Başarı durumu
    res.status(200).json({ message: 'Room ID saved successfully' });
};
