exports.saveChatMessage = (req, res) => {
    const roomId = req.query.roomId;
    const message = req.body.message;

    // Sohbet mesajını kaydetme işlemi (örn. veritabanına kaydetme)
    // Burada veritabanı kodları ekleyebilirsiniz

    // Başarı durumu
    res.status(200).json({ message: 'Chat message saved successfully' });
};
