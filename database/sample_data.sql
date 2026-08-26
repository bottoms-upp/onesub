USE onesub;

INSERT INTO categories(name)
VALUES
('OTT'),
('Music'),
('Software'),
('Education'),
('Fitness');

INSERT INTO users(name,email,password)
VALUES
('Ritesh','ritesh@example.com','hashedpassword');

INSERT INTO subscriptions(
user_id,
category_id,
name,
provider,
price,
billing_cycle,
renewal_date
)
VALUES
(1,1,'Netflix Premium','Netflix',649,'MONTHLY','2026-09-01'),
(1,2,'Spotify Premium','Spotify',119,'MONTHLY','2026-09-05'),
(1,3,'ChatGPT Plus','OpenAI',2000,'MONTHLY','2026-09-12');