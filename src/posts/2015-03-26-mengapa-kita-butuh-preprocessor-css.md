---
title: Mengapa Kita Butuh Preprocessor CSS?
summary: Preprocessor CSS adalah framework yang menyediakan fitur-fitur yang tidak terdapat pada CSS.
--- 

Seiring dengan semakin berkembangnya situs yang kita miliki, terkadang hal ini akan membuat kita semakin sulit untuk menjaga kekonsistenan dan kerapihan dari kode-kode yang kita miliki. Untuk mengatasi masalah tersebut, banyak *framework* web modern yang menerapkan konsep MVC. Namun untuk CSS, masih banyak orang yang kesulitan untuk me-*maintain*-nya dengan benar. CSS tidak memiliki konsep modularitas seperti OOP dan tidak punya konsep fungsional. Selain itu tidak ada teknik terbaik untuk membuat *selector* yang mudah untuk diedit atau digunakan ulang pada *selector* yang lain. Beberapa alasan di bawah ini mungkin dapat menggugah kamu yang masih enggan untuk menggunakan *preprocessor*.

> **Preprocessor CSS** adalah *framework* yang menyediakan fitur-fitur yang tidak terdapat pada CSS. Fitur-fitur tersebut banyak mengadopsi konsep-konsep pemograman seperti operasi matematika dasar, variabel, *loop* dan fungsi. Cara kerjanya adalah kita menulis skrip pada *file* berekstensi lain, lalu dengan memasukkan baris perintah pada terminal atau command prompt, *preprocessor* akan menerjemahkan sintaks-sintaks tersebut ke dalam stkamur CSS dan menghasilkan *file* CSS yang siap untuk digunakan.

## Lebih *Customizable*, *Extensible* dan *Maintanable*
kamu akan menemui beberapa konsep pemograman pada *preprocessor*. Hal ini tidak mengherankan karena *preprocessor* CSS diinisiasi dan dibangun oleh para programmer. Desainer yang tidak memiliki latar belakang programmer biasanya anti dengan hal-hal berbau demikian karena belajar pemograman hanya akan menghambat produktifitas saja. Namun saya jamin waktu yang kamu habiskan untuk sedikit belajar pemograman tidak akan sia-sia.  

Setelah kamu cukup familiar dengan konsep-konsep pada *preprocessor*, kamu bisa jauh lebih produktif dari sebelumnya. Dengan *preprocessor*, kamu dapat menulis *style* jauh lebih sederhana dibandingkan menulis CSS secara langsung. Anda juga bisa memakai ulang fungsi-fungsi *preprocessor* yang sudah pernah kamu buat. Mengubah tema sebuah *website* dapat dilakukan dengan hanya mengubah variabel warna atau ukuran yang telah kamu buat, tidak perlu repot-repot mencari baris demi baris *selector*. Membuat librari CSS sendiri? Lebih mudah dengan *preprocessor* tentunya.  

## Pilihan Librari yang Lebih Baik daripada Bootstrap  
Mayoritas desainer web pasti sudah mengenal [Bootstrap](http://getbootstrap.com). Beberapa dari mereka sudah sangat berpengalaman menggunakan Bootstrap. Bootstrap memang merupakan alat yang sangat ampuh untuk membuat desain web dengan mudah dan cepat. Saya dulu juga *ngefan* dengan Bootstrap. Hampir semua projek saya yang dulu, saya buat menggunakan librari itu. Tetapi lama kelamaaan saya menjadi kurang nyaman karena seringkali saya harus menimpa *style* Bootstrap demi menghasilkan desain yang sesuai dengan rancangan saya. Selain itu apabila menggunakan Bootstrap, mau tidak mau saya harus mengotori elemen-elemen HTML dengan menambahkan kelas-kelas (mis. col-md-*, col-sm-* dll) yang tidak berelasi dengan konten elemennya.  

Pada *preprocessor*, terdapat librari-librari seperti [Compass](http://compass-style.org) dan [Bourbon](http://bourbon.io) (librari [Sass](http://sass-lang.com)) yang memiliki hampir semua fitur yang dimiliki oleh Bootstrap. Bahkan beberapa fitur justru lebih bagus dibandingkan Bootstrap. Selain itu dengan menggunakan *preprocessor*, kamu tidak perlu menambahkan banyak kelas karena *preprocessor* dapat men-*generate* CSS dari librari yang kita gunakan, berbeda dengan Bootstrap yang harus kita masukkan pada tag `<link>` yang hanya akan menambah beban HTTP Request saja. Dan tentu saja, karena librari-librari tersebut terdiri dari fungsi-fungsi dan variabel-variabel *preprocessor*, kamu dapat melakukan modifikasi dengan jauh lebih mudah tanpa harus repot-repot menimpa *style*-nya.  

## Tidak Perlu Me-*refresh* *Browser* Setiap Kali Melakukan Perubahan pada Skrip  
Satu hal yang paling sering dilakukan oleh desainer saat membuat CSS adalah me-*refresh* browser setiap kali mengubah CSS. Tanpa kamu sadari, sebenarnya kebiasaan yang demikian sangat mengurangi produktifitas kamu. Setiap kali *browser* di-*refresh*, browser akan meminta kembali *file* html, javascript, gambar dan CSS pada server, sehingga akan membutuhkan waktu yang cukup lama untuk me-*load* keseluruhan halaman web.  

Sass memiliki fitur yang dinamakan `watch`. Fitur tersebut berfungsi untuk memantau setiap perubahan yang terjadi saat kita mengedit skrip dan mengirimkan sinyal kepada browser untuk me-*request* ulang CSS. Hal ini jauh lebih cepat dibandingkan dengan me-*refresh* keseluruhan halaman web. Fitur yang sederhana, namun sangat berguna.  

## Penutup  

Saya pikir kamu tidak punya alasan lagi untuk tidak mempelajari *preprocessor* CSS setelah melihat semua kelebihannya dibandingkan dengan menulis CSS secara tradisional. *Preprocessor* memang dibuat dengan tujuan untuk menambah produktifitas desainer web dan mengurangi pekerjaan-pekerjaan yang seharusnya dapat dilakukan secara otomatis. Banyak lowongan-lowongan pekerjaan saat ini yang menjadikan *skill* *preprocessor* CSS sebagai salah satu syarat utamanya. Apabila kamu ingin serius menekuni bidang desain web, kamu harus mulai belajar menggunakan *preprocessor* CSS seperti [Sass](http://sass-lang.com), [LESS](http://lesscss.org) atau [Stylus](http://learnboost.github.io/stylus). Selamat belajar! :)    

