//inisialisasi library
const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")

// implementation
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//create sql connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log("mySql Connected");
    }
})

//end point akses data pelanggan
app.get("/pelanggan", (req,res) => {

    let sql = "select * from siswa"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                pelanggan : result
            }
        }
        res.json(response)
    })
})

//end point akses data pelanggan berdasarkan id pelanggan
app.get("/pelanggan/:id", (req,res) => {
    
    let data = {
        id_pelanggan : req.params.id
    }

    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                pelanggan : result
            }
        }
        res.json(response)
    })
})

//end point menyimpan data pelanggan
app.post("/pelanggan", (req,res) => {

    let data = {
        nama_pelanggan : req.body.nama_pelanggan,
        alamat_pelanggan : req.body.alamat_pelanggan,
        kontak : req.body.kontak
    }

    let sql = "insert into pelanggan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point mengubah data pelanggan
app.put("/pelanggan", (req,res) => {

    let data = [
        {
         nama_pelanggan : req.body.nama_pelanggan,
         alamat_pelanggan : req.body.alamat_pelanggan,
         kontak : req.body.kontak
        },

        {
            id_pelanggan : req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//end point menghapus data pelanggan berdasarkan id pelanggan
app.delete("/pelanggan/:id", (req,res) => {

    let data = {
        id_pelanggan : req.params.id
    }

    let sql = "delete from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//end point akses data petugas
app.get("/karyawan", (req,res) => {

    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })
})

//end point akses data karyawan berdasarkan id tertentu
app.get("/karyawan/:id", (req,res) => {
    
    let data = {
        id_karyawan : req.params.id
    }

    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })
})

//end point menyimpan data karyawan
app.post("/karyawan", (req,res) => {

    let data = {
        nama_karyawan : req.body.nama_karyawan,
        alamat_karyawan : req.body.alamat_karyawan,
        kontak : req.body.kontak,
        username : req.body.username,
        password : req.body.password
    }

    let sql = "insert into karyawan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point mengubah data karyawan
app.put("/karyawan", (req,res) => {

    let data = [
        {
            nama_karyawan : req.body.nama_karyawan,
            alamat_karyawan : req.body.alamat_karyawan,
            kontak : req.body.kontak,
            username : req.body.username,
            password : req.body.password
        },

        {
            id_karyawan : req.body.id_karyawan
        }
    ]

    let sql = "update karyawan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//end point menghapus data karyawan berdasarkan id user
app.delete("/karyawan/:id", (req,res) => {

    let data = {
        id_karyawan : req.params.id
    }

    let sql = "delete from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//end point menampilkan mobil
app.get("/mobil", (req,res) => {

    let sql = "select * from mobil"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                mobil : result
            }
        }
        res.json(response)
    })
})

//end point menambahkan mobil
app.post("/mobil", (req,res) => {

    let data = {
        nomor_mobil : req.body.nomor_mobil,
        merk : req.body.merk,
        jenis: req.body.jenis,
        warna : req.body.warna,
        tahun_pembuatan : req.body.tahun_pembuatan,
        biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        image : req.body.image
    }

    let sql = "insert into mobil set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point menambahkan data sewa
app.post("/sewa", (req,res) => {
    
    let data = {
        total_bayar : req.body.total_bayar,
        tgl_sewa : moment().format('YYYY-MM-DD HH:mm:ss'),
        tgl_kembali : moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let mobil = JSON.parse(req.body.mobil)

    let sql = "insert into sewa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            res.json({message : error.message})
        }
        else {
            let lastID = result.insertId
            let data = []
            for (let index = 0; index < mobil.length; index++) {
                data.push([
                    lastID, mobil[index].id_mobil
                ])
            }

            let sql = "insert into sewa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message : error.message})
                }
                else {
                    res.json({message : "Data has been inserted"})
                }
            })

        }
    })

})

app.listen(2000, ()=>{
    console.log("Run on port 2000");
})
