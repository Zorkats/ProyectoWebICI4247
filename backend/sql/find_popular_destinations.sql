SELECT
  d.id,
  d.name,
  d.country,
  d.main_image_url,
  COUNT(t.id) AS trip_count
FROM
  destinations AS d
LEFT JOIN
  trips AS t ON d.id = t.destination_id
GROUP BY
  d.id
ORDER BY
  trip_count DESC
LIMIT 10;