SELECT
  t.id AS trip_id,
  t.name AS trip_name,
  t.start_date,
  t.end_date,
  d.name AS destination_name,
  d.country,
  ts.name AS status_name
FROM
  trips AS t
JOIN
  destinations AS d ON t.destination_id = d.id
JOIN
  trip_statuses AS ts ON t.status_id = ts.id
WHERE
  t.user_id = :userId
ORDER BY
  t.start_date DESC;