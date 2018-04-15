-- 
DROP TABLE IF EXISTS `player_weapon`;
DROP TABLE IF EXISTS `weapon`;
DROP TABLE IF EXISTS `upgrade`;
DROP TABLE IF EXISTS `job_to_skill`;
DROP TABLE IF EXISTS `job`;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `skill`;

-- player
CREATE TABLE player (
	pid int(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (pid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- skill
CREATE TABLE skill (
	sid int(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (sid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- job_to_skill
CREATE TABLE job_to_skill (
	jname VARCHAR(255) NOT NULL,
	sid int(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- job
CREATE TABLE job (
	jid int(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	pid int(11),
	PRIMARY KEY (jid),
	FOREIGN KEY (pid) REFERENCES player(pid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- upgrade
CREATE TABLE upgrade (
	jid VARCHAR(255) NOT NULL,
	jid_up VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- weapon
CREATE TABLE weapon (
	wid int(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (wid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- player_weapon
CREATE TABLE player_weapon (
	pwid int (11) NOT NULL AUTO_INCREMENT,
	pid int(11),
	wid int(11),
	PRIMARY KEY (pwid, pid, wid),
	FOREIGN KEY (pid) REFERENCES player(pid) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (wid) REFERENCES weapon(wid) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- insert player
INSERT INTO player (name) VALUES ('Cloud');
INSERT INTO player (name) VALUES ('Zax');
INSERT INTO player (name) VALUES ('Yuna');
INSERT INTO player (name) VALUES ('Tina');

-- insert skill
INSERT INTO skill (name) VALUES ('None');
INSERT INTO skill (name) VALUES ('Fire');
INSERT INTO skill (name) VALUES ('Ice');
INSERT INTO skill (name) VALUES ('Cure');
INSERT INTO skill (name) VALUES ('Holy');
INSERT INTO skill (name) VALUES ('Flame');
INSERT INTO skill (name) VALUES ('Blizzard');
INSERT INTO skill (name) VALUES ('Meteo');
INSERT INTO skill (name) VALUES ('Odin');
INSERT INTO skill (name) VALUES ('Bahamut');

-- insert job_to_skill
INSERT INTO job_to_skill (jname, sid) VALUES ('Fighter', 1);
INSERT INTO job_to_skill (jname, sid) VALUES ('Knight', 1);
INSERT INTO job_to_skill (jname, sid) VALUES ('Viking', 1);
INSERT INTO job_to_skill (jname, sid) VALUES ('Dragoon', 1);
INSERT INTO job_to_skill (jname, sid) VALUES ('Magic Knight', 2);
INSERT INTO job_to_skill (jname, sid) VALUES ('Magic Knight', 3);
INSERT INTO job_to_skill (jname, sid) VALUES ('Mage', 2);
INSERT INTO job_to_skill (jname, sid) VALUES ('Mage', 3);
INSERT INTO job_to_skill (jname, sid) VALUES ('White Mage', 4);
INSERT INTO job_to_skill (jname, sid) VALUES ('Black Mage', 6);
INSERT INTO job_to_skill (jname, sid) VALUES ('Black Mage', 7);
INSERT INTO job_to_skill (jname, sid) VALUES ('Shaman', 5);
INSERT INTO job_to_skill (jname, sid) VALUES ('Warlock', 8);
INSERT INTO job_to_skill (jname, sid) VALUES ('Sage', 9);
INSERT INTO job_to_skill (jname, sid) VALUES ('Sage', 10);

-- insert job
INSERT INTO job (name, pid) VALUES ('Fighter', 1);
INSERT INTO job (name, pid) VALUES ('Knight', 2);
INSERT INTO job (name) VALUES ('Viking');
INSERT INTO job (name) VALUES ('Dragoon');
INSERT INTO job (name) VALUES ('Magic Knight');
INSERT INTO job (name) VALUES ('Mage');
INSERT INTO job (name) VALUES ('White Mage');
INSERT INTO job (name) VALUES ('Black Mage');
INSERT INTO job (name) VALUES ('Shaman');
INSERT INTO job (name, pid) VALUES ('Warlock', 4);
INSERT INTO job (name, pid) VALUES ('Sage', 3);

-- insert upgrade
INSERT INTO upgrade (jid, jid_up) VALUES ('Fighter', 'Knight');
INSERT INTO upgrade (jid, jid_up) VALUES ('Fighter', 'Viking');
INSERT INTO upgrade (jid, jid_up) VALUES ('Knight', 'Dragoon');
INSERT INTO upgrade (jid, jid_up) VALUES ('Knight', 'Magic Knight');
INSERT INTO upgrade (jid, jid_up) VALUES ('Mage', 'White Mage');
INSERT INTO upgrade (jid, jid_up) VALUES ('Mage', 'Black Mage');
INSERT INTO upgrade (jid, jid_up) VALUES ('White Mage', 'Shaman');
INSERT INTO upgrade (jid, jid_up) VALUES ('Black Mage', 'Warlock');
INSERT INTO upgrade (jid, jid_up) VALUES ('Shaman', 'Sage');
INSERT INTO upgrade (jid, jid_up) VALUES ('Warlock', 'Sage');

-- insert weapon
INSERT INTO weapon (name) VALUES ('Knife');
INSERT INTO weapon (name) VALUES ('Dagger');
INSERT INTO weapon (name) VALUES ('Katana');
INSERT INTO weapon (name) VALUES ('Masamune');
INSERT INTO weapon (name) VALUES ('Bow');
INSERT INTO weapon (name) VALUES ('Claw');
INSERT INTO weapon (name) VALUES ('Wand');
INSERT INTO weapon (name) VALUES ('Fire Wand');
INSERT INTO weapon (name) VALUES ('Ice Wand');
INSERT INTO weapon (name) VALUES ('Mithril Wand');

-- insert player_weapon
INSERT INTO player_weapon (pid, wid) VALUES (1, 2);
INSERT INTO player_weapon (pid, wid) VALUES (2, 4);
INSERT INTO player_weapon (pid, wid) VALUES (3, 10);
INSERT INTO player_weapon (pid, wid) VALUES (4, 8);


