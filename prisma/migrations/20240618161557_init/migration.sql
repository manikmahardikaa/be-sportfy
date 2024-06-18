-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_pengguna` ENUM('ADMIN', 'PELANGGAN') NOT NULL DEFAULT 'PELANGGAN',
    `nama_penguna` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `kata_sandi` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservasi` (
    `id_reservasi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pengguna` INTEGER NOT NULL,
    `id_lapangan` INTEGER NOT NULL,
    `id_sesi` INTEGER NOT NULL,
    `tgl_sewa` DATETIME(3) NOT NULL,
    `pembayaran` INTEGER NOT NULL,

    PRIMARY KEY (`id_reservasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sesi` (
    `id_sesi` INTEGER NOT NULL AUTO_INCREMENT,
    `waktu_mulai` DATETIME(3) NOT NULL,
    `waktu_selesai` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_sesi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lapangan` (
    `id_lapangan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jenislap` INTEGER NOT NULL,
    `nama_lapanagn` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `alamat_lapangan` VARCHAR(191) NOT NULL,
    `harga_sewa` INTEGER NOT NULL,
    `gambar_lapangan` LONGTEXT NOT NULL,

    PRIMARY KEY (`id_lapangan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisLapangan` (
    `id_jenislap` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_lapangan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_jenislap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservasi` ADD CONSTRAINT `Reservasi_id_pengguna_fkey` FOREIGN KEY (`id_pengguna`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservasi` ADD CONSTRAINT `Reservasi_id_lapangan_fkey` FOREIGN KEY (`id_lapangan`) REFERENCES `Lapangan`(`id_lapangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservasi` ADD CONSTRAINT `Reservasi_id_sesi_fkey` FOREIGN KEY (`id_sesi`) REFERENCES `Sesi`(`id_sesi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lapangan` ADD CONSTRAINT `Lapangan_id_jenislap_fkey` FOREIGN KEY (`id_jenislap`) REFERENCES `JenisLapangan`(`id_jenislap`) ON DELETE RESTRICT ON UPDATE CASCADE;
