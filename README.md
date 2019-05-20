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

<h2><b>RESTful API</b></h2>

API yang diterapkan adalah: 

<b>User</b>
<ul>
	<li>POST /users -register user baru(requirement body x-form-urlencoded: username, password) </li>
	<li>GET /users -Get All Users </li>
	<li>GET /users/:nrp -Get Info user</li>
	<li>DELETE /users/:nrp - Delete user</li>
</ul>
<b>auth-login</b>
<ul>
	<li>POST /login -login (requirement body x-form-urlencoded: username, password, gate)</li>
</ul>
<b>Gate (admin only, login as admin username admin password admin)</b>
<ul>
	<li>POST /gate -add gate (requirement body x-form-urlencoded: idgate, start, end)</li>
	<li>GET /gate -get all Gate</li>
	<li>GET /gate/:gareid - Get Info gate</li>
	<li>DELETE /gate/:gateid</li>
</ul>
<b>UserGate</b>
<ul>
	<li>GET /usergateall - show all user and gates that can be accessed by respective user</li>
	<li>GET /usergateall/:gateid - show the user that can access the specified gates</li>
	<li>POST /usergate -add user to gate (requirement body x-form-urlencoded: user,gate)</li>
	<li>POST /usergatedel -del user to gate(requirement body x-form-urlencoded: user,gate)</li>
</ul>
<b>LogOut</b>
<ul>
	<li>GET /logout -logout</li>
</ul>

Untuk view API dari kelompok 1 kami menggunakan repoistori "<i>https://github.com/Aidil98/TEST-API-JOHN</i>"
