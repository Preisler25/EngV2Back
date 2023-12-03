/*PostgreSQL*/
CREATE TABLE IF NOT EXISTS words (
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    g_id INT NOT NULL,
    FOREIGN KEY (g_id) REFERENCES groups(g_id)
);

CREATE TABLE IF NOT EXISTS groups (
    g_id SERIAL PRIMARY KEY,
    g_name VARCHAR(255) NOT NULL,
    g_key VARCHAR(255) NOT NULL
);