const db = require('../config/firebase');
const { ref, get, set, update, remove } = require('firebase/database');

const mahasiswaController = {
    getAllMahasiswa: async (req, res) => {
        try {
            const mahasiswaRef = ref(db, 'mahasiswa');
            const snapshot = await get(mahasiswaRef);
            
            if (snapshot.exists()) {
                res.json({
                    message: "Berhasil mendapatkan data mahasiswa",
                    data: snapshot.val()
                });
            } else {
                res.json({
                    message: "Data mahasiswa tidak ditemukan",
                    data: {}
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createMahasiswa: async (req, res) => {
        try {
            const { npm, nama, kelas } = req.body;
            
            if (!npm || !nama || !kelas) {
                return res.status(400).json({ 
                    message: "NPM, Nama, dan Kelas harus diisi" 
                });
            }

            const mahasiswaRef = ref(db, `mahasiswa/${npm}`);
            await set(mahasiswaRef, { npm, nama, kelas });

            res.json({ 
                message: "Mahasiswa berhasil dibuat",
                data: { npm, nama, kelas }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateMahasiswa: async (req, res) => {
        try {
            const { npm } = req.params;
            const { nama, kelas } = req.body;

            if (!nama || !kelas) {
                return res.status(400).json({ 
                    message: "Nama dan Kelas harus diisi" 
                });
            }

            const mahasiswaRef = ref(db, `mahasiswa/${npm}`);
            const snapshot = await get(mahasiswaRef);

            if (!snapshot.exists()) {
                return res.status(404).json({ 
                    message: "Mahasiswa tidak ditemukan" 
                });
            }

            await update(mahasiswaRef, { nama, kelas });

            res.json({ 
                message: `Mahasiswa dengan NPM ${npm} berhasil diupdate`,
                data: { npm, nama, kelas }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteMahasiswa: async (req, res) => {
        try {
            const { npm } = req.params;
            const mahasiswaRef = ref(db, `mahasiswa/${npm}`);
            
            const snapshot = await get(mahasiswaRef);
            if (!snapshot.exists()) {
                return res.status(404).json({ 
                    message: "Mahasiswa tidak ditemukan" 
                });
            }

            await remove(mahasiswaRef);
            res.json({ message: `Mahasiswa dengan NPM ${npm} berhasil dihapus` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = mahasiswaController; 