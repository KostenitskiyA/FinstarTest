-- Задание 2

CREATE TABLE Clients
(
    Id         bigint PRIMARY KEY,
    ClientName varchar(200)
);

CREATE TABLE ClientContacts
(
    Id           bigint PRIMARY KEY,
    ClientId     bigint,
    ContactType  varchar(255),
    ContactValue varchar(255)
);

INSERT INTO Clients
VALUES (1, 'Нолик'),
       (2, 'Папус'),
       (3, 'ДимДимыч');

INSERT INTO ClientContacts
VALUES (1, 1, 'Тип', '1'),
       (2, 1, 'Тип', '1'),
       (3, 1, 'Тип', '1'),
       (4, 2, 'Тип', '2'),
       (5, 2, 'Тип', '2'),
       (6, 3, 'Тип', '3');

SELECT c.ClientName    AS Name,
       count(ClientId) AS ContactCount
FROM Clients c
         LEFT JOIN ClientContacts cc
                   ON c.Id = cc.ClientId
GROUP BY ClientName;

SELECT c.ClientName AS Name,
       Count(ClientId) ContactCount
FROM Clients c
         LEFT JOIN ClientContacts cc
                   ON cc.ClientId = c.Id
GROUP BY ClientName
HAVING Count(ClientId) > 2;

-- Задание 3

CREATE TABLE Dates
(
    Id bigint,
    Dt date
);

INSERT INTO Dates
VALUES (1, '2021-01-01'),
       (1, '2021-01-10'),
       (1, '2021-01-30'),
       (2, '2021-01-15'),
       (2, '2021-01-30');

SELECT *
FROM (SELECT d.Id,
             d.Dt      AS Sd,
             (SELECT dd.Dt
              FROM Dates dd
              WHERE dd.Dt > d.Dt
                AND dd.Id = d.Id
              ORDER BY dd.Dt
              LIMIT 1) AS Ed
      FROM Dates AS d) AS d
WHERE d.Ed IS NOT NULL;