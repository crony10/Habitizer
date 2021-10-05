-- CREATE DATABASE jwttutorial;

-- CREATE TABLE users(
--     user_id uuid PRIMARY KEY DEFAULT
--     uuid_generate_v4(),
--     user_name VARCHAR(255) NOT NULL,
--     user_email VARCHAR(255) NOT NULL,
--     user_password VARCHAR(255) NOT NULL
-- );

-- --Inserting fake users
-- INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

CREATE DATABASE authhabits;

--users
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

--habits
CREATE TABLE habits(
    habit_id SERIAL,
    user_id UUID,
    habit_name VARCHAR(255) NOT NULL,
    habit_reward VARCHAR(255) NOT NULL,
    habit_streak integer DEFAULT 0,
    habit_duration integer NOT NULL,

    PRIMARY KEY(habit_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

--fake users data
INSERT INTO users (user_name, user_email, user_password) VALUES ('dev', 'dev@gmail.com', '123');

--fake habits data
INSERT INTO habits (user_id,habit_name,habit_reward,habit_duration) VALUES ('82e7bcf9-9964-42b4-a002-94daecba4347', 'Do read', 'watch series',12);