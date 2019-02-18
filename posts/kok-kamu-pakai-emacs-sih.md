---
title: Kok Kamu Pakai Emacs Sih?
date: 2016-09-11
---

Keperluan terhadap text editor bagi seorang programmer adalah mutlak. Tanpa text editor, programmer tidak dapat ngoding. Oleh karena itu, banyak sekali text editor yang beredar di dunia ini, dan sepertinya para programmer tidak akan berhenti mencari dan menciptakan text editor yang lebih baik dari yang sudah ada saat ini.

Sementara kebanyakan programmer menggunakan Atom, Sublime Text, Notepad++ atau text editor lain yang lebih modern, saya malah jatuh hati pada [Emacs](https://www.gnu.org/software/emacs/). Emacs pertama kali dibuat pada tahun 1976 oleh [Richard Stallman](https://en.wikipedia.org/wiki/Richard_Stallman) yang merupakan founder dari GNU Project. Pada tahun ini mouse belum banyak digunakan sehingga ini membuat hampir semua kontrol dari Emacs menggunakan keyboard. Layaknya sebuah fighting game, untuk dapat menggunakan Emacs kamu harus menghapalkan banyak kombinasi 'jurus'.

> Kok malah pakai editor jadul? Memangnya banyak yang pakai? Kenapa gak pakai mouse? Ngetik terus emang gak capek? Kok gak pakai VIM aja?…

Pertanyaan-pertanyaan tersebut akan sering kamu dapatkan kalau kamu 'ketahuan' pakai Emacs. Sekarang mari kita lihat bagaimana cara saya menjawabnya satu per satu.

## Kok Malah Pakai Editor Jadul?

Seperti para programmer pada umumnya, saya juga mengalami masa-masa ‘gonta-ganti text editor’. Tidak dapat dipungkiri bahwa semakin banyak belajar, maka semakin berkembang pula kebutuhan untuk text editor yang lebih mumpuni. Setiap ada text editor yang baru, saya tidak pernah ketinggalan untuk mencobanya. Hal ini membuktikan bahwa saya bukan seperti penggemar Vespa atau kolektor barang antik yang menyukai sesuatu karena nilai historisnya semata.

Pada saat itu saya ingin lebih produktif lagi dalam ngoding, namun editor yang saya pakai saat itu (Atom) masih belum cukup cepat menurut saya. Saya menjadi ingin mengeksplorasi kembali text editor yang lain, sampai saya mengenal Emacs. Saat mempelajarinya lebih dalam saya baru menyadari bahwa di dalam text editor yang jadul itu ternyata telah tersemat banyak sekali fitur keren yang tidak dimiliki text editor lain.

_Syntax highlighting_ dan _syntax checker_ untuk banyak bahasa pemograman sudah ada di dalamnya. Navigasi cursor-nya sangat luas, mau ke posisi manapun bisa (asal ingat shortcut-nya). Menjalankan perintah di terminal bisa langsung lewat Emacs. Mau menambahkan plugin tambahan sangat mudah karena sudah ada package manager. Koleksi plugin-nya juga sangat banyak dan beragam, bahkan ada plugin yang bisa kita gunakan untuk browsing, membaca dan membalas email, mengatur keuangan pribadi bahkan bermain game (jadul) dengan Emacs. Ini yang membuat saya tertarik menggunakannya dan saya tidak pernah bosan untuk mengeksplorasi dunia Emacs sampai sekarang.

``` js
console.log(this === window); // output 'true'
function callingGlobal() {
    console.log(this === window);
}
callingGlobal(); // output 'true' (?)
```
``` html
<template>
  <p>Something</p>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      something: 9000,
    };
  },
};
</script>

<style>
p {
  font-size: 12px;
}
</style>
```
