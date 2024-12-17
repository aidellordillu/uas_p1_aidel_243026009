const express = require('express');
const router = express.Router();

// import database
const koneksi = require('../config/database');

// insert data & validasi
const { body, validationResult } = require('express-validator')


// membaca data
router.get('/', function(req, res) {
    //membaca data
    koneksi.query('SELECT * FROM posts ORDER BY id desc', function(error, rows) {
        if (error) {
            return res.status(500).json({
                status: false,
                message: 'database ngga nyambung',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Menampilkan data table posts',
                data: rows
            })
        }
    })
})

// insert data
router.post('/store', [
    body('band').notEmpty(),
    body('tahun_debut').notEmpty(),
    body('member').notEmpty(),
    body('vokalis').notEmpty(),
    body('gitaris').notEmpty(),
    body('bassist').notEmpty(),
    body('pianist').notEmpty(),
    body('drummer').notEmpty(),
    body('trombone').notEmpty(),
    body('genre').notEmpty(),
    body('album').notEmpty(),
    body('judul_lagu').notEmpty()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()

        })
    }

    // mendefinisikan formData
    let formData = {
        band: req.body.band,
        tahun_debut: req.body.tahun_debut,
        member: req.body.member,
        vokalis: req.body.vokalis,
        gitaris: req.body.gitaris,
        bassist: req.body.bassist,
        pianist: req.body.pianist,
        drummer: req.body.drummer,
        trombone: req.body.trombone,
        genre: req.body.genre,
        album: req.body.album,
        judul_lagu: req.body.judul_lagu,
    }

    // masukkan data / query
    koneksi.query('INSERT INTO posts SET ?', formData,
        function(err, rows) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Server mu error',
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'Berhasil input data',
                    data: rows[0]
                })
            }
        }
    )
})

// detail
router.get('/:id', function(req, res) {
    let id = req.params.id

    koneksi.query(`SELECT * FROM posts WHERE ID=${id}`,
        function(error, rows) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: 'Server Error'
                })
            }

            // pencarian posts
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak ada'
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'menampilkan data posts',
                    data: rows[0],
                })
            }
        }
    )

})

// update
router.patch('/update/:id', [
    // validasi

    body('band').notEmpty(),
    body('tahun_debut').notEmpty(),
    body('member').notEmpty(),
    body('vokalis').notEmpty(),
    body('gitaris').notEmpty(),
    body('bassist').notEmpty(),
    body('pianist').notEmpty(),
    body('drummer').notEmpty(),
    body('trombone').notEmpty(),
    body('genre').notEmpty(),
    body('album').notEmpty(),
    body('judul_lagu').notEmpty()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(442).json({
            errors: errors.array()
        })
    }

    // id
    let id = req.params.id

    // data posts
    let formData = {

        band: req.body.band,
        tahun_debut: req.body.tahun_debut,
        member: req.body.member,
        vokalis: req.body.vokalis,
        gitaris: req.body.gitaris,
        bassist: req.body.bassist,
        pianist: req.body.pianist,
        drummer: req.body.drummer,
        trombone: req.body.trombone,
        genre: req.body.genre,
        album: req.body.album,
        judul_lagu: req.body.judul_lagu,
    }

    // update querry
    koneksi.query(`UPDATE posts set ? WHERE id =${id})`,
        formData,
        function(error, rows) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: 'server error',
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Berhasil update data'
                })
            }
        }
    )
})

// delete
router.delete('/delete/(:id)',
    function(req, res) {
        let id = req.paramd.id

        koneksi.query(`DELETE FROM posts WHERE id = ${id}`),
            function(error, rows) {
                if (error) {
                    return res.status(500).json({
                        status: false,
                        message: 'Server error'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'data sudah dihapus'
                    })
                }
            }
    })
module.exports = router;