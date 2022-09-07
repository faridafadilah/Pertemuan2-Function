const fs = require('fs'); // Core module filesystem
const readline = require('readline'); // Core module readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Cek Folder Data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Cek FIle contact.json
const filePath = './data/contact.json';
if(!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Function untuk Membuat Pertanyaan
const Pertanyaan = (ask) => {
  return new Promise((resolve, reject) => {
  rl.question( ask, (jawaban) => {
    resolve(jawaban)
    });
  });
}

// Pertanyaan yang akan diisi ke function Pertanyaan 
const main = async() => {
  const nama = await Pertanyaan('Nama Lengkap: ');
  const nohp = await Pertanyaan('No Hp: ');
  const email = await Pertanyaan('Email: ');
  SaveQuestion(nama, nohp, email); // Memanggil fungsi untuk menyimpan data
}
main();

// Simpan data 
const SaveQuestion = (nama, nohp, email) => {
  const contact = {nama, nohp, email}; // Menampung  data ke dalam object 
  const file = fs.readFileSync(filePath, contact); // Membaca file
  const contacts = JSON.parse(file); // Mengubah data ke JSON
  contacts.push(contact); // Push data
        
  // Tulis data ke file dan ubah ke string
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
  console.log('Terima Kasih!');

  //close program
  rl.close();
}