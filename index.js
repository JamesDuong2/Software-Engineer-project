const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;



//process.env.PORT
//process.env.NODE_ENV => production or undefined

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }
  
  console.log(__dirname);
  console.log(path.join(__dirname, "client/build"));
  
//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES//

//CREATE A PLAYER
app.post("/players", async(req, res) =>{
    try{
      const{first_name, last_name, codename, status} = req.body;

        console.log("Added player ", first_name, last_name, codename, status);
      
      const newPlayer = await pool.query(
      "INSERT INTO player (first_name, last_name, codename, status) VALUES($1,$2,$3,$4) RETURNING *", 
      [first_name, last_name, codename, status]
      );

      res.json(newPlayer.rows[0]);
   
    }catch(err){
        console.error(err.message);
    }
});

//GET ALL PLAYERS DEPENDING ON STATUS
app.get("/player_status/:status", async(req,res)=>{
    try{
        console.log(req.params);
        const status = req.params.status;
        const allPlayers = await pool.query("SELECT * FROM player WHERE status = $1", [status]);
        res.json(allPlayers.rows);
    }catch(err){
        console.error(err.message);
    }
});


//GET A PLAYER BASED ON ID
app.get("/player_id/:id", async(req,res) =>{
    try{
    const id = req.params.id;
    const player = await pool.query("SELECT * FROM player WHERE id = $1", 
    [id]
    );

    res.json(player.rows[0])
    }catch(err){
        console.error(err.message);
        
    }
});

//UPDATE A PLAYER
app.put("/players/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const{first_name, last_name, codename, status} = req.body;
        const updatePlayer = await pool.query(
            'UPDATE "player" SET first_name = $1, last_name = $2, codename = $3 , status = $4 WHERE id = $5',
            [first_name, last_name, codename, status, id]
        );
            res.json("Player was updated!");
    }catch(err){
        console.error(err.message);
    }
});

//DELETE A PLAYER
app.delete("/players/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const deletePlayer = await pool.query("DELETE FROM player WHERE id = $1", 
        [id]);
        res.json("Player was deleted!");

    }catch(err){
        console.error(err.message);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

  
app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`);
});
