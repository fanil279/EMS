.\venv\Scripts\activate

// Expected MySQL db schema
User (
    id INT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    password_hash VARCHAR,
    role ENUM('admin', 'organiser', 'participant'),
    institution_id INT REFERENCES Institution(id)
);

Event (
    id INT PRIMARY KEY,
    title VARCHAR,
    description TEXT,
    location VARCHAR,
    start_date DATETIME,
    end_date DATETIME,
    organiser_id INT REFERENCES User(id)
);

Registration (
    id INT PRIMARY KEY,
    event_id INT REFERENCES Event(id),
    participant_id INT REFERENCES User(id),
    status ENUM('pending', 'approved', 'rejected')
);

Notification (
    id INT PRIMARY KEY,
    user_id INT REFERENCES User(id),
    message TEXT,
    event_id INT REFERENCES Event(id),
    is_read BOOLEAN DEFAULT FALSE
);

Comment (
    id INT PRIMARY KEY,
    event_id INT REFERENCES Event(id),
    user_id INT REFERENCES User(id),
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

Analytics (
    id INT PRIMARY KEY,
    event_id INT REFERENCES Event(id) UNIQUE,
    total_registrations INT,
    approved_registrations INT,
    feedback_score DECIMAL(3,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
