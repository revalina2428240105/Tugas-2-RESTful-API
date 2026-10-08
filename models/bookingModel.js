let fieldBookings = [
    {
        id: 1,
        namaPemesan: "Tim Garuda SI",
        lapangan: "Futsal A",
        tanggal: "2026-10-10",
        jamMulai: "19:00",
        durasiJam: 2
    },
    {
        id: 2,
        namaPemesan: "Tim Elang",
        lapangan: "Futsal B",
        tanggal: "2026-10-11",
        jamMulai: "16:00",
        durasiJam: 2
    },
    {
        id: 3,
        namaPemesan: "Andi Saputra",
        lapangan: "Badminton A",
        tanggal: "2026-10-12",
        jamMulai: "18:30",
        durasiJam: 1
    }
];

// GET semua data
function getAll() {
    return fieldBookings;
}

// GET berdasarkan ID
function getById(id) {
    return fieldBookings.find((b) => b.id === id);
}

// FILTER berdasarkan lapangan
function filterByLapangan(lapangan) {
    return fieldBookings.filter(
        (b) => b.lapangan.toLowerCase() === lapangan.toLowerCase()
    );
}

// POST / tambah data
function create(data) {
    const newId = fieldBookings.length > 0
        ? Math.max(...fieldBookings.map((b) => b.id)) + 1
        : 1;

    const baru = {
        id: newId,
        namaPemesan: data.namaPemesan,
        lapangan: data.lapangan,
        tanggal: data.tanggal,
        jamMulai: data.jamMulai,
        durasiJam: data.durasiJam
    };

    fieldBookings.push(baru);

    return baru;
}

// PUT / ubah data
function update(id, data) {
    const index = fieldBookings.findIndex((b) => b.id === id);

    if (index === -1) {
        return null;
    }

    fieldBookings[index] = {
        id: id,
        namaPemesan: data.namaPemesan,
        lapangan: data.lapangan,
        tanggal: data.tanggal,
        jamMulai: data.jamMulai,
        durasiJam: data.durasiJam
    };

    return fieldBookings[index];
}

// DELETE / hapus data
function remove(id) {
    const index = fieldBookings.findIndex((b) => b.id === id);

    if (index === -1) {
        return false;
    }

    fieldBookings.splice(index, 1);

    return true;
}

module.exports = {
    getAll,
    getById,
    filterByLapangan,
    create,
    update,
    remove
};