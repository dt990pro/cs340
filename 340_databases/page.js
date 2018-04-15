module.exports = function(){
	var express = require('express');
    var router = express.Router();
	var temp;
	var temp1;
	var temp2 = "";
	
	function get_player_info(res, mysql, context, complete){
		mysql.pool.query("SELECT p.name AS playername, j.name AS playerjob, u.jid_up AS nextjobid, s.name AS playerskill, w.name AS playerweapon FROM player p LEFT JOIN job j on p.pid=j.pid LEFT JOIN upgrade u on j.name=u.jid LEFT JOIN job_to_skill jts on j.name=jts.jname LEFT JOIN skill s on jts.sid=s.sid LEFT JOIN player_weapon pw on p.pid=pw.pid LEFT JOIN weapon w on pw.wid=w.wid", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player_info = results;
            complete();
        });
	}
	
	function get_player(res, mysql, context, complete){
		mysql.pool.query("SELECT pid, name FROM player", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
	}
	
	function get_job(res, mysql, context, complete){
		mysql.pool.query("SELECT jid, name, pid FROM job", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.job = results;
            complete();
        });
	}
	
	function get_player_weapon(res, mysql, context, complete){
		mysql.pool.query("SELECT pwid, pid, wid FROM player_weapon", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player_weapon = results;
            complete();
        });
	}
	function get_one_player_weapon(res, mysql, context, pwid, complete){
        var sql = "SELECT pwid, pid, wid FROM player_weapon WHERE pwid=?";
        var inserts = [pwid];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.one_player_weapon = results[0];
            complete();
        });
    }

	function get_weapon(res, mysql, context, complete){
		mysql.pool.query("SELECT wid, name FROM weapon", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.weapon = results;
            complete();
        });
	}
	
	function get_skill(res, mysql, context, complete){
		mysql.pool.query("SELECT sid, name FROM skill", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.skill = results;
            complete();
        });
	}
	
	function get_upgrade(res, mysql, context, complete){
		mysql.pool.query("SELECT jid, jid_up FROM upgrade", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.upgrade = results;
            complete();
        });
	}
	
	// to get all jobs
	function get_jobs(res, mysql, context, complete){
        mysql.pool.query("SELECT jid, name FROM job GROUP BY name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.jobs  = results;
            complete();
        });
    }
	
	// show_p_weapon
	function get_show_p_weapon(res, mysql, context, complete){
        mysql.pool.query("SELECT p.name AS TheName, w.name AS Weapons FROM player p LEFT JOIN player_weapon pw ON p.pid=pw.pid LEFT JOIN weapon w ON pw.wid=w.wid WHERE p.name=?", temp2, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
	//		console.log(temp2);
			context.selected_player = results;
			complete();
        });
    }
	
	// show_p_weapon
	function get_show_p_of_job(res, mysql, context, complete){
        mysql.pool.query("SELECT j.name AS TheName, p.name AS Player FROM job j INNER JOIN player p ON j.pid=p.pid WHERE j.name=?", temp2, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
	//		console.log(temp2);
			context.selected_job = results;
			complete();
        });
    }
	
	// display
	router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
		get_player_info(res, mysql, context, complete);
		get_player(res, mysql, context, complete);
		get_job(res, mysql, context, complete);
		get_player_weapon(res, mysql, context, complete);
		get_weapon(res, mysql, context, complete);
		get_skill(res, mysql, context, complete);
		get_upgrade(res, mysql, context, complete);
		get_jobs(res, mysql, context, complete);
		get_show_p_weapon(res, mysql, context, complete);
		get_show_p_of_job(res, mysql, context, complete);
		
        function complete(){
            callbackCount++;
            if(callbackCount >= 10){
                res.render('page', context);
            }

        }
    });
	/* Display one person for the specific purpose of updating people */
    router.get('/:pwid', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedweapon.js","updateweapon.js"];
        var mysql = req.app.get('mysql');
        
        get_weapon(res, mysql, context, complete);
        //get_player_weapon(res, mysql, context, complete);
        get_one_player_weapon(res, mysql, context, req.params.pwid, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-weapon', context);
            }

        }
    });
    /* The URI that update data is sent to in order to update a person */

    router.put('/:pwid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE player_weapon SET wid=? WHERE pwid=?";
        var inserts = [req.body.wid,req.params.pwid];
//        console.log(req.body.wid);
  //      console.log(req.params.pwid);
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
		get_player_weapon(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('page', context);
            }

        }
    });
    //delete
    router.delete('/:pwid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM player_weapon WHERE pwid = ?";
        var inserts = [req.params.pwid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
	// add player_job
	router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
		
        var sql_1 = "INSERT INTO player (name) VALUES (?)";
		var inserts_1 = [req.body.pname];
		
		// add player
		sql = mysql.pool.query(sql_1,inserts_1,function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			
			temp = results.insertId;
			
			// add job
			var sql_3 = "INSERT INTO job (name, pid) VALUES (?, ?)";
			var inserts_3 = [req.body.jname, temp];
			sql = mysql.pool.query(sql_3,inserts_3,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				res.redirect('/page');
			});
		});
		
    });
	
	// add player_weapon
	router.post('/weapon', function(req, res){
		var mysql = req.app.get('mysql');
		var sql_4 = "INSERT INTO player_weapon (pid, wid) VALUES (?, ?)";
		var inserts_4 = [req.body.pid, req.body.wid];
		temp1 = req.body.wid;
		mysql.pool.query("SELECT p.pid, j.name, s.sid FROM player p LEFT JOIN job j ON p.pid=j.pid LEFT JOIN job_to_skill jts ON j.name=jts.jname LEFT JOIN skill s ON jts.sid=s.sid WHERE p.pid=?", req.body.pid, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            
			//console.log(temp1);
			
			if((results[0].sid != 1 && temp1 > 6) || (results[0].sid == 1 && temp1 < 7)){
		//		console.log("yes");
				
				sql = mysql.pool.query(sql_4,inserts_4,function(error, results, fields){
					if(error){
						res.write(JSON.stringify(error));
						res.end();
					}else res.redirect('/page');
				});
			}else{
		//		console.log("no");
				res.redirect('/page');
			}
        });
	});
	
	// interact to list a player's weapons
	router.post('/show_p_weapon', function(req, res){
		temp2 = [req.body.selected_pname];
		res.redirect('/page');
	});
	
	// interact to list players of a job
	router.post('/show_p_of_job', function(req, res){
		temp2 = [req.body.selected_jname];
		res.redirect('/page');
	});
	
	return router;
}();
