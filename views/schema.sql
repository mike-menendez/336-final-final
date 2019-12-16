SET @@time_zone = '-08:00'

CREATE TABLE users(
    uuid INTEGER AUTO_INCREMENT PRIMARY KEY,
    uname TEXT,
    pass TEXT,
    banner TEXT
);

CREATE TABLE time_block(
    b_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    day TEXT,
    stime TEXT,
    etime TEXT,
    uuid INTEGER NOT NULL,
    FOREIGN KEY (uuid) REFERENCES users(uuid) ON DELETE CASCADE
);

CREATE TABLE reserved(
    uuid INTEGER AUTO_INCREMENT PRIMARY KEY,
    uname INTEGER NOT NULL,
    FOREIGN KEY (uname) REFERENCES users(uuid) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    b_id INTEGER NOT NULL,
    FOREIGN KEY (b_id) REFERENCES time_block(b_id) ON DELETE CASCADE
);