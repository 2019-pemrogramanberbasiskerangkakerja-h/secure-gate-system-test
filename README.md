<h1><b>Pemprograman Berbasis Kerangka Kerja</b></h1>
<h2>Kelompok 11</h2>

<h3>SECURE GATE SYSTEM</h3>

<ul>
	<li> Aidil Abdillah Suyudi (05111640000047)</li>
	<li>Irham Muhammad Fadhil (05111640000085)</li>
	<li>Rahmad Yanuar MD      (05111640000159)</li>
</ul>

Tools yang digunakan :
<ul>
	<li><a href="apachefriends.org">XAMPP</a></li>
	<li><a href="expressjs.com">ExpressJS</a></li>
</ul>

<b>Cara Menjalankan :</b>

1. Clone repository ini.
2. Jalankan XAMPP.
3. Start Apache dan MySQL.
4. Jalankan Perintah "Node index.js"
5. Buka browser dan masuk ke http://localhost:3000/login
6. Buka CMD untuk melihat log saat gagal dan berhasil

<b>RESTful API</b>

API yang diterapkan adalah: 
- user
<ul>
	<li><b>- user</b></li>
	<li>POST /users		- Add user</li>
	<li>GET /users		- Get all users</li>
	<li>GET /users/:userid	- Get info user</li>
	<li>DELETE /users/:userid	- Delete user</li>

<li>- auth-login</li>
<li>POST /login		- login</li>

<li>- Gate</li>
<li>POST /gates		- add gate</li>
<li>GET /gates		- get all gates</li>
<li>GET /gates/:gateid	- get info gate</li>
<li>DELETE /gates/:gateid	- delete gate</li>
</ul>
