const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 🔹 회원 정보 불러오기
app.get('/members', (req, res) => {
  const data = fs.readFileSync('./members.json', 'utf8');
  res.json(JSON.parse(data));
});

// 🔹 회원 정보 추가
app.post('/add-member', (req, res) => {
  const { id, phone } = req.body;
  if (!id || !phone) return res.status(400).send('입력값 누락');

  const filePath = './members.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.push({ id, phone });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  res.send({ success: true, message: '회원 정보 추가 완료' });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
